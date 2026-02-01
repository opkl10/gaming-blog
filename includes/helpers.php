<?php
if (!defined('GAMING_BLOG')) exit;

function e(string $s): string {
    return htmlspecialchars($s, ENT_QUOTES, 'UTF-8');
}

function slugify(string $s): string {
    $s = preg_replace('/\s+/', '-', trim($s));
    $s = preg_replace('/[^\p{L}\p{N}-]/u', '', $s);
    return mb_strtolower($s);
}

function csrf_field(): string {
    Auth::init();
    if (empty($_SESSION[CSRF_TOKEN_NAME])) {
        $_SESSION[CSRF_TOKEN_NAME] = bin2hex(random_bytes(32));
    }
    return '<input type="hidden" name="csrf_token" value="' . e($_SESSION[CSRF_TOKEN_NAME]) . '">';
}

function csrf_verify(): bool {
    Auth::init();
    $token = $_POST['csrf_token'] ?? '';
    return !empty($_SESSION[CSRF_TOKEN_NAME]) && hash_equals($_SESSION[CSRF_TOKEN_NAME], $token);
}

function redirect(string $url, int $code = 302): void {
    header('Location: ' . $url, true, $code);
    exit;
}

function format_date(?string $date): string {
    if (!$date) return '';
    return date('d/m/Y H:i', strtotime($date));
}

function truncate(string $text, int $len = 150): string {
    $text = strip_tags($text);
    if (mb_strlen($text) <= $len) return $text;
    return mb_substr($text, 0, $len) . '...';
}
