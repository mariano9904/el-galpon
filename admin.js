const BRAND_NAME = 'El Galpón';
const LOGO = `<svg class="logo-mark" width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="8" fill="#0EA5B7"/><path d="M6.5 20.5 L16 10.5 L25.5 20.5" stroke="#101B33" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/><rect x="9.5" y="19.5" width="13" height="7" rx="1.3" fill="#101B33"/></svg>`;

let session = null;
let vehicles = [];
let brands = [];
let settings = {};
let state = { tab:'vehiculos', editingId:null, pendingDeleteId:null, pendingDeleteBrand:null };

function esc(str){ const d=document.createElement('div'); d.textContent = str==null?'':str; return d.innerHTML; }
function fmtMoney(n){ if(n===''||n==null) return 'Consultar precio'; return 'USD ' + Number(n).toLocaleString('es-AR'); }

async function init(){
  const { data: { session: s } } = await supabase.auth.getSession();
  session = s;
  if(session) await loadAll();
  render();
}

async function loadAll(){
  const [{data: v}, {data: b}, {data: s}] = await Promise.all([
    supabase.from('vehicles').select('*').order('created_at', {ascending:false}),
    supabase.from('brands').select('*').order('orden'),
    supabase.from('site_settings').select('*').eq('id',1).single()
  ]);
  vehicles = v || []; brands = b || []; settings = s || {};
}

function render(){
  const app = document.getElementById('app');
  app.innerHTML = session ? renderPanel() : renderLogin();
  bind();
}

function renderLogin(){
  return `
  <div class="admin-shell">
    <div class="admin-topbar"><div class="wrap"><div class="brand">${LOGO} ${BRAND_NAME} <span class="admin-tag">Admin</span></div></div></div>
    <div class="login-box">
      <h2>Panel de administración</h2>
      <p>Ingresá con tu cuenta de administrador.</p>
      <div class="login-error" id="loginError">Email o contraseña incorrectos.</div>
      <input type="email" id="loginEmail" placeholder="Email">
      <input type="password" id="loginPw" placeholder="Contraseña" style="margin-top:10px;">
      <button id="loginBtn" style="margin-top:12px;">Ingresar</button>
    </div>
  </div>`;
}

function renderPanel(){
  let body = '';
  if(state.tab==='vehiculos') body = renderVehiculos();
  else if(state.tab==='nuevo') body = renderForm();
  else if(state.tab==='bulk') body = renderBulk();
  else if(state.tab==='marcas') body = renderMarcas();
  else body = renderAjustes();
  return `
  <div class="admin-shell">
    <div class="admin-topbar"><div class="wrap">
      <div class="brand">${LOGO} ${BRAND_NAME} <span class="admin-tag">Admin</span></div>
      <button class="admin-exit" id="logoutBtn">Cerrar sesión</button>
    </div></div>
    <div class="wrap section">
      <div class="admin-tabs">
        <button class="admin-tab ${state.tab==='vehiculos'?'active':''}" data-tab="vehiculos">Vehículos</button>
        <button class="admin-tab ${state.tab==='nuevo'?'active':''}" data-tab="nuevo">${state.editingId?'Editar vehículo':'Cargar vehículo'}</button>
        <button class="admin-tab ${state.tab==='bulk'?'active':''}" data-tab="bulk">Carga rápida</button>
        <button class="admin-tab ${state.tab==='marcas'?'active':''}" data-tab="marcas">Marcas</button>
        <button class="admin-tab ${state.tab==='ajustes'?'active':''}" data-tab="ajustes">Datos de contacto</button>
      </div>
      ${body}
    </div>
  </div>`;
}

function renderVehiculos(){
  if(vehicles.length===0) return `<div class="empty"><h2>No cargaste vehículos todavía</h2></div>`;
  let rows = vehicles.map(v=>{
    const pending = state.pendingDeleteId === v.id;
    return `<tr>
      <td><div class="admin-thumb" style="${(v.fotos&&v.fotos[0])?`background-image:url('${esc(v.fotos[0])}')`:''}"></div></td>
      <td>${esc(v.marca)}</td><td>${esc(v.modelo)}</td><td>${esc(v.anio)||'—'}</td><td>${fmtMoney(v.precio)}</td>
      <td><span class="badge ${v.estado==='vendido'?'vendido':'disponible'}" style="position:static;">${v.estado==='vendido'?'VENDIDO':'DISPONIBLE'}</span></td>
      <td style="white-space:nowrap;">
        ${pending ? `
          <span style="font-family:var(--font-mono);font-size:11px;color:var(--red);margin-right:6px;">¿Seguro?</span>
          <button class="btn btn-sm btn-danger" data-action="confirm-delete" data-id="${v.id}">Sí, eliminar</button>
          <button class="btn btn-sm" data-action="cancel-delete">Cancelar</button>
        ` : `
          <button class="btn btn-sm" data-action="toggle" data-id="${v.id}">Cambiar estado</button>
          <button class="btn btn-sm" data-action="edit" data-id="${v.id}">Editar</button>
          <button class="btn btn-sm btn-danger" data-action="delete" data-id="${v.id}">Eliminar</button>
        `}
      </td>
    </tr>`;
  }).join('');
  return `<table class="admin-table"><thead><tr><th></th><th>Marca</th><th>Modelo</th><th>Año</th><th>Precio</th><th>Estado</th><th>Acciones</th></tr></thead><tbody>${rows}</tbody></table>`;
}

function renderForm(){
  const v = state.editingId ? vehicles.find(t=>t.id===state.editingId) : null;
  const fotos = v && v.fotos ? v.fotos : [];
  let photoInputs = '';
  for(let i=0;i<5;i++){
    const has = !!fotos[i];
    photoInputs += `<div class="photo-slot">
      <div class="photo-preview" id="preview-${i}" style="${has?`background-image:url('${esc(fotos[i])}')`:''}">${has?'':'Sin foto'}</div>
      <label class="btn btn-sm photo-pick-btn">Elegir foto ${i+1}<input type="file" accept="image/*" class="foto-file-input" data-idx="${i}" hidden></label>
      <input type="hidden" class="foto-input" id="foto-hidden-${i}" value="${esc(fotos[i]||'')}">
    </div>`;
  }
  return `<div class="form-card">
    <div class="field"><label>Marca</label>
      <select id="f-marca">${brands.map(b=>`<option value="${esc(b.nombre)}" ${v&&v.marca===b.nombre?'selected':''}>${esc(b.nombre)}</option>`).join('')}</select>
      <input type="text" id="f-marca-otra" placeholder="...o escribí una marca nueva" style="margin-top:8px;">
    </div>
    <div class="row2"><div class="field"><label>Modelo</label><input type="text" id="f-modelo" value="${v?esc(v.modelo):''}"></div>
    <div class="field"><label>Año</label><input type="number" id="f-anio" value="${v?esc(v.anio):''}"></div></div>
    <div class="row2"><div class="field"><label>Kilometraje</label><input type="number" id="f-km" value="${v?esc(v.km):''}"></div>
    <div class="field"><label>Precio (USD)</label><input type="number" id="f-precio" value="${v?esc(v.precio):''}"></div></div>
    <div class="field"><label>Estado</label><select id="f-estado">
      <option value="disponible" ${v&&v.estado==='disponible'?'selected':''}>Disponible</option>
      <option value="vendido" ${v&&v.estado==='vendido'?'selected':''}>Vendido</option>
    </select></div>
    <div class="row2"><div class="field"><label>Motor</label><input type="text" id="f-motor" value="${v?esc(v.motor):''}"></div>
    <div class="field"><label>Caja</label><input type="text" id="f-caja" value="${v?esc(v.caja):''}"></div></div>
    <div class="row3"><div class="field"><label>Configuración</label><input type="text" id="f-config" value="${v?esc(v.configuracion):''}"></div>
    <div class="field"><label>Potencia</label><input type="text" id="f-potencia" value="${v?esc(v.potencia):''}"></div>
    <div class="field"><label>Combustible</label><input type="text" id="f-combustible" value="${v?esc(v.combustible):''}"></div></div>
    <div class="field"><label>Descripción completa</label><textarea id="f-desc">${v?esc(v.descripcion):''}</textarea></div>
    <div class="field"><label>Observaciones</label><textarea id="f-extra">${v?esc(v.observaciones):''}</textarea></div>
    <div class="hint">Hasta 5 fotos, directo desde tu compu o celular.</div>
    <div class="photo-fields">${photoInputs}</div>
    <div class="form-actions">
      <button class="btn" id="cancelForm">Cancelar</button>
      <button class="btn btn-primary" id="saveVehicle">${v?'Guardar cambios':'Publicar vehículo'}</button>
    </div>
  </div>`;
}

function renderBulk(){
  return `<div class="form-card" style="max-width:760px;">
    <div class="hint" style="margin-top:0;">Una línea por vehículo: <b>Marca | Modelo | Año | Precio | Estado (opcional)</b></div>
    <div class="field"><textarea id="bulkText" rows="10" style="font-family:var(--font-mono);font-size:12.5px;" placeholder="Scania | P360 6X2 | 2012 | 135000000"></textarea></div>
    <div class="form-actions"><button class="btn" id="bulkClear">Limpiar</button><button class="btn btn-primary" id="bulkSubmit">Cargar todos</button></div>
  </div>`;
}

function renderMarcas(){
  let rows = brands.map(b=>{
    const pending = state.pendingDeleteBrand === b.id;
    return `<div class="marca-row">
      <div class="photo-preview" style="width:50px;height:36px;flex:none;${b.logo_url?`background-image:url('${esc(b.logo_url)}')`:''}"></div>
      <div class="marca-name" style="flex:1;margin:0 12px;">${esc(b.nombre)} <span class="marca-count">${vehicles.filter(v=>v.marca===b.nombre).length} publicados</span></div>
      <label class="btn btn-sm photo-pick-btn">Logo<input type="file" accept="image/*" class="brand-logo-input" data-id="${b.id}" hidden></label>
      ${pending ? `
        <span style="font-family:var(--font-mono);font-size:11px;color:var(--red);margin:0 6px;">¿Sacar?</span>
        <button class="btn btn-sm btn-danger" data-action="confirm-remove-brand" data-id="${b.id}">Sí</button>
        <button class="btn btn-sm" data-action="cancel-remove-brand">No</button>
      ` : `<button class="btn btn-sm btn-danger" data-action="remove-brand" data-id="${b.id}">Quitar</button>`}
    </div>`;
  }).join('');
  return `<div class="form-card" style="max-width:680px;">
    <div class="marca-list">${rows}</div>
    <div class="row2" style="margin-top:18px;grid-template-columns:2fr 1fr;">
      <div class="field" style="margin-bottom:0;"><label>Nueva marca</label><input type="text" id="new-brand-input" placeholder="Ej: Mack, DAF..."></div>
      <button class="btn btn-primary" id="addBrandBtn" style="align-self:end;">Agregar</button>
    </div>
  </div>`;
}

function renderAjustes(){
  return `<div class="form-card">
    <div class="field"><label>Frase comercial destacada</label><textarea id="s-frase">${esc(settings.frase_comercial)}</textarea></div>
    <div class="field"><label>Imagen de fondo del Hero</label>
      <div class="photo-preview" id="hero-preview" style="aspect-ratio:3/1;${settings.hero_image_url?`background-image:url('${esc(settings.hero_image_url)}')`:''}">${settings.hero_image_url?'':'Sin imagen'}</div>
      <label class="btn btn-sm photo-pick-btn" style="margin-top:8px;display:inline-block;">Elegir imagen<input type="file" accept="image/*" id="hero-file-input" hidden></label>
    </div>
    <div class="field"><label>Catálogo de acoplados y semis (PDF)</label>
      <label class="btn btn-sm photo-pick-btn" style="display:inline-block;">Elegir PDF<input type="file" accept="application/pdf" id="pdf-file-input" hidden></label>
      <span id="pdf-status" style="font-size:12px;color:var(--ink-soft);margin-left:8px;">${settings.trailer_pdf_url?'✓ Ya hay uno cargado':'Sin PDF cargado'}</span>
    </div>
    <div class="row2"><div class="field"><label>Teléfono</label><input type="text" id="s-tel" value="${esc(settings.telefono)}"></div>
    <div class="field"><label>WhatsApp (con código país)</label><input type="text" id="s-wa" value="${esc(settings.whatsapp)}"></div></div>
    <div class="row2"><div class="field"><label>Email</label><input type="text" id="s-email" value="${esc(settings.email)}"></div>
    <div class="field"><label>Dirección</label><input type="text" id="s-dir" value="${esc(settings.direccion)}"></div></div>
    <div class="row2"><div class="field"><label>Instagram</label><input type="text" id="s-ig" value="${esc(settings.instagram)}"></div>
    <div class="field"><label>Facebook</label><input type="text" id="s-fb" value="${esc(settings.facebook)}"></div></div>
    <div class="form-actions"><button class="btn btn-primary" id="saveSettings">Guardar</button></div>
  </div>`;
}

function bind(){
  if(!session){
    document.getElementById('loginBtn').addEventListener('click', async ()=>{
      const email = document.getElementById('loginEmail').value.trim();
      const password = document.getElementById('loginPw').value;
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if(error){ document.getElementById('loginError').style.display='block'; return; }
      session = data.session;
      await loadAll();
      render();
    });
    return;
  }
  document.getElementById('logoutBtn').addEventListener('click', async ()=>{
    await supabase.auth.signOut(); session = null; render();
  });
  document.querySelectorAll('.admin-tab').forEach(el=>el.addEventListener('click', ()=>{
    if(el.dataset.tab==='nuevo') state.editingId = null;
    state.tab = el.dataset.tab; render();
  }));

  if(state.tab==='vehiculos'){
    document.querySelectorAll('button[data-action]').forEach(btn=>btn.addEventListener('click', async ()=>{
      const id = btn.dataset.id;
      if(btn.dataset.action==='toggle'){
        const v = vehicles.find(t=>t.id===id);
        await supabase.from('vehicles').update({estado: v.estado==='vendido'?'disponible':'vendido'}).eq('id', id);
        await loadAll(); render();
      }else if(btn.dataset.action==='delete'){ state.pendingDeleteId = id; render(); }
      else if(btn.dataset.action==='cancel-delete'){ state.pendingDeleteId = null; render(); }
      else if(btn.dataset.action==='confirm-delete'){
        await supabase.from('vehicles').delete().eq('id', id);
        state.pendingDeleteId = null; await loadAll(); render();
      }else if(btn.dataset.action==='edit'){ state.editingId = id; state.tab='nuevo'; render(); }
    }));
  }

  if(state.tab==='nuevo'){
    document.getElementById('cancelForm').addEventListener('click', ()=>{ state.tab='vehiculos'; state.editingId=null; render(); });
    document.querySelectorAll('.foto-file-input').forEach(inp=>{
      inp.addEventListener('change', async ()=>{
        const file = inp.files[0]; if(!file) return;
        const idx = inp.dataset.idx;
        const preview = document.getElementById('preview-'+idx);
        preview.textContent = 'Subiendo…';
        try{
          const url = await uploadToBucket(file, 'vehiculos');
          document.getElementById('foto-hidden-'+idx).value = url;
          preview.style.backgroundImage = `url('${url}')`;
          preview.textContent = '';
        }catch(e){ preview.textContent = 'Error al subir'; }
      });
    });
    document.getElementById('saveVehicle').addEventListener('click', async ()=>{
      const marcaOtra = document.getElementById('f-marca-otra').value.trim();
      const fotos = Array.from(document.querySelectorAll('.foto-input')).map(i=>i.value.trim()).filter(Boolean);
      const data = {
        marca: marcaOtra || document.getElementById('f-marca').value,
        modelo: document.getElementById('f-modelo').value.trim(),
        anio: document.getElementById('f-anio').value || null,
        km: document.getElementById('f-km').value || null,
        precio: document.getElementById('f-precio').value || null,
        estado: document.getElementById('f-estado').value,
        motor: document.getElementById('f-motor').value.trim(),
        caja: document.getElementById('f-caja').value.trim(),
        configuracion: document.getElementById('f-config').value.trim(),
        potencia: document.getElementById('f-potencia').value.trim(),
        combustible: document.getElementById('f-combustible').value.trim(),
        descripcion: document.getElementById('f-desc').value.trim(),
        observaciones: document.getElementById('f-extra').value.trim(),
        fotos
      };
      let error;
      if(state.editingId) ({error} = await supabase.from('vehicles').update(data).eq('id', state.editingId));
      else ({error} = await supabase.from('vehicles').insert(data));
      if(error) alert('No se pudo guardar: ' + error.message);
      state.tab='vehiculos'; state.editingId=null; await loadAll(); render();
    });
  }

  if(state.tab==='bulk'){
    document.getElementById('bulkClear').addEventListener('click', ()=>{ document.getElementById('bulkText').value=''; });
    document.getElementById('bulkSubmit').addEventListener('click', async ()=>{
      const raw = document.getElementById('bulkText').value;
      const rows = raw.split('\n').map(l=>l.trim()).filter(Boolean).map(line=>{
        const parts = line.split('|').map(p=>p.trim());
        const estadoRaw = (parts[4]||'').toLowerCase();
        return {
          marca: parts[0]||'Otros', modelo: parts[1]||'',
          anio: (parts[2]||'').replace(/[^\d]/g,'') || null,
          precio: (parts[3]||'').replace(/[^\d]/g,'') || null,
          estado: estadoRaw.includes('vend') ? 'vendido' : 'disponible',
          fotos: []
        };
      });
      if(rows.length===0){ alert('Pegá al menos una línea.'); return; }
      const { error } = await supabase.from('vehicles').insert(rows);
      if(error) alert('No se pudo cargar: ' + error.message);
      document.getElementById('bulkText').value='';
      state.tab='vehiculos'; await loadAll(); render();
    });
  }

  if(state.tab==='marcas'){
    document.getElementById('addBrandBtn').addEventListener('click', async ()=>{
      const input = document.getElementById('new-brand-input');
      const name = input.value.trim(); if(!name) return;
      const { error } = await supabase.from('brands').insert({nombre: name, orden: brands.length+1});
      if(error) alert('No se pudo agregar: ' + error.message);
      await loadAll(); render();
    });
    document.querySelectorAll('.brand-logo-input').forEach(inp=>{
      inp.addEventListener('change', async ()=>{
        const file = inp.files[0]; if(!file) return;
        try{
          const url = await uploadToBucket(file, 'marcas');
          await supabase.from('brands').update({logo_url:url}).eq('id', inp.dataset.id);
          await loadAll(); render();
        }catch(e){ alert('Error al subir el logo'); }
      });
    });
    document.querySelectorAll('button[data-action]').forEach(btn=>btn.addEventListener('click', async ()=>{
      const id = btn.dataset.id;
      if(btn.dataset.action==='remove-brand'){ state.pendingDeleteBrand = id; render(); }
      else if(btn.dataset.action==='cancel-remove-brand'){ state.pendingDeleteBrand = null; render(); }
      else if(btn.dataset.action==='confirm-remove-brand'){
        await supabase.from('brands').delete().eq('id', id);
        state.pendingDeleteBrand = null; await loadAll(); render();
      }
    }));
  }

  if(state.tab==='ajustes'){
    document.getElementById('hero-file-input').addEventListener('change', async (e)=>{
      const file = e.target.files[0]; if(!file) return;
      const preview = document.getElementById('hero-preview');
      preview.textContent = 'Subiendo…';
      try{
        const url = await uploadToBucket(file, 'hero');
        await supabase.from('site_settings').update({hero_image_url:url}).eq('id',1);
        preview.style.backgroundImage = `url('${url}')`; preview.textContent = '';
        await loadAll();
      }catch(e){ preview.textContent = 'Error'; }
    });
    document.getElementById('pdf-file-input').addEventListener('change', async (e)=>{
      const file = e.target.files[0]; if(!file) return;
      const status = document.getElementById('pdf-status');
      status.textContent = 'Subiendo…';
      try{
        const url = await uploadToBucket(file, 'pdf');
        await supabase.from('site_settings').update({trailer_pdf_url:url}).eq('id',1);
        status.textContent = '✓ Cargado';
        await loadAll();
      }catch(e){ status.textContent = 'Error al subir'; }
    });
    document.getElementById('saveSettings').addEventListener('click', async ()=>{
      const data = {
        frase_comercial: document.getElementById('s-frase').value.trim(),
        telefono: document.getElementById('s-tel').value.trim(),
        whatsapp: document.getElementById('s-wa').value.trim(),
        email: document.getElementById('s-email').value.trim(),
        direccion: document.getElementById('s-dir').value.trim(),
        instagram: document.getElementById('s-ig').value.trim(),
        facebook: document.getElementById('s-fb').value.trim()
      };
      const { error } = await supabase.from('site_settings').update(data).eq('id',1);
      alert(error ? 'No se pudo guardar: '+error.message : 'Datos guardados.');
      await loadAll(); render();
    });
  }
}

init();
