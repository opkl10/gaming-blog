<?php
require_once __DIR__ . '/bootstrap.php';

if (Auth::isLoggedIn()) {
    redirect(ADMIN_URL . '/index.php');
}

$errors = [];
$success = false;
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!csrf_verify()) {
        $errors[] = 'בקשה לא תקינה. נסה שוב.';
    } else {
        $username = trim($_POST['username'] ?? '');
        $email = trim($_POST['email'] ?? '');
        $password = $_POST['password'] ?? '';
        $password2 = $_POST['password2'] ?? '';
        if ($password !== $password2) {
            $errors[] = 'הסיסמאות לא תואמות.';
        } else {
            $result = Auth::register($username, $email, $password);
            if ($result['success']) {
                $success = true;
            } else {
                $errors = $result['errors'];
            }
        }
    }
}

$pageTitle = 'הרשמה';
require __DIR__ . '/layouts/header.php';
?>
<section class="auth-form">
    <div class="container narrow">
        <h1>הרשמה</h1>
        <?php if ($success): ?>
            <div class="alert alert-success">נרשמת בהצלחה. <a href="<?= SITE_URL ?>/login.php">התחבר עכשיו</a></div>
        <?php else: ?>
            <?php foreach ($errors as $err): ?>
                <div class="alert alert-error"><?= e($err) ?></div>
            <?php endforeach; ?>
            <form method="post" action="">
                <?= csrf_field() ?>
                <div class="form-group">
                    <label for="username">שם משתמש</label>
                    <input type="text" id="username" name="username" required value="<?= e($_POST['username'] ?? '') ?>">
                </div>
                <div class="form-group">
                    <label for="email">אימייל</label>
                    <input type="email" id="email" name="email" required value="<?= e($_POST['email'] ?? '') ?>">
                </div>
                <div class="form-group">
                    <label for="password">סיסמה (לפחות 6 תווים)</label>
                    <input type="password" id="password" name="password" required>
                </div>
                <div class="form-group">
                    <label for="password2">אימות סיסמה</label>
                    <input type="password" id="password2" name="password2" required>
                </div>
                <button type="submit" class="btn btn-primary">הירשם</button>
            </form>
            <p class="auth-link"><a href="<?= SITE_URL ?>/login.php">כבר יש לך חשבון? התחבר</a></p>
        <?php endif; ?>
    </div>
</section>
<?php require __DIR__ . '/layouts/footer.php'; ?>
