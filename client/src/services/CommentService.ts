import { AppState } from "../AppState";
import { Comment } from "../models/Comment";
import { logger } from "../utils/Logger";
import { api } from "./AxiosService";

class CommentService {
  async deleteComment(commentId: string) {
    const response = await api.delete(`/api/comments/${commentId}`);
    logger.log(response)
    const commentIndex = AppState.comments?.findIndex(comment => comment.id === commentId);
    AppState.comments?.splice(commentIndex!, 1);
  }
  async getCommentsByReview(reviewId: string) {
    const response = await api.get(`/api/reviews/${reviewId}/comments`);
    logger.log("Comments by review", response.data);
    const comments = response.data.map((commentPOJO: Comment) => new Comment(commentPOJO));
    AppState.comments = comments;
  }
  async createComment(commentData: { body: string; reviewId: string | undefined; }) {
    const response = await api.post("/api/comments", commentData);
    logger.log("Comment created", response.data);
    const comment = new Comment(response.data);
    AppState.comments?.push(comment);
  }
  
}

export const commentService = new CommentService();