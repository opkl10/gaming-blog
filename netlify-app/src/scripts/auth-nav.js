import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.PUBLIC_SUPABASE_URL;
const key = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

if (url && key) {
  const supabase = createClient(url, key, {
    auth: { persistSession: true, storageKey: 'sb-gaming-blog-auth', detectSessionInUrl: true }
  });

  async function updateNav() {
    let user = null;
    try {
      const { data } = await supabase.auth.getUser();
      user = data?.user ?? null;
    } catch (e) {
      if (e?.name !== 'AbortError' && !e?.message?.includes('aborted')) throw e;
      return;
    }
    const loginEl = document.getElementById('nav-login');
    const registerEl = document.getElementById('nav-register');
    const adminEl = document.getElementById('nav-admin');
    const logoutEl = document.getElementById('nav-logout');
    if (user) {
      if (loginEl) loginEl.style.display = 'none';
      if (registerEl) registerEl.style.display = 'none';
      if (adminEl) adminEl.style.display = '';
      if (logoutEl) {
        logoutEl.style.display = '';
        logoutEl.href = '/logout';
      }
    } else {
      if (loginEl) loginEl.style.display = '';
      if (registerEl) registerEl.style.display = '';
      if (adminEl) adminEl.style.display = 'none';
      if (logoutEl) logoutEl.style.display = 'none';
    }
  }

  updateNav();
  supabase.auth.onAuthStateChange(() => {
    updateNav().catch(() => {});
  });
}
