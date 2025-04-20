
import { observer } from "mobx-react";
import { Comment } from "../models/Comment";

function CommentCard({comment} : {comment: Comment}) {





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
          <div>
            <h6 className="mb-0">{comment.creator.name}</h6>
            <p className="mb-0 small text-muted">
              Commented on {new Date(comment.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        <p className="card-text">{comment.body}</p>
      </div>
    </div>
  );
}

export default observer(CommentCard);