<?php
/**
 * הפניה לעמוד הראשי של האתר
 * כשמגיעים לכתובת הבסיס (domain.com/) מפנים ל-public
 */
header('Location: /public/', true, 302);
exit;
