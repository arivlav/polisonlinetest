<?php

namespace App\Http\Requests\Article;

use App\DTO\Article\GetArticleListDto;
use App\DTO\Article\StoreArticleDto;
use Illuminate\Foundation\Http\FormRequest;

class ArticleStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    public function validationData(): array
    {
        return $this->all();
    }


    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => [
                'required',
                'string',
                'max:255',
            ],
            'content' => [
                'required',
                'string',
            ],
        ];
    }

    public function toDto(): StoreArticleDto
    {
        return StoreArticleDto::fromArray($this->validationData());
    }

    public function messages(): array
    {
        return [
            'title.max' => 'Title has more than 255 characters.'
        ];
    }
}
