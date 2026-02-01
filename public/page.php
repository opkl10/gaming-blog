<?php
require_once __DIR__ . '/bootstrap.php';

$slug = trim($_GET['slug'] ?? '');
if (!$slug) {
    header('Location: ' . SITE_URL . '/index.php');
    exit;
}

$page = Page::getBySlug($slug);
if (!$page) {
    http_response_code(404);
    $pageTitle = 'עמוד לא נמצא';
    require __DIR__ . '/layouts/header.php';
    echo '<div class="container"><p>העמוד המבוקש לא נמצא.</p><a href="' . SITE_URL . '/index.php">חזרה לראשי</a></div>';
    require __DIR__ . '/layouts/footer.php';
    exit;
}

$pageTitle = $page['title'];
$metaDescription = $page['meta_description'] ?? truncate(strip_tags($page['content']), 160);

require __DIR__ . '/layouts/header.php';
?>
<article class="single-page">
    <div class="container">
        <h1><?= e($page['title']) ?></h1>
        <div class="page-content prose">
            <?= $page['content'] ?>
        </div>
    </div>
</article>
<?php require __DIR__ . '/layouts/footer.php'; ?>
