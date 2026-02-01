import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.PUBLIC_SUPABASE_URL;
const key = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;
if (!url || !key) {
  document.getElementById('admin-content').innerHTML = '<p>חסרים משתני סביבה של Supabase.</p>';
  throw new Error('Missing Supabase env');
}

const supabase = createClient(url, key);

export async function requireAdmin(callback) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname);
    return;
  }
  const { data: profile } = await supabase.from('profiles').select('role').eq('user_id', user.id).single();
  const role = profile?.role || 'author';
  if (role !== 'admin' && role !== 'editor') {
    document.getElementById('admin-content').innerHTML = '<p>אין לך הרשאה לגשת לדף זה.</p>';
    return;
  }
  document.getElementById('admin-user').textContent = user.email || '';
  if (callback) await callback({ user, profile, supabase });
}
