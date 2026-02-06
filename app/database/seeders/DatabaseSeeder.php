<?php

namespace Database\Seeders;

use App\Models\Article;
use App\Models\Comment;
use Illuminate\Database\Seeder;
use Database\Seeders\ArticleSeeder;
use Database\Seeders\CommentSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $articles = Article::factory(5)->create();
        Comment::factory()
            ->count(20)
            ->recycle([$articles])
            ->create();
    }
}
