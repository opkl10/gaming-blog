<?php
if (!defined('GAMING_BLOG')) exit;

class Page {
    public static function getBySlug(string $slug): ?array {
        $db = Database::get();
        $stmt = $db->prepare('SELECT * FROM pages WHERE slug = ? AND is_published = 1');
        $stmt->execute([$slug]);
        $row = $stmt->fetch();
        return $row ?: null;
    }

    public static function getAll(bool $publishedOnly = false): array {
        $db = Database::get();
        $sql = 'SELECT p.*, u.display_name as author_name FROM pages p LEFT JOIN users u ON p.created_by = u.id';
        if ($publishedOnly) $sql .= ' WHERE p.is_published = 1';
        $sql .= ' ORDER BY p.updated_at DESC';
        return $db->query($sql)->fetchAll();
    }

    public static function getById(int $id): ?array {
        $db = Database::get();
        $stmt = $db->prepare('SELECT * FROM pages WHERE id = ?');
        $stmt->execute([$id]);
        $row = $stmt->fetch();
        return $row ?: null;
    }

    public static function create(array $data): int {
        $db = Database::get();
        $stmt = $db->prepare('INSERT INTO pages (title, slug, content, meta_description, is_published, created_by) VALUES (?, ?, ?, ?, ?, ?)');
        $stmt->execute([
            $data['title'],
            $data['slug'],
            $data['content'] ?? '',
            $data['meta_description'] ?? '',
            $data['is_published'] ?? 1,
            $data['created_by'] ?? null,
        ]);
        return (int) $db->lastInsertId();
    }

    public static function update(int $id, array $data): bool {
        $db = Database::get();
        $stmt = $db->prepare('UPDATE pages SET title = ?, slug = ?, content = ?, meta_description = ?, is_published = ? WHERE id = ?');
        return $stmt->execute([
            $data['title'],
            $data['slug'],
            $data['content'] ?? '',
            $data['meta_description'] ?? '',
            $data['is_published'] ?? 1,
            $id,
        ]);
    }

    public static function delete(int $id): bool {
        $db = Database::get();
        $stmt = $db->prepare('DELETE FROM pages WHERE id = ?');
        return $stmt->execute([$id]);
    }
}
