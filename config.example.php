<?php
/**
 * Gaming Blog - דוגמת הגדרות
 * העתק לקובץ config.php ועדכן לפי השרת והמסד נתונים שלך
 */

if (!defined('GAMING_BLOG')) {
    define('GAMING_BLOG', true);
}

// ========== מסד נתונים (חובה לעדכן) ==========
define('DB_HOST', 'localhost');        // כתובת שרת MySQL (לעתים: localhost או כתובת IP)
define('DB_NAME', 'gaming_blog');      // שם מסד הנתונים
define('DB_USER', 'your_db_user');     // משתמש MySQL
define('DB_PASS', 'your_db_password'); // סיסמת MySQL
define('DB_CHARSET', 'utf8mb4');

// ========== כתובת האתר (חובה לעדכן בשרת חיצוני) ==========
// כתובת מלאה בלי סלאש בסוף, עם https אם יש SSL
define('BASE_URL', 'https://yourdomain.com');
define('SITE_NAME', 'בלוג משחקי מחשב');
define('SITE_URL', BASE_URL . '/public');
define('ADMIN_URL', BASE_URL . '/admin');

define('ROOT_PATH', __DIR__);
define('UPLOAD_PATH', ROOT_PATH . '/uploads');
define('UPLOAD_URL', BASE_URL . '/uploads');

define('SESSION_LIFETIME', 86400);
define('CSRF_TOKEN_NAME', 'csrf_token');
date_default_timezone_set('Asia/Jerusalem');

// בפרודקשן – כבה הצגת שגיאות
error_reporting(E_ALL);
ini_set('display_errors', 0);
