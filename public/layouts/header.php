<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= isset($pageTitle) ? e($pageTitle) . ' | ' : '' ?><?= e(SITE_NAME) ?></title>
    <meta name="description" content="<?= isset($metaDescription) ? e($metaDescription) : e(SITE_NAME) ?>">
    <link rel="stylesheet" href="<?= BASE_URL ?>/assets/css/style.css">
</head>
<body>
<header class="site-header">
    <div class="container">
        <a href="<?= SITE_URL ?>/index.php" class="logo"><?= e(SITE_NAME) ?></a>
        <nav class="main-nav">
            <a href="<?= SITE_URL ?>/index.php">ראשי</a>
            <a href="<?= SITE_URL ?>/posts.php">פוסטים</a>
            <?php if (Auth::isLoggedIn()): ?>
                <a href="<?= ADMIN_URL ?>/index.php">פאנל ניהול</a>
                <a href="<?= SITE_URL ?>/logout.php">התנתק</a>
            <?php else: ?>
                <a href="<?= SITE_URL ?>/login.php">התחברות</a>
                <a href="<?= SITE_URL ?>/register.php">הרשמה</a>
            <?php endif; ?>
        </nav>
    </div>
</header>
<main class="main-content">
