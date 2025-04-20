import { useParams } from "react-router-dom";
import { accountService } from "../services/AccountService";
import Pop from "../utils/Pop";
import { useEffect } from "react";
import { AppState } from "../AppState";
import { reviewsService } from "../services/ReviewsService";
import ReviewCard from "../components/ReviewCard";
import { observer } from "mobx-react";

function ProfilePage() {
  const { profileId } = useParams<{ profileId: string }>();
  const account = AppState.activeProfile;

  useEffect(() => {
    if (profileId) {
      getProfileById(profileId);
      getReviewsByUserID(profileId);
    }
  }, [profileId]);

  async function getProfileById(profileId: string) {
    try {
      await accountService.getProfileById(profileId);
    } catch (error: any) {
      Pop.error(error);
    }
  }

  async function getReviewsByUserID(profileId: string) {
    try {
      await reviewsService.getReviewsByUserID(profileId);
    } catch (error: any) {
      Pop.error(error);
    }
  }

  const reviewcards = AppState.profileReviews?.slice().reverse().map(review => (
    <ReviewCard key={review.id} review={review} />
  ));

  if (!account) {
    return (
      <div className="bg-dark text-white min-vh-100 d-flex justify-content-center align-items-center">
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="bg-dark text-white min-vh-100 py-4">
      <div className="container-fluid">
        {/* Top Section */}
        <div className="row">
          <div className="col-12 mb-4">
            <div className="d-flex align-items-center p-4 bg-dark border border-light rounded shadow profile-glow">
              <img
                src={account.picture || 'https://via.placeholder.com/150'}
                alt="User Avatar"
                className="rounded-circle me-4 border border-3 border-light"
                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
              />
              <div>
                <h3 className="mb-1 fw-bold">{account.name || 'Anonymous'}</h3>
                <p className="mb-0 text-light small text-opacity-75">
                  Member since {account.createdAt?.toLocaleDateString() || 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="row">
          <div className="col-12">
            <div className="bg-dark border border-light text-white rounded shadow-sm p-4 profile-glow">
              <h4 className="mb-3 fw-semibold">Their Reviews</h4>
              <div className="row">
                {reviewcards?.length ? reviewcards : <p className="text-center text-light text-opacity-75">No reviews found.</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default observer(ProfilePage);
