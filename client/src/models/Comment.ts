import { Profile } from "./Account";

export class Comment {
  id: string;
  body: string;
  createdAt: string;
  reviewId: string;
  creator: Profile
  constructor(data: Comment) {
    this.id = data.id;
    this.body = data.body;
    this.createdAt = data.createdAt;
    this.reviewId = data.reviewId;
    this.creator = data.creator;
  }
}