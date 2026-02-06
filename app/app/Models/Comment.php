<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    /** @use HasFactory<\Database\Factories\CommentFactory> */
    use HasFactory;

    public const ?string UPDATED_AT = null;
    protected $fillable = [
        'article_id',
        'author_name',
        'content',
    ];

    public function article()
    {
        return $this->belongsTo(Article::class);
    }
}

