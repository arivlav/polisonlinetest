<?php

namespace App\DTO\Article;


readonly class StoreArticleDto
{
    public function __construct(
        public string $title,
        public string $content,
    ) {}

    public static function fromArray(array $data): self
    {
        return new self(
            title: $data['title'],
            content: $data['content'],
        );
    }

    public function toArray(): array
    {
        return [
            'title' => $this->title,
            'description' => $this->content
        ];
    }

}
