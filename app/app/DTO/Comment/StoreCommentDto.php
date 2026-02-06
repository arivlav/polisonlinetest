<?php

namespace App\DTO\Comment;


readonly class StoreCommentDto
{
    public function __construct(
        public string $author_name,
        public string $content,
    ) {}

    public static function fromArray(array $data): self
    {
        return new self(
            author_name: $data['author_name'],
            content: $data['content'],
        );
    }

    public function toArray(): array
    {
        return [
            'author_name' => $this->author_name,
            'description' => $this->content
        ];
    }

}
