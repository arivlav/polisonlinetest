import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\CommentController::store
* @see app/Http/Controllers/Api/CommentController.php:22
* @route '/api/articles/{id}/comments'
*/
export const store = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/articles/{id}/comments',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\CommentController::store
* @see app/Http/Controllers/Api/CommentController.php:22
* @route '/api/articles/{id}/comments'
*/
store.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    if (Array.isArray(args)) {
        args = {
            id: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        id: args.id,
    }

    return store.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\CommentController::store
* @see app/Http/Controllers/Api/CommentController.php:22
* @route '/api/articles/{id}/comments'
*/
store.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\CommentController::store
* @see app/Http/Controllers/Api/CommentController.php:22
* @route '/api/articles/{id}/comments'
*/
const storeForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\CommentController::store
* @see app/Http/Controllers/Api/CommentController.php:22
* @route '/api/articles/{id}/comments'
*/
storeForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(args, options),
    method: 'post',
})

store.form = storeForm

const CommentController = { store }

export default CommentController