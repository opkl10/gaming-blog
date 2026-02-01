<?php
require_once dirname(__DIR__, 2) . '/admin/bootstrap.php';

Auth::requireAdmin();

$id = (int)($_GET['id'] ?? 0);
if ($id) {
    Page::delete($id);
}
redirect(ADMIN_URL . '/pages/');
