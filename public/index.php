<?php
require_once __DIR__ . '/bootstrap.php';

$pageTitle = 'ראשי';
$posts = Post::getList(6, 0);
$pages = Page::getAll(true);

require __DIR__ . '/layouts/header.php';
?>
<section class="hero">
    <div class="container">
        <h1>ברוכים הבאים לבלוג משחקי המחשב</h1>
        <p>ביקורות, טיפים וחדשות מהעולם של משחקי המחשב</p>
    </div>
</section>

<section class="recent-posts">
    <div class="container">
        <h2>פוסטים אחרונים</h2>
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
            <p class="no-posts">עדיין אין פוסטים. היכנס לפאנל הניהול כדי ליצור פוסט ראשון.</p>
        <?php endif; ?>
        <p class="all-posts-link"><a href="<?= SITE_URL ?>/posts.php">כל הפוסטים</a></p>
    </div>
</section>

<?php if (!empty($pages)): ?>
<section class="pages-list">
    <div class="container">
        <h2>עמודים</h2>
        <ul>
            <?php foreach ($pages as $p): ?>
                <li><a href="<?= SITE_URL ?>/page.php?slug=<?= e(urlencode($p['slug'])) ?>"><?= e($p['title']) ?></a></li>
            <?php endforeach; ?>
        </ul>
    </div>
</section>
<?php endif; ?>

<?php require __DIR__ . '/layouts/footer.php'; ?>
