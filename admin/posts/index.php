<?php
require_once dirname(__DIR__, 2) . '/admin/bootstrap.php';

$pageTitle = 'פוסטים';
$posts = Post::getAll(false);

require dirname(__DIR__) . '/layouts/header.php';
?>
<div class="container">
    <h1>פוסטים</h1>
    <p><a href="<?= ADMIN_URL ?>/posts/add.php" class="btn btn-primary">פוסט חדש</a></p>
    <table class="data-table">
        <thead>
            <tr>
                <th>כותרת</th>
                <th>מחבר</th>
                <th>סטטוס</th>
                <th>תאריך פרסום</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <?php foreach ($posts as $p): ?>
                <tr>
                    <td><?= e($p['title']) ?></td>
                    <td><?= e($p['author_name'] ?? '-') ?></td>
                    <td><?= $p['is_published'] ? 'מפורסם' : 'טיוטה' ?></td>
                    <td><?= format_date($p['published_at'] ?? $p['created_at']) ?></td>
                    <td>
                        <?php if ($p['is_published']): ?>
                            <a href="<?= SITE_URL ?>/post.php?slug=<?= e(urlencode($p['slug'])) ?>" target="_blank">צפה</a>
                        <?php endif; ?>
                        <a href="<?= ADMIN_URL ?>/posts/edit.php?id=<?= $p['id'] ?>">ערוך</a>
                        <a href="<?= ADMIN_URL ?>/posts/delete.php?id=<?= $p['id'] ?>" class="link-danger" onclick="return confirm('למחוק את הפוסט?');">מחק</a>
                    </td>
                </tr>
            <?php endforeach; ?>
        </tbody>
    </table>
    <?php if (empty($posts)): ?>
        <p>אין פוסטים. <a href="<?= ADMIN_URL ?>/posts/add.php">צור פוסט ראשון</a></p>
    <?php endif; ?>
</div>
<?php require dirname(__DIR__) . '/layouts/footer.php';
