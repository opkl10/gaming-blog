<?php
require_once __DIR__ . '/bootstrap.php';

$pageTitle = 'פוסטים';
$perPage = 9;
$page = max(1, (int)($_GET['p'] ?? 1));
$offset = ($page - 1) * $perPage;
$total = Post::count(true);
$posts = Post::getList($perPage, $offset);
$totalPages = (int) ceil($total / $perPage);

require __DIR__ . '/layouts/header.php';
?>
<section class="posts-archive">
    <div class="container">
        <h1>כל הפוסטים</h1>
        <div class="posts-grid">
            <?php foreach ($posts as $post): ?>
                <article class="post-card">
                    <?php if (!empty($post['featured_image'])): ?>
                        <a href="<?= SITE_URL ?>/post.php?slug=<?= e(urlencode($post['slug'])) ?>" class="post-image">
                            <img src="<?= e($post['featured_image']) ?>" alt="<?= e($post['title']) ?>">
                        </a>
                    <?php endif; ?>
                    <div class="post-body">
                        <h3><a href="<?= SITE_URL ?>/post.php?slug=<?= e(urlencode($post['slug'])) ?>"><?= e($post['title']) ?></a></h3>
                        <p class="post-meta"><?= format_date($post['published_at']) ?> · <?= e($post['author_name'] ?? 'אנונימי') ?></p>
                        <p class="post-excerpt"><?= e(truncate($post['excerpt'] ?: $post['content'], 120)) ?></p>
                        <a href="<?= SITE_URL ?>/post.php?slug=<?= e(urlencode($post['slug'])) ?>" class="read-more">קרא עוד</a>
                    </div>
                </article>
            <?php endforeach; ?>
        </div>
        <?php if (empty($posts)): ?>
            <p class="no-posts">אין פוסטים עדיין.</p>
        <?php endif; ?>
        <?php if ($totalPages > 1): ?>
            <nav class="pagination">
                <?php for ($i = 1; $i <= $totalPages; $i++): ?>
                    <a href="?p=<?= $i ?>" class="<?= $i === $page ? 'current' : '' ?>"><?= $i ?></a>
                <?php endfor; ?>
            </nav>
        <?php endif; ?>
    </div>
</section>
<?php require __DIR__ . '/layouts/footer.php'; ?>
