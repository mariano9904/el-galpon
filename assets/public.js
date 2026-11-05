const BRAND_NAME = 'El Galpón';
const LOGO = "<img class=\"logo-mark\" src=\"data:image/jpeg;base64,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\" alt=\"Isotipo original de EL GALPON\" width=\"37\" height=\"32\" style=\"object-fit:contain\">";
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
  updateSeo();
  bind();
  if(state.view==='home'){ adjustHeroHeight(); bindHeroResize(); initFeaturedCarousel(); }
}
function upsertMeta(attribute, value, content){
  let el = document.head.querySelector(`meta[${attribute}="${value}"]`);
  if(!el){ el = document.createElement('meta'); el.setAttribute(attribute,value); document.head.appendChild(el); }
  el.setAttribute('content',content);
}
function updateSeo(){
  const homeTitle = 'El Galpón — Camiones usados listos para trabajar';
  let title = homeTitle;
  let description = 'El Galpón: catálogo de camiones usados, tractores y semirremolques en General Pico, La Pampa. Consultá unidades, financiación propia y recepción de usados por WhatsApp.';
  const current = state.vehicleId ? vehicles.find(v=>v.id===state.vehicleId) : null;
  if(state.view==='category' && state.category){
    title = `Camiones ${state.category} usados — El Galpón`;
    description = `Camiones ${state.category} usados disponibles en El Galpón. Consultá modelos, años, fotos y financiación propia por WhatsApp.`;
  } else if(state.view==='detail' && current){
    title = `${current.marca} ${current.modelo} usado — El Galpón`;
    description = `Mirá las fotos y características del ${current.marca} ${current.modelo}${current.anio?` modelo ${current.anio}`:''}. Consultá precio y financiación en El Galpón.`;
  }
  document.title = title;
  upsertMeta('name','description',description);
  upsertMeta('property','og:title',title);
  upsertMeta('property','og:description',description);
  upsertMeta('name','twitter:title',title);
  upsertMeta('name','twitter:description',description);
  const oldSchema = document.getElementById('dynamicProductSchema');
  if(oldSchema) oldSchema.remove();
  if(state.view==='detail' && current){
    const schema = {
      '@context':'https://schema.org', '@type':'Product',
      name:`${current.marca} ${current.modelo}`,
      description: current.descripcion || description,
      brand:{'@type':'Brand',name:current.marca},
      image:Array.isArray(current.fotos) ? current.fotos.filter(Boolean) : []
    };
    if(current.precio!=='' && current.precio!=null && !isNaN(Number(current.precio))) schema.offers={
      '@type':'Offer', price:Number(current.precio), priceCurrency:'USD', availability:current.estado==='vendido'?'https://schema.org/SoldOut':'https://schema.org/InStock', url:'https://www.elgalponcamiones.com/'
    };
    const script = document.createElement('script');
    script.id = 'dynamicProductSchema'; script.type='application/ld+json';
    script.textContent = JSON.stringify(schema).replace(/</g,'\\u003c');
    document.head.appendChild(script);
  }
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
    <nav class="site-nav" aria-label="Navegación principal">
      <button type="button" data-nav="inicio">Inicio</button>
      <button type="button" data-nav="catalogo">Vehículos</button>
      <button type="button" data-nav="nosotros">Nosotros</button>
      <button type="button" data-nav="contacto">Contacto</button>
    </nav>
  </div></div>`;
}
function renderFloatingWA(){
  const wa = waLink(null);
  if(!wa) return '';
  return `<a class="wa-float" href="${wa}" target="_blank" rel="noopener" aria-label="WhatsApp"><svg width="26" height="26" viewBox="0 0 24 24" fill="#fff"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Z"/></svg></a>`;
}
function renderBody(){
  if(state.view==='category') return renderCategoryHero() + `<section class="catalog-shell"><div class="wrap section" id="catalogo">${renderCategoryList()}</div></section>`;
  if(state.view==='detail') return `<div class="wrap section">${renderDetail()}</div>`;
  const hasFilters = !!(state.searchQuery || state.filterPrice || state.filterYear);
  if(hasFilters){
    return renderHero() + `<section class="catalog-shell"><div class="wrap section" id="catalogo">${renderSearchBar()}${renderSearchResults()}</div></section>`;
  }
  return renderHero() + `<section class="catalog-shell"><div class="wrap section" id="catalogo">${renderSearchBar()}${renderCategoryGrid()}</div></section>` + renderBenefits() + renderAbout();
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
    .filter(v=>v.destacado===true && Array.isArray(v.fotos) && v.fotos.length && v.fotos[0])
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
    <div class="featured-photo" role="img" aria-label="${esc(title)}" style="background-image:url('${esc(cover)}')">
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
    </div><p class="featured-swipe-hint" aria-hidden="true">Deslizá para ver más unidades</p>`:''}
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
    const isMobile = window.matchMedia('(max-width: 600px)').matches;
    if(count>1 && !isMobile && !window.matchMedia('(prefers-reduced-motion: reduce)').matches){
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
      if(Math.abs(dx)>32) dx<0 ? next() : prev();
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
    <div class="veh-photo ${sold?'sold':''}" role="img" aria-label="Foto de ${esc(v.marca)} ${esc(v.modelo)}">
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
  return `<section class="about-section" id="nosotros" aria-labelledby="aboutTitle">
    <div class="wrap about-layout fade-in">
      <div class="about-copy">
        <div class="about-eyebrow">El Galpón</div>
        <h2 id="aboutTitle">Unidades para seguir trabajando</h2>
        <p>Somos un equipo dedicado a la comercialización de camiones, tractores y semirremolques. Te ayudamos a encontrar una unidad que se adapte a tu trabajo y a tu operación.</p>
        <p>Trabajamos con unidades seleccionadas, recibimos usados como parte de pago y ofrecemos financiación propia para que el proceso sea más simple.</p>
        <button type="button" class="about-link" data-nav="contacto">Hablemos de tu próxima unidad <span aria-hidden="true">→</span></button>
      </div>
      <div class="about-points" aria-label="Nuestro compromiso">
        <div class="about-point">
          <span class="about-point-icon">${iconSwap()}</span>
          <div><strong>Tomamos usados</strong><span>Tu camión puede ser parte de pago.</span></div>
        </div>
        <div class="about-point">
          <span class="about-point-icon">${iconFinance()}</span>
          <div><strong>Financiación propia</strong><span>Alternativas pensadas para cada operación.</span></div>
        </div>
        <div class="about-point">
          <span class="about-point-icon">${iconWhatsApp()}</span>
          <div><strong>Atención directa</strong><span>Consultanos y coordinamos sin intermediarios.</span></div>
        </div>
      </div>
    </div>
  </section>`;
}
function renderCategoryGrid(){
  let html = `<div class="section-title">Buscá por marca</div><div class="section-sub">Tocá una categoría para ver los vehículos disponibles</div><div class="cat-grid">`;
  brands.forEach(b=>{
    const isTrailer = b.nombre.startsWith('Semirremolques');
    html += `<div class="cat-card ${isTrailer?'trailer':''}" data-cat="${esc(b.nombre)}" tabindex="0" role="button">
      <div class="cat-media">${b.logo_url?`<img class="logo-image" src="${esc(b.logo_url)}" alt="Logo ${esc(b.nombre)}" loading="lazy">`:FALLBACK_ICON}</div>
      <div class="cat-mark">${esc(b.nombre)}</div>
      <div class="cat-count">${catCount(b.nombre)} publicados</div>
    </div>`;
  });
  html += `</div>`;
  return html;
}
function renderCategoryHero(){
  const available = vehicles.filter(v=>v.marca===state.category && v.estado!=='vendido').length;
  const label = available===1 ? 'unidad disponible' : `${available} unidades disponibles`;
  return `<section class="hero category-hero">
    <div class="wrap category-hero-inner">
      <button class="category-back" id="backHome" type="button"><span aria-hidden="true">←</span> Todas las marcas</button>
      <div class="category-hero-content">
        <div class="category-eyebrow">Catálogo de vehículos</div>
        <h1>${esc(state.category)}</h1>
        <p>${label}</p>
      </div>
    </div>
  </section>`;
}
function renderCategoryList(){
  const list = vehicles.filter(v=>v.marca===state.category).filter(matchesFilters);
  let html = `<div class="catalog-intro"><span>Unidades disponibles</span><h2>Encontrá la unidad que necesitás</h2></div>`;
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
  return `<div class="contact-section" id="contacto"><div class="wrap contact-grid">
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
  document.querySelectorAll('[data-nav]').forEach(el=>el.addEventListener('click', ()=>navigateToSection(el.dataset.nav)));
  bindAnalyticsEvents();
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

function bindAnalyticsEvents(){
  if(typeof window.gtag!=='function') return;
  document.querySelectorAll('a[href*="wa.me"]').forEach(link=>link.addEventListener('click',()=>{
    const vehicle = state.vehicleId ? vehicles.find(v=>v.id===state.vehicleId) : null;
    window.gtag('event','whatsapp_click',{
      link_location: link.className || 'whatsapp',
      vehicle: vehicle ? `${vehicle.marca} ${vehicle.modelo}` : 'general'
    });
  }));
  document.querySelectorAll('a[download]').forEach(link=>link.addEventListener('click',()=>{
    window.gtag('event','catalog_pdf_click',{file_name:link.getAttribute('href')||'catalogo'});
  }));
}

function navigateToSection(section){
  const targets = {inicio:'mainHero',catalogo:'catalogo',nosotros:'nosotros',contacto:'contacto'};
  const targetId = targets[section];
  if(!targetId) return;
  const scroll = ()=>document.getElementById(targetId)?.scrollIntoView({
    behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    block:'start'
  });
  // Contacto se muestra en todas las vistas: conservar la ficha o marca actual.
  if(section === 'contacto'){
    scroll();
    return;
  }
  if(state.view !== 'home'){
    go('home');
    requestAnimationFrame(scroll);
    return;
  }
  scroll();
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
