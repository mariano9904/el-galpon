# El Galpón — sitio real (Supabase)

## Estructura
- `index.html` — sitio público (lo que ven los clientes)
- `admin.html` — panel de administración (con login real, nadie llega ahí sin cuenta)
- `assets/style.css` — todo el diseño
- `assets/supabase-client.js` — conexión a tu base de datos
- `assets/public.js` — lógica del sitio público
- `assets/admin.js` — lógica del panel

## Cómo publicarlo (resumen, ya con las cuentas creadas)

1. **Subir a GitHub**: creá un repositorio nuevo (botón "New" en github.com) y subí estos archivos tal cual (podés arrastrarlos desde la web de GitHub, "Add file" → "Upload files", no hace falta usar la terminal).
2. **Conectar Vercel**: entrá a vercel.com, iniciá sesión con GitHub, "Add New Project", elegí el repositorio que acabás de crear, dejá todo por defecto y "Deploy".
3. Vercel te va a dar un link público (tipo `elgalpon.vercel.app`) — ese es el que usás en Marketplace.
4. Para entrar al panel: `tulink.vercel.app/admin.html`, con el email y contraseña que creaste en Supabase → Authentication.

## Después de publicado
- Subí el logo de cada marca y las fotos desde el panel, igual que veníamos haciendo.
- El PDF de acoplados y semis que ya armamos lo tenés en `acoplados-semis.pdf` — subilo una vez desde Ajustes → "Catálogo de acoplados y semis (PDF)".
