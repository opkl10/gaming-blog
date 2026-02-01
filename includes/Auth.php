<?php
if (!defined('GAMING_BLOG')) exit;

class Auth {
    public static function init(): void {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
    }

    public static function login(string $username, string $password): bool {
        self::init();
        $db = Database::get();
        $stmt = $db->prepare('SELECT id, username, password_hash, display_name, role FROM users WHERE username = ? OR email = ?');
        $stmt->execute([$username, $username]);
        $user = $stmt->fetch();
        if ($user && password_verify($password, $user['password_hash'])) {
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['username'] = $user['username'];
            $_SESSION['display_name'] = $user['display_name'] ?? $user['username'];
            $_SESSION['role'] = $user['role'];
            return true;
        }
        return false;
    }

    public static function register(string $username, string $email, string $password): array {
        self::init();
        $errors = [];
        if (strlen($username) < 3) $errors[] = 'שם משתמש חייב להכיל לפחות 3 תווים';
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = 'כתובת אימייל לא תקינה';
        if (strlen($password) < 6) $errors[] = 'סיסמה חייבת להכיל לפחות 6 תווים';

        if (!empty($errors)) return ['success' => false, 'errors' => $errors];

        $db = Database::get();
        $stmt = $db->prepare('SELECT id FROM users WHERE username = ? OR email = ?');
        $stmt->execute([$username, $email]);
        if ($stmt->fetch()) {
            $errors[] = 'שם משתמש או אימייל כבר בשימוש';
            return ['success' => false, 'errors' => $errors];
        }

        $hash = password_hash($password, PASSWORD_DEFAULT);
        $stmt = $db->prepare('INSERT INTO users (username, email, password_hash, role) VALUES (?, ?, ?, ?)');
        $stmt->execute([$username, $email, $hash, 'author']);
        return ['success' => true];
    }

    public static function logout(): void {
        self::init();
        $_SESSION = [];
        session_destroy();
    }

    public static function isLoggedIn(): bool {
        self::init();
        return !empty($_SESSION['user_id']);
    }

    public static function user(): ?array {
        self::init();
        if (!self::isLoggedIn()) return null;
        return [
            'id' => $_SESSION['user_id'],
            'username' => $_SESSION['username'],
            'display_name' => $_SESSION['display_name'],
            'role' => $_SESSION['role'],
        ];
    }

    public static function requireLogin(): void {
        if (!self::isLoggedIn()) {
            header('Location: ' . ADMIN_URL . '/login.php?redirect=' . urlencode($_SERVER['REQUEST_URI']));
            exit;
        }
    }

    public static function requireAdmin(): void {
        self::requireLogin();
        if (($_SESSION['role'] ?? '') !== 'admin' && ($_SESSION['role'] ?? '') !== 'editor') {
            header('Location: ' . ADMIN_URL . '/index.php');
            exit;
        }
    }
}
