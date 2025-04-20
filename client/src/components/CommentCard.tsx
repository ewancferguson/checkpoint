import { observer } from "mobx-react";
import { Comment } from "../models/Comment";
import { AppState } from "../AppState";
import { commentService } from "../services/CommentService";
import Pop from "../utils/Pop";

function CommentCard({ comment }: { comment: Comment }) {
  const isCreator = AppState.account?.id === comment.creator.id;

  async function deleteComment() {
    try {
      const yes = await Pop.confirm("Delete this comment?");
      if (!yes) return;

      await commentService.deleteComment(comment.id);
      Pop.success("Comment deleted!");
    } catch (error: any) {
      Pop.error(error);
    }
  }

  return (
    <div className="card bg-secondary text-light mb-3 shadow-sm border-light">
      <div className="card-body">
        <div className="d-flex align-items-center mb-3">
          <img
            src={comment.creator.picture || "https://via.placeholder.com/50"}
            alt={comment.creator.name}
            className="rounded-circle me-3"
            style={{ width: "50px", height: "50px", objectFit: "cover" }}
          />
          <div className="flex-grow-1">
            <h6 className="mb-0">{comment.creator.name}</h6>
            <p className="mb-0 small text-muted">
              Commented on {new Date(comment.createdAt).toLocaleDateString()}
            </p>
          </div>
          {isCreator && (
            <button onClick={deleteComment} className="btn btn-sm btn-outline-danger ms-auto">
              <i className="mdi mdi-delete"></i>
            </button>
          )}
        </div>
        <p className="card-text">{comment.body}</p>
      </div>
    </div>
  );
}

export default observer(CommentCard);
