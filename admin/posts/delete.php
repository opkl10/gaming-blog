<?php
require_once dirname(__DIR__, 2) . '/admin/bootstrap.php';

$id = (int)($_GET['id'] ?? 0);
if ($id) {
    Post::delete($id);
}
redirect(ADMIN_URL . '/posts/');
