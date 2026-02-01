<?php
require_once __DIR__ . '/bootstrap.php';

if (Auth::isLoggedIn()) {
    redirect(ADMIN_URL . '/index.php');
}

$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!csrf_verify()) {
        $error = 'בקשה לא תקינה. נסה שוב.';
    } else {
        $username = trim($_POST['username'] ?? '');
        $password = $_POST['password'] ?? '';
        if ($username && $password && Auth::login($username, $password)) {
            $redirect = $_GET['redirect'] ?? ADMIN_URL . '/index.php';
            redirect($redirect);
        }
        $error = 'שם משתמש או סיסמה שגויים.';
    }
}

$pageTitle = 'התחברות';
require __DIR__ . '/layouts/header.php';
?>
<section class="auth-form">
    <div class="container narrow">
        <h1>התחברות</h1>
        <?php if ($error): ?>
            <div class="alert alert-error"><?= e($error) ?></div>
        <?php endif; ?>
        <form method="post" action="">
            <?= csrf_field() ?>
            <div class="form-group">
                <label for="username">שם משתמש או אימייל</label>
                <input type="text" id="username" name="username" required value="<?= e($_POST['username'] ?? '') ?>">
            </div>
            <div class="form-group">
                <label for="password">סיסמה</label>
                <input type="password" id="password" name="password" required>
            </div>
            <button type="submit" class="btn btn-primary">התחבר</button>
        </form>
        <p class="auth-link"><a href="<?= SITE_URL ?>/register.php">אין לך חשבון? הירשם</a></p>
    </div>
</section>
<?php require __DIR__ . '/layouts/footer.php'; ?>
