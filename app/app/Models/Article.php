<?php

namespace App\Models;

use App\DTO\Article\GetArticleListDto;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

class Article extends Model
{
    /** @use HasFactory<\Database\Factories\ArticleFactory> */
    use HasFactory;

    public const ?string UPDATED_AT = null;
    protected $fillable = [
        'title',
        'content',
    ];

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public static function getArticleList(GetArticleListDto $dto): LengthAwarePaginator
    {
        return self::withCount('comments')
            ->orderBy('created_at', 'desc')
            ->paginate($dto->perPage);
    }
}

