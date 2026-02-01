<?php
define('GAMING_BLOG', true);
require_once dirname(__DIR__) . '/config.php';
require_once dirname(__DIR__) . '/includes/Database.php';
require_once dirname(__DIR__) . '/includes/Auth.php';
require_once dirname(__DIR__) . '/includes/helpers.php';
require_once dirname(__DIR__) . '/includes/Page.php';
require_once dirname(__DIR__) . '/includes/Post.php';

Auth::requireLogin();
