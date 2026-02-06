<?php

namespace App\Http\Requests\Article;

use App\DTO\Article\GetArticleListDto;
use Illuminate\Foundation\Http\FormRequest;

class ArticleListRequest extends FormRequest
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
        return $this->query();
    }


    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'perPage' => [
                'nullable',
                'integer',
                'gt:0',
                'max:100',
            ],
            'page' => [
                'nullable',
                'integer',
                'gt:0',
            ],
        ];
    }

    public function toDto(): GetArticleListDto
    {
        return GetArticleListDto::fromArray($this->validationData());
    }

    public function messages(): array
    {
        return [
            'perPage.integer' => 'Per is not valid.',
            'perPage.gt' => 'Per is not valid.',
            'perPage.max' => 'Per is not valid.',
            'page.integer' => 'Page is not valid.',
            'page.gt' => 'Per is not valid.',
        ];
    }
}
