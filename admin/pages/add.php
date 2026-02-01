<?php
require_once dirname(__DIR__, 2) . '/admin/bootstrap.php';

Auth::requireAdmin();

$pageTitle = 'עמוד חדש';
$errors = [];
$success = false;

if ($_SERVER['REQUEST_METHOD'] === 'POST' && csrf_verify()) {
    $title = trim($_POST['title'] ?? '');
    $slug = trim($_POST['slug'] ?? '') ?: slugify($title);
    $content = $_POST['content'] ?? '';
    $meta_description = trim($_POST['meta_description'] ?? '');
    $is_published = isset($_POST['is_published']) ? 1 : 0;

    if (!$title) $errors[] = 'כותרת חובה';
    if (empty($errors)) {
        $existing = Page::getBySlug($slug);
        if ($existing) $errors[] = 'כבר קיים עמוד עם קישור זה. שנה את הקישור.';
    }
    if (empty($errors)) {
        Page::create([
            'title' => $title,
            'slug' => $slug,
            'content' => $content,
            'meta_description' => $meta_description,
            'is_published' => $is_published,
            'created_by' => Auth::user()['id'],
        ]);
        $success = true;
        redirect(ADMIN_URL . '/pages/');
    }
}

require dirname(__DIR__) . '/layouts/header.php';
?>
<div class="container">
    <h1>עמוד חדש</h1>
    <?php if ($success): redirect(ADMIN_URL . '/pages/'); endif; ?>
    <?php foreach ($errors as $e): ?>
        <div class="alert alert-error"><?= e($e) ?></div>
    <?php endforeach; ?>
    <form method="post" class="editor-form">
        <?= csrf_field() ?>
        <div class="form-group">
            <label for="title">כותרת *</label>
            <input type="text" id="title" name="title" required value="<?= e($_POST['title'] ?? '') ?>">
        </div>
        <div class="form-group">
            <label for="slug">קישור (slug)</label>
            <input type="text" id="slug" name="slug" value="<?= e($_POST['slug'] ?? '') ?>" placeholder="ינוצר אוטומטית מהכותרת">
        </div>
        <div class="form-group">
            <label for="content">תוכן</label>
            <textarea id="content" name="content" rows="12"><?= e($_POST['content'] ?? '') ?></textarea>
        </div>
        <div class="form-group">
            <label for="meta_description">תיאור (SEO)</label>
            <input type="text" id="meta_description" name="meta_description" value="<?= e($_POST['meta_description'] ?? '') ?>">
        </div>
        <div class="form-group">
            <label><input type="checkbox" name="is_published" value="1" <?= isset($_POST['is_published']) ? 'checked' : 'checked' ?>> מפורסם</label>
        </div>
        <button type="submit" class="btn btn-primary">שמור עמוד</button>
        <a href="<?= ADMIN_URL ?>/pages/" class="btn btn-secondary">ביטול</a>
    </form>
</div>
<?php require dirname(__DIR__) . '/layouts/footer.php';
