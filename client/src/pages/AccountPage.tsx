import  { useEffect, useState } from 'react';
import { AppState } from '../AppState';
import Pop from '../utils/Pop';
import { reviewsService } from '../services/ReviewsService';
import ReviewCard from '../components/ReviewCard';
import { observer } from 'mobx-react';
import { accountService } from '../services/AccountService';
import { favoriteService } from '../services/FavoriteService';
import GameCard from '../components/Gamecard';

const AccountPage = () => {
  const [activeTab, setActiveTab] = useState('details');
  const [editableName, setEditableName] = useState('');
  const [editablePicture, setEditablePicture] = useState('');

  const account = AppState.account;

  useEffect(() => {
    if (account) {
      setEditableName(account.name);
      setEditablePicture(account.picture);
    }
  }, [account?.name]);

  useEffect(() => {
    getReviewsByUserId();
    getFavoritesByProfile()
  }, [account?.id]);

  async function updateAccount() {
    try {
      const accountData = {
        name: editableName,
        picture: editablePicture,
      };
      await accountService.updateAccount(accountData);
      Pop.success('Account Updated!');
    } catch (error: any) {
      Pop.error(error);
    }
  }

  async function getReviewsByUserId() {
    try {
      await reviewsService.getReviewsByUserID(account?.id);
    } catch (error: any) {
      Pop.error(error);
    }
  }

  async function getFavoritesByProfile(){
    try {
      const accountId = account?.id
      await favoriteService.getFavoritesByProfile(accountId)
    }
    catch (error: any){
      Pop.error(error);
    }
  }

  const gamecards = AppState.profileFavorites?.slice().reverse().map(fav => (
    fav.game && <GameCard key={fav.game.id} game={fav.game} />
  ));
  

  const reviewcards = AppState.profileReviews?.slice().reverse().map((review) => (
    <ReviewCard key={review.id} review={review} />
  ));

  return (
    <div className="bg-dark text-white min-vh-100 py-4">
      <div className="container-fluid">
        {/* Header */}
        <div className="row">
          <div className="col-12 mb-4">
            <div className="d-flex align-items-center p-4 bg-dark border border-light rounded shadow account-glow">
              <img
                src={account?.picture || 'https://via.placeholder.com/150'}
                alt="User Avatar"
                className="rounded-circle me-4 border border-3 border-light"
                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
              />
              <div>
                <h3 className="mb-1 fw-bold">{account?.name || 'Anonymous'}</h3>
                <p className="mb-0 text-light small text-opacity-75">
                  Member since {account?.createdAt?.toLocaleDateString() || 'N/A'}
                </p>
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="bg-dark border border-light text-white rounded shadow-sm account-glow">
              <ul className="nav nav-tabs bg-dark px-3 pt-3 rounded-top border-bottom border-light">
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link fw-semibold ${activeTab === 'details' ? 'active text-white border-bottom border-white' : 'text-light'}`}
                    onClick={() => setActiveTab('details')}
                  >
                    Details
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link fw-semibold ${activeTab === 'edit' ? 'active text-white border-bottom border-white' : 'text-light'}`}
                    onClick={() => setActiveTab('edit')}
                  >
                    Edit Account
                  </button>
                </li>
              </ul>

              {/* Tabs */}
              <div className="container mt-3">
                <div className="tab-content">
                  {/* Details Tab */}
                  <div className={`tab-pane fade ${activeTab === 'details' ? 'show active' : ''}`} id="details">
                    <h4 className="fw-semibold mb-3">Your Reviews</h4>
                    <div className="row">
                      {reviewcards?.length ? reviewcards : <p className="text-center text-light text-opacity-75">No reviews found.</p>}
                    </div>
                    <h4>Your Favorites</h4>
                    <div className='row'>
                        {gamecards}
                    </div>
                  </div>

                  {/* Edit Tab */}
                  <div className={`tab-pane fade ${activeTab === 'edit' ? 'show active' : ''}`} id="edit">
                    <div className="p-4">
                      <h5 className="mb-4 fw-semibold">Edit Account</h5>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          updateAccount();
                        }}
                      >
                        <div className="mb-3">
                          <label htmlFor="editName" className="form-label">Full Name</label>
                          <input
                            type="text"
                            className="form-control bg-dark text-white border-light"
                            id="editName"
                            value={editableName}
                            onChange={(e) => setEditableName(e.target.value)}
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="editPicture" className="form-label">Profile Picture</label>
                          <input
                            type="url"
                            className="form-control bg-dark text-white border-light"
                            id="editPicture"
                            value={editablePicture}
                            onChange={(e) => setEditablePicture(e.target.value)}
                          />
                        </div>
                        <button type="submit" className="btn btn-outline-light">Save Changes</button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>  
      </div>
    </div>
  );
};

export default observer(AccountPage);
