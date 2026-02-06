import ArticleController from './ArticleController'
import CommentController from './CommentController'

const Api = {
    ArticleController: Object.assign(ArticleController, ArticleController),
    CommentController: Object.assign(CommentController, CommentController),
}

export default Api