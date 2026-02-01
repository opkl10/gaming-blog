import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.PUBLIC_SUPABASE_URL;
const key = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;
const adminContent = () => document.getElementById('admin-content');
if (!url || !key) {
  const el = adminContent();
  if (el) el.innerHTML = '<p>חסרים משתני סביבה של Supabase.</p>';
  throw new Error('Missing Supabase env');
}

const supabase = createClient(url, key, {
  auth: { persistSession: true, storageKey: 'sb-gaming-blog-auth', detectSessionInUrl: true }
});

export async function requireAdmin(callback) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname);
    return;
  }
  const { data: profile } = await supabase.from('profiles').select('role').eq('user_id', user.id).single();
  const role = profile?.role || 'author';
  if (role !== 'admin' && role !== 'editor') {
    const el = adminContent();
    if (el) {
      el.innerHTML = '<p>אין לך הרשאה לגשת לדף זה.</p>';
      const slot = el.nextElementSibling;
      if (slot) slot.style.display = 'none';
    }
    return;
  }
  const ac = adminContent();
  if (ac && ac.nextElementSibling) ac.nextElementSibling.style.display = '';
  const userEl = document.getElementById('admin-user');
  if (userEl) userEl.textContent = user.email || '';
  if (callback) await callback({ user, profile, supabase });
}
