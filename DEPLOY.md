# פריסה בשרת חיצוני (Deploy)

מדריך קצר להעלאת הבלוג לשרת חיצוני ולחיבור למסד נתונים.

---

## 1. העלאת הקבצים לשרת

- העלה את **כל** תיקיית `gaming-blog` לשרת (FTP, SFTP, או Git).
- מיקום לדוגמה: `/home/username/public_html/gaming-blog` או `/var/www/html/gaming-blog`.

---

## 2. הגדרת Document Root (שורש האתר)

יש שתי אפשרויות:

### אפשרות א׳ – שורש האתר = תיקיית הפרויקט (מומלץ)

הגדר ב-cPanel / Plesk / Nginx ש־**Document Root** מצביע על תיקיית הפרויקט, למשל:

`/home/username/public_html/gaming-blog`

אז:
- האתר: `https://yourdomain.com/public/`
- פאנל ניהול: `https://yourdomain.com/admin/`
- הרשמה/התחברות: `https://yourdomain.com/public/login.php` וכו׳

קובץ `index.php` בשורש מפנה אוטומטית מ־`https://yourdomain.com/` ל־`/public/`.

### אפשרות ב׳ – שורש האתר = תיקיית public

אם אתה יכול להגדיר שורש רק ל־`gaming-blog/public`:
- האתר יהיה בכתובת: `https://yourdomain.com/` (בלי `/public`).
- במקרה כזה צריך לעדכן ב־`config.php`:
  - `BASE_URL` = `https://yourdomain.com`
  - `SITE_URL` = `BASE_URL` (או `BASE_URL . ''`)
  - `ADMIN_URL` = `BASE_URL . '/admin'`
- ולוודא שתיקיות `admin` ו־`assets` נגישות (למשל העתקה ל־`public/admin` ו־`public/assets` או קישור סימבולי). אם לא מעתיקים – השאר את שורש האתר על תיקיית הפרויקט (אפשרות א׳).

---

## 3. מסד נתונים ב־MySQL

1. צור מסד נתונים ב־cPanel / phpMyAdmin / שרת (למשל: `gaming_blog`).
2. צור משתמש MySQL עם הרשאות למסד הזה.
3. ייבא את הקובץ `database/schema.sql`:
   - ב־phpMyAdmin: בחר את המסד → Import → בחר `schema.sql` → Execute.
   - או בטרמינל:  
     `mysql -u user -p gaming_blog < database/schema.sql`

אחרי הייבוא יהיה משתמש מנהל: **admin** / **password** – חשוב להחליף סיסמה אחרי התחברות ראשונה.

---

## 4. קובץ ההגדרות config.php

1. **אם אין עדיין `config.php` בשרת:**  
   העתק את `config.example.php` לשם `config.php`:
   ```bash
   cp config.example.php config.php
   ```

2. ערוך את `config.php` והתאם:

```php
// מסד נתונים – הפרטים שקיבלת מספק האחסון
define('DB_HOST', 'localhost');        // לרוב localhost
define('DB_NAME', 'gaming_blog');      // שם המסד שיצרת
define('DB_USER', 'username');         // משתמש MySQL
define('DB_PASS', 'your_password');    // סיסמת MySQL

// כתובת האתר – בדיוק כמו שנפתח בדפדפן, עם https אם יש SSL
define('BASE_URL', 'https://yourdomain.com');
```

3. **בפרודקשן** – כבה הצגת שגיאות:
```php
ini_set('display_errors', 0);
```

---

## 5. הרשאות תיקיות

- תיקיית `uploads/` – השרת צריך הרשאה לכתוב (למשל `chmod 755` או `775` אם נדרש).
- אם יש שגיאות כתיבה – ספק האחסון יסביר אילו הרשאות לשים (למשל 755/775).

---

## 6. בדיקה אחרי הפריסה

1. גלוש ל־`https://yourdomain.com/public/` (או ל־`https://yourdomain.com/` אם שורש = public).
2. היכנס לפאנל: `https://yourdomain.com/admin/` עם **admin** / **password**.
3. החלף סיסמה למשתמש admin (אם תוסיף בהמשך אפשרות "שינוי סיסמה").
4. צור עמוד או פוסט ובדוק שהכל עובד.

---

## 7. אבטחה בפרודקשן

- החלף את סיסמת **admin** מיד.
- השאר `display_errors = 0` ב־`config.php`.
- השתמש ב־**HTTPS** (כתובת עם `https://` ו־`BASE_URL` מתאים).
- קובץ `.htaccess` שבשורש הפרויקט מונע גישה ל־`config.php` (בשרת Apache עם mod_rewrite).

---

## בעיות נפוצות

| בעיה | מה לבדוק |
|------|-----------|
| "Database connection" / PDO | `DB_HOST`, `DB_USER`, `DB_PASS`, `DB_NAME` ב־config; וודא שהמסד קיים והמשתמש עם הרשאות |
| 404 בעמודים/פוסטים | וודא ש־`BASE_URL` ו־`SITE_URL` תואמים לכתובת האמיתית (כולל https ו־/public אם רלוונטי) |
| CSS/JS לא נטענים | וודא ש־`BASE_URL` נכון וש־`assets` נגיש (למשל `https://yourdomain.com/assets/...`) |
| התחברות לא עובדת | וודא ש־cookies ו־sessions פעילים; בדוק שהדומיין ב־BASE_URL זהה לזה שנכנסים אליו |

אם תרצה, אפשר בהמשך להוסיף דוגמאות ל־Nginx או ל־Apache (VirtualHost) לפי סוג השרת שלך.
