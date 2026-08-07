// Conexión a Supabase — la clave "anon" es pública a propósito,
// la seguridad real la dan las políticas RLS configuradas en la base de datos.
const SUPABASE_URL = 'https://ottnzvrsthcmzrikmvyb.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im90dG56dnJzdGhjbXpyaWttdnliIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYwMTkyOTAsImV4cCI6MjEwMTU5NTI5MH0.EM_VBymeYrv2TbgNv-bWU8cYrXhZA7Xk24h6mjTWMWQ';

const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const BUCKET = 'catalogo';

function publicUrlFor(path){
  const { data } = sb.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

async function uploadToBucket(file, folder){
  const ext = (file.name.split('.').pop() || 'jpg').toLowerCase();
  const path = `${folder}/${Date.now()}_${Math.random().toString(36).slice(2,8)}.${ext}`;
  const { error } = await sb.storage.from(BUCKET).upload(path, file, { upsert: false });
  if(error) throw error;
  return publicUrlFor(path);
}
