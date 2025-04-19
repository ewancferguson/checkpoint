import { useParams } from "react-router-dom";
import { accountService } from "../services/AccountService";
import Pop from "../utils/Pop";
import { useEffect } from "react";
import { AppState } from "../AppState";
import { reviewsService } from "../services/ReviewsService";
import ReviewCard from "../components/ReviewCard";

function ProfilePage(){
  const { profileId } = useParams<{ profileId: string }>();

  const account = AppState.activeProfile

  useEffect(() => {
    if (profileId) {
      getProfileById(profileId);
      getReviewsByUserID();
    }
  }, [profileId]);

  async function getProfileById(profileId: string) {
    try {
      await accountService.getProfileById(profileId);
    }
    catch (error: any){
      Pop.error(error);
    }
  }

  async function getReviewsByUserID(){
    try {
      await reviewsService.getReviewsByUserID(account?.id);
    }
    catch (error: any){
      Pop.error(error);
    }
  }

  const reviewcards = AppState.profileReviews?.slice().reverse().map(review => (<ReviewCard key={review.id} review={review} />));

  return ( 
  <div className="bg-dark text-white min-vh-100 py-4">
  <div className="container-fluid">
    {/* Top Section */}
    <div className="row">
      <div className="col-12 mb-4">
        <div className="d-flex align-items-center p-4 bg-secondary shadow rounded">
          <img
            src={account?.picture || 'https://via.placeholder.com/150'}
            alt="User Avatar"
            className="rounded-circle me-4 border border-3 border-light"
            style={{ width: '100px', height: '100px', objectFit: 'cover' }}
          />
          <div>
            <h3 className="mb-1">{account?.name || 'Anonymous'}</h3>
            <p className="mb-0 text-light small">
              Member since {account?.createdAt?.toLocaleDateString() || 'N/A'}
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* Details Section */}
    <div className="row">
      <div className="col-12">
        <div className="card bg-secondary text-white shadow rounded p-4">
          <h4 className="mb-3">Their Reviews</h4>
          <div className="row">
            {reviewcards?.length ? reviewcards : <p className='text-center'>No reviews found.</p>}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  );
}

export default ProfilePage;