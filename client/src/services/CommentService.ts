import { AppState } from "../AppState";
import { Comment } from "../models/Comment";
import { logger } from "../utils/Logger";
import { api } from "./AxiosService";

class CommentService {
  async createComment(commentData: { body: string; reviewId: string | undefined; }) {
    const response = await api.post("/api/comments", commentData);
    logger.log("Comment created", response.data);
    const comment = new Comment(response.data);
    AppState.comments?.push(comment);
  }
  
}

export const commentService = new CommentService();