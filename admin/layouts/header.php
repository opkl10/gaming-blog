<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= isset($pageTitle) ? e($pageTitle) . ' | ' : '' ?>פאנל ניהול</title>
    <link rel="stylesheet" href="<?= BASE_URL ?>/assets/css/style.css">
    <link rel="stylesheet" href="<?= BASE_URL ?>/assets/css/admin.css">
</head>
<body class="admin-body">
<header class="admin-header">
    <div class="container">
        <a href="<?= ADMIN_URL ?>/index.php" class="admin-logo">פאנל ניהול · <?= e(SITE_NAME) ?></a>
        <nav class="admin-nav">
            <a href="<?= SITE_URL ?>/index.php" target="_blank">צפה באתר</a>
            <a href="<?= ADMIN_URL ?>/index.php">דשבורד</a>
            <a href="<?= ADMIN_URL ?>/pages/">עמודים</a>
            <a href="<?= ADMIN_URL ?>/posts/">פוסטים</a>
            <span class="user-name"><?= e(Auth::user()['display_name'] ?? Auth::user()['username']) ?></span>
            <a href="<?= SITE_URL ?>/logout.php">התנתק</a>
        </nav>
    </div>
</header>
<main class="admin-main">
