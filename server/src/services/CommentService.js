import { dbContext } from "../db/DbContext"

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

}


export const commentService = new CommentService()