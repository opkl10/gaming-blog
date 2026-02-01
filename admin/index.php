<?php
require_once __DIR__ . '/bootstrap.php';

$pageTitle = 'דשבורד';
$postsCount = Post::count(false);
$postsPublished = Post::count(true);
$pagesCount = count(Page::getAll(false));
$recentPosts = Post::getAll(false);
$recentPosts = array_slice($recentPosts, 0, 5);

require __DIR__ . '/layouts/header.php';
?>
<div class="container">
    <h1>דשבורד</h1>
    <div class="dashboard-cards">
        <div class="card">
            <h3>פוסטים</h3>
            <p class="big"><?= $postsPublished ?> מפורסמים</p>
            <p><?= $postsCount - $postsPublished ?> טיוטות</p>
            <a href="<?= ADMIN_URL ?>/posts/" class="btn btn-primary">נהל פוסטים</a>
        </div>
        <div class="card">
            <h3>עמודים</h3>
            <p class="big"><?= $pagesCount ?></p>
            <a href="<?= ADMIN_URL ?>/pages/" class="btn btn-primary">נהל עמודים</a>
        </div>
    </div>
    <section class="recent-list">
        <h2>פוסטים אחרונים</h2>
        <table class="data-table">
            <thead>
                <tr>
                    <th>כותרת</th>
                    <th>סטטוס</th>
                    <th>תאריך</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($recentPosts as $p): ?>
                    <tr>
                        <td><?= e($p['title']) ?></td>
                        <td><?= $p['is_published'] ? 'מפורסם' : 'טיוטה' ?></td>
                        <td><?= format_date($p['published_at'] ?? $p['created_at']) ?></td>
                        <td><a href="<?= ADMIN_URL ?>/posts/edit.php?id=<?= $p['id'] ?>">ערוך</a></td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
        <?php if (empty($recentPosts)): ?>
            <p>אין פוסטים. <a href="<?= ADMIN_URL ?>/posts/add.php">צור פוסט ראשון</a></p>
        <?php endif; ?>
    </section>
</div>
<?php require __DIR__ . '/layouts/footer.php'; ?>
