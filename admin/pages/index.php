<?php
require_once dirname(__DIR__, 2) . '/admin/bootstrap.php';

$pageTitle = 'עמודים';
$pages = Page::getAll(false);

require dirname(__DIR__) . '/layouts/header.php';
?>
<div class="container">
    <h1>עמודים</h1>
    <p><a href="<?= ADMIN_URL ?>/pages/add.php" class="btn btn-primary">עמוד חדש</a></p>
    <table class="data-table">
        <thead>
            <tr>
                <th>כותרת</th>
                <th>קישור</th>
                <th>סטטוס</th>
                <th>עודכן</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <?php foreach ($pages as $p): ?>
                <tr>
                    <td><?= e($p['title']) ?></td>
                    <td><a href="<?= SITE_URL ?>/page.php?slug=<?= e(urlencode($p['slug'])) ?>" target="_blank">/page.php?slug=<?= e($p['slug']) ?></a></td>
                    <td><?= $p['is_published'] ? 'מפורסם' : 'טיוטה' ?></td>
                    <td><?= format_date($p['updated_at']) ?></td>
                    <td>
                        <a href="<?= ADMIN_URL ?>/pages/edit.php?id=<?= $p['id'] ?>">ערוך</a>
                        <a href="<?= ADMIN_URL ?>/pages/delete.php?id=<?= $p['id'] ?>" class="link-danger" onclick="return confirm('למחוק את העמוד?');">מחק</a>
                    </td>
                </tr>
            <?php endforeach; ?>
        </tbody>
    </table>
    <?php if (empty($pages)): ?>
        <p>אין עמודים. <a href="<?= ADMIN_URL ?>/pages/add.php">צור עמוד ראשון</a></p>
    <?php endif; ?>
</div>
<?php require dirname(__DIR__) . '/layouts/footer.php';
