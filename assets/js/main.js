// Gaming Blog - Frontend
document.addEventListener('DOMContentLoaded', function () {
  // Optional: auto-generate slug from title in forms
  var titleEl = document.getElementById('title');
  var slugEl = document.getElementById('slug');
  if (titleEl && slugEl && !slugEl.value) {
    titleEl.addEventListener('input', function () {
      if (!slugEl.dataset.touched) {
        slugEl.value = titleEl.value
          .trim()
          .replace(/\s+/g, '-')
          .replace(/[^\p{L}\p{N}-]/gu, '')
          .toLowerCase();
      }
    });
    slugEl.addEventListener('input', function () {
      slugEl.dataset.touched = '1';
    });
  }
});
