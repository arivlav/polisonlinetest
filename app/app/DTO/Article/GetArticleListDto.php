<?php

namespace App\DTO\Article;


readonly class GetArticleListDto
{
    public function __construct(
        public ?int $perPage = null,
    )
    {
    }

    public static function fromArray(array $data): self
    {
        return new self(
            perPage: $data['perPage'] ?? config('common.default.pagination.perPage'),
        );
    }

    public function toArray(): array
    {
        return [
            'perPage' => $this->perPage,
        ];
    }

}
