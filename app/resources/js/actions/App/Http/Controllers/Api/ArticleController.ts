import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\ArticleController::index
* @see app/Http/Controllers/Api/ArticleController.php:25
* @route '/api/articles'
*/
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/articles',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\ArticleController::index
* @see app/Http/Controllers/Api/ArticleController.php:25
* @route '/api/articles'
*/
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\ArticleController::index
* @see app/Http/Controllers/Api/ArticleController.php:25
* @route '/api/articles'
*/
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\ArticleController::index
* @see app/Http/Controllers/Api/ArticleController.php:25
* @route '/api/articles'
*/
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\ArticleController::index
* @see app/Http/Controllers/Api/ArticleController.php:25
* @route '/api/articles'
*/
const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\ArticleController::index
* @see app/Http/Controllers/Api/ArticleController.php:25
* @route '/api/articles'
*/
indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\ArticleController::index
* @see app/Http/Controllers/Api/ArticleController.php:25
* @route '/api/articles'
*/
indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index.form = indexForm

/**
* @see \App\Http\Controllers\Api\ArticleController::store
* @see app/Http/Controllers/Api/ArticleController.php:37
* @route '/api/articles'
*/
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/api/articles',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\ArticleController::store
* @see app/Http/Controllers/Api/ArticleController.php:37
* @route '/api/articles'
*/
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\ArticleController::store
* @see app/Http/Controllers/Api/ArticleController.php:37
* @route '/api/articles'
*/
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\ArticleController::store
* @see app/Http/Controllers/Api/ArticleController.php:37
* @route '/api/articles'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Api\ArticleController::store
* @see app/Http/Controllers/Api/ArticleController.php:37
* @route '/api/articles'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm

/**
* @see \App\Http\Controllers\Api\ArticleController::show
* @see app/Http/Controllers/Api/ArticleController.php:31
* @route '/api/articles/{article}'
*/
export const show = (args: { article: string | number } | [article: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/articles/{article}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\ArticleController::show
* @see app/Http/Controllers/Api/ArticleController.php:31
* @route '/api/articles/{article}'
*/
show.url = (args: { article: string | number } | [article: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { article: args }
    }

    if (Array.isArray(args)) {
        args = {
            article: args[0],
        }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
        article: args.article,
    }

    return show.definition.url
            .replace('{article}', parsedArgs.article.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\ArticleController::show
* @see app/Http/Controllers/Api/ArticleController.php:31
* @route '/api/articles/{article}'
*/
show.get = (args: { article: string | number } | [article: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\ArticleController::show
* @see app/Http/Controllers/Api/ArticleController.php:31
* @route '/api/articles/{article}'
*/
show.head = (args: { article: string | number } | [article: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Api\ArticleController::show
* @see app/Http/Controllers/Api/ArticleController.php:31
* @route '/api/articles/{article}'
*/
const showForm = (args: { article: string | number } | [article: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\ArticleController::show
* @see app/Http/Controllers/Api/ArticleController.php:31
* @route '/api/articles/{article}'
*/
showForm.get = (args: { article: string | number } | [article: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Api\ArticleController::show
* @see app/Http/Controllers/Api/ArticleController.php:31
* @route '/api/articles/{article}'
*/
showForm.head = (args: { article: string | number } | [article: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: show.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

show.form = showForm

const ArticleController = { index, store, show }

export default ArticleController