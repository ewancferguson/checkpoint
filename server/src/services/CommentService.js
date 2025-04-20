import { dbContext } from '../db/DbContext.js'

class CommentService {

  async createComment(commentData) {
    const comment = await dbContext.Comment.create(commentData)
    await comment.populate('creator')
    return comment
  }


  async deleteComment(commentId, userId) {
    const commentToDelete = await dbContext.Comments.findById(commentId)

    if (commentToDelete == null) {
      throw new Error("Invalid Id");
    }
    if (commentToDelete.creatorId != userId) {
      throw new Forbidden('Not your comment')
    }
    await commentToDelete.deleteOne()
    return 'comment gone'
  }

  async getCommentsByEvent(reviewId) {
    const comments = await dbContext.Comments.find({ reviewId: reviewId }).populate('creator')
    return comments
  }

}


export const commentService = new CommentService()