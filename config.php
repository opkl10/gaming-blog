<?php
/**
 * Gaming Blog - Configuration
 * עדכן את הפרטים לפי שרת ומסד הנתונים שלך
 */

// Prevent direct access
if (!defined('GAMING_BLOG')) {
    define('GAMING_BLOG', true);
}

// Database
define('DB_HOST', 'localhost');
define('DB_NAME', 'gaming_blog');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_CHARSET', 'utf8mb4');

// Site (עדכן BASE_URL לפי השרת שלך)
define('BASE_URL', 'http://localhost/gaming-blog');
define('SITE_NAME', 'בלוג משחקי מחשב');
define('SITE_URL', BASE_URL . '/public');
define('ADMIN_URL', BASE_URL . '/admin');

// Paths (תיקיית הפרויקט - איפה ש-config.php נמצא)
define('ROOT_PATH', __DIR__);
define('UPLOAD_PATH', ROOT_PATH . '/uploads');
define('UPLOAD_URL', BASE_URL . '/uploads'); // אם uploads בתוך public: SITE_URL . '/uploads'

// Session
define('SESSION_LIFETIME', 86400); // 24 hours

// Security
define('CSRF_TOKEN_NAME', 'csrf_token');

// Timezone
date_default_timezone_set('Asia/Jerusalem');

// Error reporting (disable in production)
error_reporting(E_ALL);
ini_set('display_errors', 1);
