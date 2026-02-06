<?php

namespace App\Http\Requests\Comment;

use App\DTO\Comment\StoreCommentDto;
use Illuminate\Foundation\Http\FormRequest;

class CommentStoreRequest extends FormRequest
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
            'author_name' => [
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

    public function toDto(): StoreCommentDto
    {
        return StoreCommentDto::fromArray($this->validationData());
    }

    public function messages(): array
    {
        return [
            'title.max' => 'Title has more than 255 characters.'
        ];
    }
}
