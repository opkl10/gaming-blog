<?php
if (!defined('GAMING_BLOG')) exit;

class Post {
    public static function getBySlug(string $slug): ?array {
        $db = Database::get();
        $stmt = $db->prepare('SELECT p.*, u.display_name as author_name FROM posts p LEFT JOIN users u ON p.author_id = u.id WHERE p.slug = ? AND p.is_published = 1');
        $stmt->execute([$slug]);
        $row = $stmt->fetch();
        return $row ?: null;
    }

    public static function getById(int $id): ?array {
        $db = Database::get();
        $stmt = $db->prepare('SELECT p.*, u.display_name as author_name FROM posts p LEFT JOIN users u ON p.author_id = u.id WHERE p.id = ?');
        $stmt->execute([$id]);
        $row = $stmt->fetch();
        return $row ?: null;
    }

    public static function getList(int $limit = 10, int $offset = 0): array {
        $db = Database::get();
        $stmt = $db->prepare('SELECT p.*, u.display_name as author_name FROM posts p LEFT JOIN users u ON p.author_id = u.id WHERE p.is_published = 1 ORDER BY p.published_at DESC LIMIT ? OFFSET ?');
        $stmt->execute([$limit, $offset]);
        return $stmt->fetchAll();
    }

    public static function getAll(bool $publishedOnly = false): array {
        $db = Database::get();
        $sql = 'SELECT p.*, u.display_name as author_name FROM posts p LEFT JOIN users u ON p.author_id = u.id';
        if ($publishedOnly) $sql .= ' WHERE p.is_published = 1';
        $sql .= ' ORDER BY p.published_at DESC, p.created_at DESC';
        return $db->query($sql)->fetchAll();
    }

    public static function count(bool $publishedOnly = false): int {
        $db = Database::get();
        $sql = 'SELECT COUNT(*) FROM posts';
        if ($publishedOnly) $sql .= ' WHERE is_published = 1';
        return (int) $db->query($sql)->fetchColumn();
    }

    public static function create(array $data): int {
        $db = Database::get();
        $publishedAt = (!empty($data['is_published'])) ? date('Y-m-d H:i:s') : null;
        $stmt = $db->prepare('INSERT INTO posts (title, slug, excerpt, content, featured_image, meta_description, is_published, author_id, published_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)');
        $stmt->execute([
            $data['title'],
            $data['slug'],
            $data['excerpt'] ?? '',
            $data['content'] ?? '',
            $data['featured_image'] ?? null,
            $data['meta_description'] ?? '',
            $data['is_published'] ?? 0,
            $data['author_id'] ?? null,
            $publishedAt,
        ]);
        return (int) $db->lastInsertId();
    }

    public static function update(int $id, array $data): bool {
        $db = Database::get();
        $existing = self::getById($id);
        $publishedAt = $existing['published_at'] ?? null;
        if (!empty($data['is_published']) && !$publishedAt) {
            $publishedAt = date('Y-m-d H:i:s');
        } elseif (empty($data['is_published'])) {
            $publishedAt = null;
        }
        $stmt = $db->prepare('UPDATE posts SET title = ?, slug = ?, excerpt = ?, content = ?, featured_image = ?, meta_description = ?, is_published = ?, published_at = ? WHERE id = ?');
        return $stmt->execute([
            $data['title'],
            $data['slug'],
            $data['excerpt'] ?? '',
            $data['content'] ?? '',
            $data['featured_image'] ?? null,
            $data['meta_description'] ?? '',
            $data['is_published'] ?? 0,
            $publishedAt,
            $id,
        ]);
    }

    public static function delete(int $id): bool {
        $db = Database::get();
        $stmt = $db->prepare('DELETE FROM posts WHERE id = ?');
        return $stmt->execute([$id]);
    }
}
