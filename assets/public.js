const BRAND_NAME = 'El Galpón';
const LOGO = `<svg class="logo-mark" width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="8" fill="#0EA5B7"/><path d="M6.5 20.5 L16 10.5 L25.5 20.5" stroke="#101B33" stroke-width="2.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/><rect x="9.5" y="19.5" width="13" height="7" rx="1.3" fill="#101B33"/></svg>`;
const FALLBACK_ICON = `<svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 16V7a1 1 0 0 1 1-1h9v10" stroke="#B9C0D4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 10h4.5L20 13.5V16" stroke="#B9C0D4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="6" cy="17.5" r="1.7" stroke="#B9C0D4" stroke-width="1.5"/><circle cx="16.5" cy="17.5" r="1.7" stroke="#B9C0D4" stroke-width="1.5"/></svg>`;
const SPEC_ICONS = {
  marca:`<svg width="17" height="17" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="14" rx="2" stroke="currentColor" stroke-width="1.6"/><path d="M3 9h18" stroke="currentColor" stroke-width="1.6"/></svg>`,
  modelo:`<svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M4 17V8l4-4h8l4 4v9" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M4 17h16" stroke="currentColor" stroke-width="1.6"/></svg>`,
  anio:`<svg width="17" height="17" viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" stroke-width="1.6"/><path d="M3 10h18M8 3v4M16 3v4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`,
  km:`<svg width="17" height="17" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.6"/><path d="M12 12l4-4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`,
  motor:`<svg width="17" height="17" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3.2" stroke="currentColor" stroke-width="1.6"/><path d="M12 3v2.4M12 18.6V21M3 12h2.4M18.6 12H21M5.6 5.6l1.7 1.7M16.7 16.7l1.7 1.7M18.4 5.6l-1.7 1.7M7.3 16.7l-1.7 1.7" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`,
  caja:`<svg width="17" height="17" viewBox="0 0 24 24" fill="none"><rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" stroke-width="1.6"/><path d="M12 8v8M8 12h8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`,
  config:`<svg width="17" height="17" viewBox="0 0 24 24" fill="none"><circle cx="6" cy="17" r="2.2" stroke="currentColor" stroke-width="1.6"/><circle cx="18" cy="17" r="2.2" stroke="currentColor" stroke-width="1.6"/><path d="M6 14.8V8h12v6.8" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>`,
  potencia:`<svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M13 3 5 14h6l-1 7 8-11h-6l1-7Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>`,
  combustible:`<svg width="17" height="17" viewBox="0 0 24 24" fill="none"><rect x="4" y="4" width="10" height="16" rx="1.5" stroke="currentColor" stroke-width="1.6"/><path d="M14 9h2.5L19 11.5V17a1.5 1.5 0 0 1-3 0v-2a1 1 0 0 0-1-1h-1" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M7 8h4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`,
  estado:`<svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M20 6 9 17l-5-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`
};

let vehicles = [];
let brands = [];
let settings = {};
let state = { view:'home', category:null, vehicleId:null, galleryIndex:0, searchQuery:'', filterPrice:'', filterYear:'' };
let heroTitleAnimated = false;
let heroResizeBound = false;
let featuredCarouselTimer = null;
let featuredCarouselIndex = 0;

async function loadData(){
  const [{data: v}, {data: b}, {data: s}] = await Promise.all([
    sb.from('vehicles').select('*').order('created_at', {ascending:false}),
    sb.from('brands').select('*').order('orden'),
    sb.from('site_settings').select('*').eq('id',1).single()
  ]);
  vehicles = v || [];
  brands = b || [];
  settings = s || {};
  render();
}

function esc(str){ const d=document.createElement('div'); d.textContent = str==null?'':str; return d.innerHTML; }
function fmtMoney(n){ if(n===''||n==null) return 'Consultar precio'; return 'USD ' + Number(n).toLocaleString('es-AR'); }
function fmtKm(n){ if(n===''||n==null) return '—'; return Number(n).toLocaleString('es-AR') + ' km'; }
function catCount(name){ return vehicles.filter(v=>v.marca===name).length; }
function matchesFilters(v){
  if(state.searchQuery){
    const q = state.searchQuery.toLowerCase();
    const hay = `${v.marca} ${v.modelo} ${v.anio}`.toLowerCase();
    if(!hay.includes(q)) return false;
  }
  if(state.filterPrice){
    const [min,max] = state.filterPrice.split('-').map(Number);
    const p = Number(v.precio);
    if(!v.precio || isNaN(p) || p<min || p>max) return false;
  }
  if(state.filterYear){
    const [min,max] = state.filterYear.split('-').map(Number);
    const y = Number(v.anio);
    if(!v.anio || isNaN(y) || y<min || y>max) return false;
  }
  return true;
}
function specItem(icon, lbl, val, always){
  if(!always && !val) return '';
  return `<div class="spec-item"><span>${SPEC_ICONS[icon]}</span><div class="txt"><div class="lbl">${esc(lbl)}</div><div class="val">${esc(val)||'—'}</div></div></div>`;
}
function waLink(v){
  if(!settings.whatsapp) return null;
  const num = settings.whatsapp.replace(/[^0-9]/g,'');
  const txt = v ? `Hola, quería consultar por el precio y la financiación del ${v.marca} ${v.modelo} modelo ${v.anio||'s/d'}.` : 'Hola! Quería consultar por los camiones publicados.';
  return `https://wa.me/${num}?text=${encodeURIComponent(txt)}`;
}
function waFinanceLink(v){
  if(!settings.whatsapp) return null;
  const num = settings.whatsapp.replace(/[^0-9]/g,'');
  const txt = `Hola, vi publicado el ${v.marca} ${v.modelo} en ${BRAND_NAME} y quisiera recibir información sobre las opciones de financiación.`;
  return `https://wa.me/${num}?text=${encodeURIComponent(txt)}`;
}
function go(view, extra){ state = {...state, view, searchQuery:'', filterPrice:'', filterYear:'', ...extra}; window.scrollTo({top:0,behavior:'instant'}); render(); }
function render(){
  if(featuredCarouselTimer){ clearInterval(featuredCarouselTimer); featuredCarouselTimer = null; }
  const app = document.getElementById('app');
  app.innerHTML = renderTopInfo() + renderTopbar() + renderBody() + renderContact() + renderFooter() + renderFloatingWA();
  bind();
  if(state.view==='home'){ adjustHeroHeight(); bindHeroResize(); initFeaturedCarousel(); }
}
function adjustHeroHeight(){
  const hero = document.getElementById('mainHero');
  if(!hero) return;
  const topinfo = document.querySelector('.topinfo');
  const topbar = document.querySelector('.topbar');
  const chromeH = (topinfo?topinfo.offsetHeight:0) + (topbar?topbar.offsetHeight:0);
  const peek = 0;
  hero.style.minHeight = `calc(100svh - ${chromeH}px - ${peek}px)`;
}
function bindHeroResize(){
  if(heroResizeBound) return;
  heroResizeBound = true;
  let t;
  window.addEventListener('resize', ()=>{
    clearTimeout(t);
    t = setTimeout(()=>{ if(state.view==='home') adjustHeroHeight(); }, 150);
  });
}


function renderTopInfo(){
  const items = `
    <span>&#128667; Financiación propia</span>
    <span>&#9851;&#65039; Recibimos usados</span>
    <span>&#128242; Atención por WhatsApp</span>
    <span>&#128667; Financiación propia</span>
    <span>&#9851;&#65039; Recibimos usados</span>
    <span>&#128242; Atención por WhatsApp</span>
  `;

  return `<div class="topinfo" aria-label="Información comercial">
    <div class="topinfo-track">
      <div class="topinfo-group">${items}</div>
      <div class="topinfo-group" aria-hidden="true">${items}</div>
    </div>
  </div>`;
}
function renderTopbar(){
  return `<div class="topbar"><div class="wrap">
    <div class="brand" id="logoHome" role="button" tabindex="0">${LOGO} ${BRAND_NAME}</div>
  </div></div>`;
}
function renderFloatingWA(){
  const wa = waLink(null);
  if(!wa) return '';
  return `<a class="wa-float" href="${wa}" target="_blank" rel="noopener" aria-label="WhatsApp"><svg width="26" height="26" viewBox="0 0 24 24" fill="#fff"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Z"/></svg></a>`;
}
function renderBody(){
  if(state.view==='category') return renderCategoryHero() + `<div class="wrap section">${renderCategoryList()}</div>`;
  if(state.view==='detail') return `<div class="wrap section">${renderDetail()}</div>`;
  const hasFilters = !!(state.searchQuery || state.filterPrice || state.filterYear);
  if(hasFilters){
    return renderHero() + `<div class="wrap section" id="catalogo">${renderSearchBar()}${renderSearchResults()}</div>`;
  }
  return renderHero() + `<div class="wrap section" id="catalogo">${renderSearchBar()}${renderCategoryGrid()}</div>` + renderBenefits() + renderAbout();
}
function iconDocument(){
  return `<svg width="21" height="21" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 3h8l4 4v14H6z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M14 3v5h5M9 12h6M9 16h6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`;
}

function iconWhatsApp(){
  return `<svg width="23" height="23" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3a8 8 0 0 0-6.9 12l-1.1 4 4.1-1.1A8 8 0 1 0 12 3Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M9.2 8.5c.2-.5.4-.5.7-.5h.5c.2 0 .4.1.5.4l.8 1.8c.1.2 0 .4-.1.6l-.6.7c-.2.2-.1.4 0 .6.5.9 1.2 1.6 2.1 2.1.2.1.4.2.6 0l.8-.9c.2-.2.4-.2.6-.1l1.8.8c.3.1.4.3.4.5 0 .4-.2 1.4-.7 1.8-.5.4-1.2.7-2 .6-1.1-.1-2.6-.6-4.3-2.1-1.4-1.3-2.4-2.8-2.7-4-.3-1.1.1-1.9.6-2.3Z" fill="currentColor"/></svg>`;
}

function iconFinance(){
  return `<svg width="25" height="25" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="6" width="18" height="13" rx="2" stroke="currentColor" stroke-width="1.6"/><path d="M3 10h18M7 15h4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`;
}

function iconSwap(){
  return `<svg width="27" height="27" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20 7h-9a4 4 0 0 0-4 4v1M4 17h9a4 4 0 0 0 4-4v-1" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><path d="m17 4 3 3-3 3M7 14l-3 3 3 3" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
}

function getFeaturedVehicles(){
  return vehicles
    .filter(v=>Array.isArray(v.fotos) && v.fotos.length && v.fotos[0])
    .slice(0,5);
}

function featuredTruckIcon(){
  return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 7h10v9H3zM13 10h4l3 3v3h-7z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><circle cx="7" cy="17.5" r="1.7" stroke="currentColor" stroke-width="1.6"/><circle cx="17" cy="17.5" r="1.7" stroke="currentColor" stroke-width="1.6"/></svg>`;
}

function featuredCard(v, cloneIndex=''){
  const sold = v.estado==='vendido';
  const cover = v.fotos && v.fotos[0];
  const title = [v.marca, v.modelo].filter(Boolean).join(' ');
  const meta = [v.anio].filter(Boolean).join(' · ');

  return `<article class="featured-card" data-featured-id="${esc(v.id)}" data-clone="${cloneIndex}" tabindex="0" role="button" aria-label="Ver ${esc(title)}">
    <div class="featured-photo" style="background-image:url('${esc(cover)}')">
      ${sold?`<span class="featured-sold"><span class="featured-sold-check">&#10003;</span> VENDIDO</span>`:''}
      <div class="featured-photo-shade"></div>
      <div class="featured-card-copy">
        <strong>${esc(title)}</strong>
        ${meta?`<span>${esc(meta)}</span>`:''}
      </div>
    </div>
  </article>`;
}

function renderFeaturedCarousel(){
  const featured = getFeaturedVehicles();
  if(!featured.length) return '';

  const loopItems = featured.length > 1
    ? [...featured, ...featured.slice(0, Math.min(2, featured.length))]
    : featured;

  return `<aside class="featured-panel" aria-label="Productos destacados">
    <div class="featured-head">
      <div class="featured-title">${featuredTruckIcon()}<span>Productos destacados</span></div>
      <button class="featured-more" id="featuredMore" type="button">Ver más <span aria-hidden="true">&#8250;</span></button>
    </div>

    <div class="featured-carousel">
      <div class="featured-viewport" id="featuredViewport">
        <div class="featured-track" id="featuredTrack">
          ${loopItems.map((v,i)=>featuredCard(v, i>=featured.length?'clone':'')).join('')}
        </div>
      </div>

      ${featured.length>1?`
        <button class="featured-arrow featured-prev" id="featuredPrev" type="button" aria-label="Producto anterior">&#8249;</button>
        <button class="featured-arrow featured-next" id="featuredNext" type="button" aria-label="Producto siguiente">&#8250;</button>
      `:''}
    </div>

    ${featured.length>1?`<div class="featured-dots">
      ${featured.map((_,i)=>`<button type="button" class="featured-dot ${i===0?'active':''}" data-featured-dot="${i}" aria-label="Ir al producto ${i+1}"></button>`).join('')}
    </div>`:''}
  </aside>`;
}

function renderHero(){
  const bg = settings.hero_image_url ? `style="background-image:linear-gradient(180deg,rgba(10,17,35,0.2),rgba(10,17,35,0.5)),url('${esc(settings.hero_image_url)}')"` : '';
  const wa = waLink(null);

  return `<div class="hero hero-main ${settings.hero_image_url?'has-img':''}" ${bg} id="mainHero">
    <div class="wrap fade-in">
      <div class="hero-layout">
        <div class="hero-copy">
          <div class="hero-eyebrow">Camiones · Tractores · Semirremolques</div>
          <h1><span>Camiones usados,</span><span class="hero-title-accent">listos para trabajar</span></h1>
          <p class="sub">Catálogo actualizado de unidades disponibles, con financiación propia. Elegí una marca y encontrá la unidad que necesitás.</p>

          <div class="hero-actions">
            ${settings.trailer_pdf_url?`<a href="${settings.trailer_pdf_url}" download class="hero-cta hero-cta-primary">
              <span class="hero-action-icon">${iconDocument()}</span>
              <span>Ver catálogo de acoplados y semis (PDF)</span>
              <span class="hero-action-arrow" aria-hidden="true">&#8250;</span>
            </a>`:''}

            ${wa?`<a href="${wa}" target="_blank" rel="noopener" class="hero-cta hero-cta-secondary">
              <span class="hero-action-icon">${iconWhatsApp()}</span>
              <span>Consultanos<br>por WhatsApp</span>
              <span class="hero-action-arrow" aria-hidden="true">&#8250;</span>
            </a>`:''}
          </div>

          <div class="hero-commercial">
            <div class="hero-commercial-item">
              <span class="hero-commercial-icon">${iconFinance()}</span>
              <div><strong>Financiación propia</strong><span>Opciones a tu medida.</span></div>
            </div>
            <span class="hero-commercial-divider"></span>
            <div class="hero-commercial-item">
              <span class="hero-commercial-icon">${iconSwap()}</span>
              <div><strong>Recibimos camiones usados</strong><span>${esc(settings.frase_comercial||'En parte de pago y con financiación.')}</span></div>
            </div>
          </div>
        </div>

        ${renderFeaturedCarousel()}
      </div>
    </div>
  </div>`;
}

function initFeaturedCarousel(){
  const featured = getFeaturedVehicles();
  const track = document.getElementById('featuredTrack');
  const viewport = document.getElementById('featuredViewport');
  if(!track || !viewport || !featured.length) return;

  const count = featured.length;
  featuredCarouselIndex = 0;
  let resetting = false;

  function cardStep(){
    const card = track.querySelector('.featured-card');
    if(!card) return 0;
    const styles = getComputedStyle(track);
    const gap = parseFloat(styles.gap || styles.columnGap || '0') || 0;
    return card.getBoundingClientRect().width + gap;
  }

  function updateDots(index){
    const normalized = ((index % count) + count) % count;
    document.querySelectorAll('.featured-dot').forEach((dot,i)=>{
      dot.classList.toggle('active', i===normalized);
    });
  }

  function moveTo(index, animate=true){
    if(resetting) return;
    featuredCarouselIndex = index;
    track.style.transition = animate ? 'transform .55s cubic-bezier(.22,1,.36,1)' : 'none';
    track.style.transform = `translate3d(${-cardStep()*index}px,0,0)`;
    updateDots(index);
  }

  function next(){
    if(count<2 || resetting) return;

    if(featuredCarouselIndex < count-1){
      moveTo(featuredCarouselIndex+1);
      return;
    }

    resetting = true;
    track.style.transition = 'transform .55s cubic-bezier(.22,1,.36,1)';
    track.style.transform = `translate3d(${-cardStep()*count}px,0,0)`;
    updateDots(0);

    setTimeout(()=>{
      featuredCarouselIndex = 0;
      track.style.transition = 'none';
      track.style.transform = 'translate3d(0,0,0)';
      track.offsetHeight;
      resetting = false;
    },570);
  }

  function prev(){
    if(count<2 || resetting) return;

    if(featuredCarouselIndex > 0){
      moveTo(featuredCarouselIndex-1);
      return;
    }

    resetting = true;
    featuredCarouselIndex = count;
    track.style.transition = 'none';
    track.style.transform = `translate3d(${-cardStep()*count}px,0,0)`;
    track.offsetHeight;

    featuredCarouselIndex = count-1;
    track.style.transition = 'transform .55s cubic-bezier(.22,1,.36,1)';
    track.style.transform = `translate3d(${-cardStep()*(count-1)}px,0,0)`;
    updateDots(count-1);

    setTimeout(()=>{ resetting = false; },570);
  }

  function restartAutoplay(){
    if(featuredCarouselTimer) clearInterval(featuredCarouselTimer);
    if(count>1 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches){
      featuredCarouselTimer = setInterval(next,4500);
    }
  }

  document.getElementById('featuredNext')?.addEventListener('click',()=>{
    next();
    restartAutoplay();
  });

  document.getElementById('featuredPrev')?.addEventListener('click',()=>{
    prev();
    restartAutoplay();
  });

  document.querySelectorAll('.featured-dot').forEach(dot=>{
    dot.addEventListener('click',()=>{
      moveTo(Number(dot.dataset.featuredDot));
      restartAutoplay();
    });
  });

  document.querySelectorAll('.featured-card').forEach(card=>{
    const open = ()=>{
      const id = card.dataset.featuredId;
      if(id) go('detail',{vehicleId:id,galleryIndex:0});
    };

    card.addEventListener('click',open);
    card.addEventListener('keydown',e=>{
      if(e.key==='Enter' || e.key===' '){
        e.preventDefault();
        open();
      }
    });
  });

  document.getElementById('featuredMore')?.addEventListener('click',()=>{
    document.getElementById('catalogo')?.scrollIntoView({behavior:'smooth'});
  });

  viewport.addEventListener('mouseenter',()=>{
    if(featuredCarouselTimer) clearInterval(featuredCarouselTimer);
  });

  viewport.addEventListener('mouseleave',restartAutoplay);

  let touchX = null;

  viewport.addEventListener('touchstart',e=>{
    touchX = e.touches[0].clientX;
    if(featuredCarouselTimer) clearInterval(featuredCarouselTimer);
  },{passive:true});

  viewport.addEventListener('touchend',e=>{
    if(touchX!==null){
      const dx = e.changedTouches[0].clientX-touchX;
      if(Math.abs(dx)>40) dx<0 ? next() : prev();
    }
    touchX = null;
    restartAutoplay();
  },{passive:true});

  window.addEventListener('resize',()=>{
    if(document.getElementById('featuredTrack')) moveTo(featuredCarouselIndex,false);
  },{passive:true});

  moveTo(0,false);
  restartAutoplay();
}

function staggerHeroTitle(text){
  return text.split(' ').map((w,i)=>`<span class="stagger-word"><span class="stagger-inner" style="animation-delay:${i*55}ms">${esc(w)}</span></span>`).join(' ');
}
function renderSearchBar(){
  const hasFilters = state.searchQuery || state.filterPrice || state.filterYear;
   return `<div class="search-bar">
    <div class="search-input-wrap">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2"/><path d="M21 21l-4.3-4.3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
      <input type="text" id="searchInput" placeholder="Buscar por marca, modelo o año..." value="${esc(state.searchQuery||'')}">
    </div>
    <select id="filterPrice">
      <option value="">Precio: cualquiera</option>
      <option value="0-50000" ${state.filterPrice==='0-50000'?'selected':''}>Hasta USD 50.000</option>
      <option value="50000-100000" ${state.filterPrice==='50000-100000'?'selected':''}>USD 50.000 - 100.000</option>
      <option value="100000-999999999" ${state.filterPrice==='100000-999999999'?'selected':''}>Más de USD 100.000</option>
    </select>
    <select id="filterYear">
      <option value="">Año: cualquiera</option>
      <option value="2020-2099" ${state.filterYear==='2020-2099'?'selected':''}>2020 en adelante</option>
      <option value="2015-2019" ${state.filterYear==='2015-2019'?'selected':''}>2015 - 2019</option>
      <option value="0-2014" ${state.filterYear==='0-2014'?'selected':''}>Antes de 2015</option>
    </select>
    ${hasFilters?`<button class="btn btn-sm" id="clearFilters">Limpiar</button>`:''}
  </div>`;
}
function renderVehCard(v){
  const sold = v.estado==='vendido';
  const cover = v.fotos && v.fotos[0];
  return `<div class="veh-card" data-id="${v.id}">
    <div class="veh-photo ${sold?'sold':''}">
      ${cover?`<div class="photo-bg" style="background-image:url('${esc(cover)}')"></div>`:`<div class="noimg">Sin foto</div>`}
      <div class="badge ${sold?'vendido':'disponible'}">${sold?'VENDIDO':'DISPONIBLE'}</div>
    </div>
    <div class="veh-body">
      <div class="veh-marca">${esc(v.marca)}</div>
      <div class="veh-modelo">${esc(v.modelo)}</div>
      <div class="veh-specs"><span>${esc(v.anio)||'—'}</span><span>${fmtKm(v.km)}</span>${v.configuracion?`<span>${esc(v.configuracion)}</span>`:''}</div>
      <div class="veh-price">${fmtMoney(v.precio)}</div>
      <div class="veh-finance">✔ Financiación disponible<br>✔ Recibimos usados en parte de pago</div>
    </div>
  </div>`;
}
function renderSearchResults(){
  const list = vehicles.filter(matchesFilters);
  if(list.length===0) return `<div class="empty"><h2>No encontramos camiones con esos filtros</h2></div>`;
  return `<div class="section-title">Resultados (${list.length})</div><div class="veh-grid">${list.map(renderVehCard).join('')}</div>`;
}
function renderBenefits(){
  const items = [
    ['<svg width="19" height="19" viewBox="0 0 24 24" fill="none"><rect x="2" y="6" width="20" height="13" rx="2" stroke="currentColor" stroke-width="1.7"/><path d="M2 10h20" stroke="currentColor" stroke-width="1.7"/></svg>','Financiación propia','Facilitamos la compra con financiación directa.'],
    ['<svg width="19" height="19" viewBox="0 0 24 24" fill="none"><path d="M4 7h13l-3-3M20 17H7l3 3" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>','Usados en parte de pago','Recibimos tu camión como parte del pago.'],
    ['<svg width="19" height="19" viewBox="0 0 24 24" fill="none"><path d="M3 16V8a1 1 0 0 1 1-1h9v9" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/><circle cx="7" cy="17.5" r="1.8" stroke="currentColor" stroke-width="1.7"/><circle cx="17.5" cy="17.5" r="1.8" stroke="currentColor" stroke-width="1.7"/></svg>','Listos para trabajar','Unidades revisadas y listas para salir a ruta.'],
    ['<svg width="19" height="19" viewBox="0 0 24 24" fill="none"><path d="M12 21s-7-4.4-9.5-8.8C.7 8.6 2.4 5 6 5c2 0 3.4 1.1 4 2.3.6-1.2 2-2.3 4-2.3 3.6 0 5.3 3.6 3.5 7.2C19 16.6 12 21 12 21Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>','Atención personalizada','Te acompañamos en cada paso de la operación.']
  ];
  return `<div class="wrap section benefits-wrap"><div class="benefits-grid fade-in">
    ${items.map(([i,t,d])=>`<div class="benefit-card"><div class="benefit-icon">${i}</div><div class="benefit-title">${t}</div><div class="benefit-text">${d}</div></div>`).join('')}
  </div></div>`;
}
function renderAbout(){
  return `<div class="about-section"><div class="wrap about-inner fade-in"><h2>Quiénes somos</h2>
    <p>Somos un equipo dedicado a la comercialización de camiones, tractores y semirremolques. Trabajamos con unidades seleccionadas y ofrecemos financiación propia para facilitar cada operación.</p>
  </div></div>`;
}
function renderCategoryGrid(){
  let html = `<div class="section-title">Buscá por marca</div><div class="section-sub">Tocá una categoría para ver los vehículos disponibles</div><div class="cat-grid">`;
  brands.forEach(b=>{
    const isTrailer = b.nombre.startsWith('Semirremolques');
    html += `<div class="cat-card ${isTrailer?'trailer':''}" data-cat="${esc(b.nombre)}" tabindex="0" role="button">
      <div class="cat-media">${b.logo_url?`<div class="logo-bg" style="background-image:url('${esc(b.logo_url)}')"></div>`:FALLBACK_ICON}</div>
      <div class="cat-mark">${esc(b.nombre)}</div>
      <div class="cat-count">${catCount(b.nombre)} publicados</div>
    </div>`;
  });
  html += `</div>`;
  return html;
}
function renderCategoryHero(){
  return `<div class="hero category-hero"><div class="wrap"><h1>${esc(state.category)}</h1></div></div>`;
}
function renderCategoryList(){
  const list = vehicles.filter(v=>v.marca===state.category).filter(matchesFilters);
  let html = `<button class="backlink" id="backHome">← Volver</button>`;
  html += renderSearchBar();
  if(list.length===0){
    const msg = (state.searchQuery||state.filterPrice||state.filterYear) ? 'No encontramos camiones con esos filtros' : 'Todavía no hay unidades cargadas en esta categoría';
    html += `<div class="empty"><h2>${msg}</h2></div>`;
    return html;
  }
  html += `<div class="veh-grid">${list.map(renderVehCard).join('')}</div>`;
  return html;
}
function renderDetail(){
  const v = vehicles.find(t=>t.id===state.vehicleId);
  if(!v) return `<div class="empty"><h2>No se encontró el vehículo</h2></div>`;
  const fotos = v.fotos || [];
  const idx = state.galleryIndex || 0;
  const sold = v.estado==='vendido';
  const wa = waLink(v);
  let html = `<button class="backlink" id="backCat">← Volver a ${esc(v.marca)}</button><div class="detail-grid">`;
  html += `<div><div class="gallery-main ${sold?'sold':''}" id="galleryMain">
    <div class="badge ${sold?'vendido':'disponible'}" style="top:14px;left:14px;">${sold?'VENDIDO':'DISPONIBLE'}</div>
    ${fotos.length?`<div class="gallery-bg-blur" style="background-image:url('${esc(fotos[idx])}')"></div><div class="gallery-bg-main" style="background-image:url('${esc(fotos[idx])}')"></div>`:`<div class="noimg" style="height:100%;display:flex;align-items:center;justify-content:center;color:#A6ACB8;font-family:var(--font-mono);">Sin fotos cargadas</div>`}
    ${fotos.length>1?`<button class="gallery-nav prev" id="galPrev">‹</button><button class="gallery-nav next" id="galNext">›</button>`:''}
  </div>${fotos.length>1?`<div class="thumbs">${fotos.map((f,i)=>`<div class="thumb ${i===idx?'active':''}" data-i="${i}"><div class="photo-bg" style="background-image:url('${esc(f)}')"></div></div>`).join('')}</div>`:''}</div>`;
  html += `<div class="detail-info fade-in">
    <div class="detail-marca">${esc(v.marca)}</div><h1>${esc(v.modelo)}</h1>
    <div class="detail-price">${fmtMoney(v.precio)}</div>
    <div class="spec-grid">
      ${specItem('marca','Marca',v.marca,true)}${specItem('modelo','Modelo',v.modelo,true)}
      ${specItem('anio','Año',v.anio,true)}${specItem('km','Kilometraje',fmtKm(v.km),true)}
      ${specItem('motor','Motor',v.motor)}${specItem('caja','Caja',v.caja)}
      ${specItem('config','Configuración',v.configuracion)}${specItem('potencia','Potencia',v.potencia)}
      ${specItem('combustible','Combustible',v.combustible)}${specItem('estado','Estado',sold?'Vendido':'Disponible',true)}
    </div>
    ${v.descripcion?`<div class="detail-desc">${esc(v.descripcion)}</div>`:''}
    ${v.observaciones?`<div class="detail-extra"><span class="lbl">Observaciones</span>${esc(v.observaciones)}</div>`:''}
    <div class="detail-actions">
      ${wa?`<a class="wa-btn" href="${wa}" target="_blank" rel="noopener">Consultar por WhatsApp</a>`:''}
      ${wa?`<a class="wa-btn wa-btn-outline" href="${waFinanceLink(v)}" target="_blank" rel="noopener">Solicitar financiación</a>`:''}
    </div>
  </div>`;
  html += `</div>`;
  return html;
}
function renderContact(){
  const wa = waLink(null);
  return `<div class="contact-section"><div class="wrap contact-grid">
    <div><h2>Contacto</h2><p class="lead">${esc(settings.frase_comercial||'')}</p>${wa?`<a class="wa-btn" href="${wa}" target="_blank" rel="noopener">Escribir por WhatsApp</a>`:''}</div>
    <ul class="contact-list">
      ${settings.telefono?`<li><b>Teléfono</b> ${esc(settings.telefono)}</li>`:''}
      ${settings.email?`<li><b>Email</b> <a href="mailto:${esc(settings.email)}">${esc(settings.email)}</a></li>`:''}
      ${settings.direccion?`<li><b>Dirección</b> ${esc(settings.direccion)}</li>`:''}
    </ul>
    ${(settings.instagram||settings.facebook)?`<div class="social-row" style="grid-column:1/-1;">${settings.instagram?`<a href="${esc(settings.instagram)}" target="_blank" rel="noopener">Instagram</a>`:''}${settings.facebook?`<a href="${esc(settings.facebook)}" target="_blank" rel="noopener">Facebook</a>`:''}</div>`:''}
  </div></div>`;
}
function renderFooter(){
  const year = new Date().getFullYear();
  return `<footer>${BRAND_NAME} · Catálogo de vehículos usados<br>© ${year} ${BRAND_NAME}. Todos los derechos reservados.</footer>`;
}
function bind(){
   const logoHome = document.getElementById('logoHome');
  if(logoHome){
    logoHome.addEventListener('click', ()=>go('home'));
    logoHome.addEventListener('keydown', e=>{ if(e.key==='Enter') go('home'); });
  }
  document.querySelectorAll('.cat-card').forEach(el=>{
    el.addEventListener('click', ()=>go('category',{category:el.dataset.cat}));
    el.addEventListener('keydown', e=>{ if(e.key==='Enter') go('category',{category:el.dataset.cat}); });
  });
  const back = document.getElementById('backHome'); if(back) back.addEventListener('click',()=>go('home'));
  const backCat = document.getElementById('backCat'); if(backCat) backCat.addEventListener('click',()=>go('category',{category:state.category}));
  document.querySelectorAll('.veh-card').forEach(el=>el.addEventListener('click',()=>go('detail',{vehicleId:el.dataset.id,galleryIndex:0})));
  const prev = document.getElementById('galPrev'); const next = document.getElementById('galNext');
  if(prev) prev.addEventListener('click',()=>shiftGallery(-1));
  if(next) next.addEventListener('click',()=>shiftGallery(1));
  document.querySelectorAll('.thumb').forEach(el=>el.addEventListener('click',()=>{
    updateGallery(parseInt(el.dataset.i), parseInt(el.dataset.i) > state.galleryIndex ? 1 : -1);
  }));
  const gm = document.getElementById('galleryMain');
  if(gm){
    gm.setAttribute('tabindex','0');
    gm.addEventListener('keydown', e=>{
      if(e.key==='ArrowRight') shiftGallery(1);
      if(e.key==='ArrowLeft') shiftGallery(-1);
    });
    let touchStartX = null;
    gm.addEventListener('touchstart', e=>{ touchStartX = e.touches[0].clientX; }, {passive:true});
    gm.addEventListener('touchend', e=>{
      if(touchStartX===null) return;
      const dx = e.changedTouches[0].clientX - touchStartX;
      if(Math.abs(dx) > 40) shiftGallery(dx < 0 ? 1 : -1);
      touchStartX = null;
    });
    gm.addEventListener('click', ()=>openLightbox(state.galleryIndex));
  }
  const searchInput = document.getElementById('searchInput');
  if(searchInput){
    searchInput.addEventListener('input', (e)=>{
      state.searchQuery = e.target.value;
      render();
      const inp = document.getElementById('searchInput');
      if(inp){ inp.focus(); inp.setSelectionRange(inp.value.length, inp.value.length); }
    });
  }
  const filterPriceEl = document.getElementById('filterPrice');
  if(filterPriceEl) filterPriceEl.addEventListener('change', e=>{ state.filterPrice = e.target.value; render(); });
  const filterYearEl = document.getElementById('filterYear');
  if(filterYearEl) filterYearEl.addEventListener('change', e=>{ state.filterYear = e.target.value; render(); });
  const clearBtn = document.getElementById('clearFilters');
  if(clearBtn) clearBtn.addEventListener('click', ()=>{ state.searchQuery=''; state.filterPrice=''; state.filterYear=''; render(); });
}
function shiftGallery(dir){
  const v = vehicles.find(t=>t.id===state.vehicleId);
  if(!v || !v.fotos || v.fotos.length<2) return;
  const n = v.fotos.length;
  const newIndex = ((state.galleryIndex+dir)%n+n)%n;
  updateGallery(newIndex, dir);
}
function updateGallery(newIndex, dir){
  const v = vehicles.find(t=>t.id===state.vehicleId);
  if(!v || !v.fotos) return;
  const n = v.fotos.length;
  newIndex = ((newIndex%n)+n)%n;
  if(newIndex === state.galleryIndex) return;
  state.galleryIndex = newIndex;
  const main = document.querySelector('.gallery-bg-main');
  const blur = document.querySelector('.gallery-bg-blur');
  if(!main || !blur){ render(); return; }
  const url = v.fotos[newIndex];
  const offset = dir > 0 ? 28 : -28;
  main.style.transition = 'none';
  main.style.opacity = '0';
  main.style.transform = `translateX(${offset}px) scale(1.02)`;
  void main.offsetWidth;
  requestAnimationFrame(()=>{
    main.style.backgroundImage = `url('${url}')`;
    blur.style.backgroundImage = `url('${url}')`;
    main.style.transition = 'opacity 0.32s ease, transform 0.32s cubic-bezier(.2,.7,.3,1)';
    main.style.opacity = '1';
    main.style.transform = 'translateX(0) scale(1)';
  });
  document.querySelectorAll('.thumb').forEach((t,i)=>t.classList.toggle('active', i===newIndex));
}

function openLightbox(idx){
  const v = vehicles.find(t=>t.id===state.vehicleId);
  if(!v || !v.fotos || !v.fotos.length) return;
  state.galleryIndex = idx;
  renderLightbox();
}
function closeLightbox(){
  const el = document.getElementById('lightboxOverlay');
  if(el) el.remove();
  document.body.style.overflow = '';
  document.removeEventListener('keydown', lightboxKeyHandler);
}
function lightboxKeyHandler(e){
  if(e.key==='Escape') closeLightbox();
  if(e.key==='ArrowRight') shiftLightbox(1);
  if(e.key==='ArrowLeft') shiftLightbox(-1);
}
function shiftLightbox(dir){
  const v = vehicles.find(t=>t.id===state.vehicleId);
  if(!v || !v.fotos || v.fotos.length<2) return;
  const n = v.fotos.length;
  state.galleryIndex = ((state.galleryIndex+dir)%n+n)%n;
  const img = document.getElementById('lightboxImg');
  const counter = document.getElementById('lightboxCounter');
  if(img) img.src = v.fotos[state.galleryIndex];
  if(counter) counter.textContent = `${state.galleryIndex+1} / ${v.fotos.length}`;
  const main = document.querySelector('.gallery-bg-main');
  const blur = document.querySelector('.gallery-bg-blur');
  if(main) main.style.backgroundImage = `url('${v.fotos[state.galleryIndex]}')`;
  if(blur) blur.style.backgroundImage = `url('${v.fotos[state.galleryIndex]}')`;
  document.querySelectorAll('.thumb').forEach((t,i)=>t.classList.toggle('active', i===state.galleryIndex));
}
function renderLightbox(){
  const v = vehicles.find(t=>t.id===state.vehicleId);
  if(!v || !v.fotos || !v.fotos.length) return;
  const existing = document.getElementById('lightboxOverlay');
  if(existing) existing.remove();
  const wrap = document.createElement('div');
  wrap.id = 'lightboxOverlay';
  wrap.className = 'lightbox';
  wrap.innerHTML = `
    <button class="lightbox-close" id="lightboxCloseBtn" aria-label="Cerrar">✕</button>
    ${v.fotos.length>1?`<button class="lightbox-nav prev" id="lightboxPrev">‹</button><button class="lightbox-nav next" id="lightboxNext">›</button>`:''}
    <img class="lightbox-img" id="lightboxImg" src="${v.fotos[state.galleryIndex]}" alt="${esc(v.marca)} ${esc(v.modelo)}">
    ${v.fotos.length>1?`<div class="lightbox-counter" id="lightboxCounter">${state.galleryIndex+1} / ${v.fotos.length}</div>`:''}
  `;
  document.body.appendChild(wrap);
  document.body.style.overflow = 'hidden';
  wrap.addEventListener('click', (e)=>{ if(e.target===wrap) closeLightbox(); });
  document.getElementById('lightboxCloseBtn').addEventListener('click', closeLightbox);
  const p = document.getElementById('lightboxPrev'); if(p) p.addEventListener('click', ()=>shiftLightbox(-1));
  const n = document.getElementById('lightboxNext'); if(n) n.addEventListener('click', ()=>shiftLightbox(1));
  document.addEventListener('keydown', lightboxKeyHandler);
  let startX = null;
  wrap.addEventListener('touchstart', e=>{ startX = e.touches[0].clientX; }, {passive:true});
  wrap.addEventListener('touchend', e=>{
    if(startX===null) return;
    const dx = e.changedTouches[0].clientX - startX;
    if(Math.abs(dx) > 40) shiftLightbox(dx < 0 ? 1 : -1);
    startX = null;
  });
}

loadData();
