<?php
require_once dirname(__DIR__, 2) . '/admin/bootstrap.php';

$id = (int)($_GET['id'] ?? 0);
$post = $id ? Post::getById($id) : null;
if (!$post) {
    redirect(ADMIN_URL . '/posts/');
}

$pageTitle = 'עריכת פוסט';
$errors = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST' && csrf_verify()) {
    $title = trim($_POST['title'] ?? '');
    $slug = trim($_POST['slug'] ?? '') ?: slugify($title);
    $excerpt = trim($_POST['excerpt'] ?? '');
    $content = $_POST['content'] ?? '';
    $featured_image = trim($_POST['featured_image'] ?? '');
    $meta_description = trim($_POST['meta_description'] ?? '');
    $is_published = isset($_POST['is_published']) ? 1 : 0;

    if (!$title) $errors[] = 'כותרת חובה';
    if (empty($errors)) {
        Post::update($id, [
            'title' => $title,
            'slug' => $slug,
            'excerpt' => $excerpt,
            'content' => $content,
            'featured_image' => $featured_image ?: null,
            'meta_description' => $meta_description,
            'is_published' => $is_published,
        ]);
        redirect(ADMIN_URL . '/posts/');
    }
} else {
    $_POST = $post;
}

require dirname(__DIR__) . '/layouts/header.php';
?>
<div class="container">
    <h1>עריכת פוסט</h1>
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
            <input type="text" id="slug" name="slug" value="<?= e($_POST['slug'] ?? '') ?>">
        </div>
        <div class="form-group">
            <label for="excerpt">תקציר</label>
            <textarea id="excerpt" name="excerpt" rows="3"><?= e($_POST['excerpt'] ?? '') ?></textarea>
        </div>
        <div class="form-group">
            <label for="content">תוכן</label>
            <textarea id="content" name="content" rows="14"><?= e($_POST['content'] ?? '') ?></textarea>
        </div>
        <div class="form-group">
            <label for="featured_image">כתובת תמונת כותרת</label>
            <input type="url" id="featured_image" name="featured_image" value="<?= e($_POST['featured_image'] ?? '') ?>">
        </div>
        <div class="form-group">
            <label for="meta_description">תיאור (SEO)</label>
            <input type="text" id="meta_description" name="meta_description" value="<?= e($_POST['meta_description'] ?? '') ?>">
        </div>
        <div class="form-group">
            <label><input type="checkbox" name="is_published" value="1" <?= !empty($_POST['is_published']) ? 'checked' : '' ?>> מפורסם</label>
        </div>
        <button type="submit" class="btn btn-primary">שמור שינויים</button>
        <a href="<?= ADMIN_URL ?>/posts/" class="btn btn-secondary">ביטול</a>
    </form>
</div>
<?php require dirname(__DIR__) . '/layouts/footer.php';
