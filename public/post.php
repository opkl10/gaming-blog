<?php
require_once __DIR__ . '/bootstrap.php';

$slug = trim($_GET['slug'] ?? '');
if (!$slug) {
    header('Location: ' . SITE_URL . '/posts.php');
    exit;
}

$post = Post::getBySlug($slug);
if (!$post) {
    http_response_code(404);
    $pageTitle = 'פוסט לא נמצא';
    require __DIR__ . '/layouts/header.php';
    echo '<div class="container"><p>הפוסט המבוקש לא נמצא.</p><a href="' . SITE_URL . '/posts.php">כל הפוסטים</a></div>';
    require __DIR__ . '/layouts/footer.php';
    exit;
}

$pageTitle = $post['title'];
$metaDescription = $post['meta_description'] ?? $post['excerpt'] ?? truncate(strip_tags($post['content']), 160);

require __DIR__ . '/layouts/header.php';
?>
<article class="single-post">
    <div class="container">
        <?php if (!empty($post['featured_image'])): ?>
            <div class="post-featured-image">
                <img src="<?= e($post['featured_image']) ?>" alt="<?= e($post['title']) ?>">
            </div>
        <?php endif; ?>
        <header class="post-header">
            <h1><?= e($post['title']) ?></h1>
            <p class="post-meta"><?= format_date($post['published_at']) ?> · <?= e($post['author_name'] ?? 'אנונימי') ?></p>
        </header>
        <div class="post-content prose">
            <?= $post['content'] ?>
        </div>
    </div>
</article>
<?php require __DIR__ . '/layouts/footer.php'; ?>
