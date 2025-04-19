import React, { useEffect, useState } from 'react';
import { AppState } from '../AppState';
import Pop from '../utils/Pop';
import { reviewsService } from '../services/ReviewsService';
import ReviewCard from '../components/ReviewCard';
import { observer } from 'mobx-react';
import { accountService } from '../services/AccountService';

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
  const reviews = AppState.profileReviews

  useEffect(() => {
    getReviewsByUserId();
  }
  , [account?.id]);


  async function updateAccount() {
    try {
      const accountData = {
        name: editableName,
        picture: editablePicture,
      }
      await accountService.updateAccount(accountData);
      Pop.success('Account Updated!');
    }
    catch (error: any){
      Pop.error(error);
    }
  }



  async function getReviewsByUserId() {
    try {
      await reviewsService.getReviewsByUserID(account?.id);

    }
    catch (error:any){
      Pop.error(error);
    }
  
  }

    const reviewcards = AppState.profileReviews?.slice().reverse().map(review => (<ReviewCard key={review.id} review={review} />));


  return (
    <div className="bg-dark text-white min-vh-100 py-4">
      <div className='container-fluid'>

      <div className="row">
        {/* Top Section: User Info */}
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
              <p className="mb-0 text-light small">Member since {account?.createdAt?.toLocaleDateString() || 'N/A'}</p>
            </div>
          </div>
        </div>

        {/* Main Content: Tabs for Details and Edit Account */}
        <div className="col-12">
          <div className="card bg-secondary text-white shadow rounded">
            {/* Tabs Nav */}
            <ul className="nav nav-tabs bg-dark px-3 pt-3 rounded-top" id="accountTab" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  className={`nav-link ${activeTab === 'details' ? 'active text-white' : 'text-light'}`}
                  id="details-tab"
                  type="button"
                  onClick={() => setActiveTab('details')}
                  >
                  Details
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className={`nav-link ${activeTab === 'edit' ? 'active text-white' : 'text-light'}`}
                  id="edit-tab"
                  type="button"
                  onClick={() => setActiveTab('edit')}
                  >
                  Edit Account
                </button>
              </li>
            </ul>
                  </div>

            <div className="container mt-3"> 
            {/* Tab Content */}
            <div className="tab-content">
              {/* Details Tab */}
              <div
                className={`tab-pane fade ${activeTab === 'details' ? 'show active' : ''}`}
                id="details"
                role="tabpanel"
              >
                <div>
                  <h4>
                    Reviews
                  </h4>
                  <div className='row'>
                    {reviewcards?.length ? reviewcards : <p className='text-center'>No reviews found.</p>}
                  </div>
                </div>
                </div>
              </div>

              {/* Edit Account Tab */}
              <div
                className={`tab-pane fade ${activeTab === 'edit' ? 'show active' : ''}`}
                id="edit"
                role="tabpanel"
              >
                <div className="p-4">
                  <h5 className="text-white mb-4">Edit Account</h5>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                      updateAccount();
                  }}>
                    <div className="mb-3">
                      <label htmlFor="editName" className="form-label">Full Name</label>
                      <input
                        type="text"
                        className="form-control bg-dark text-white border-light"
                        id="editName"
                        defaultValue={account?.name}
                        onChange={(e) => setEditableName(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="editPicture" className="form-label">Profile Picture</label>
                      <input
                        type="url"
                        className="form-control bg-dark text-white border-light"
                        id="editPicture"
                        defaultValue={account?.picture}
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
  );
};

export default observer(AccountPage);
