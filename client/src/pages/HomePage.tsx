import { useEffect, useState } from "react";
import '../assets/scss/pages/HomePage.scss'
import Pop from "../utils/Pop";
import { gamesService } from "../services/GamesService";
import { AppState } from "../AppState";

import { reviewsService } from "../services/ReviewsService";
import ReviewCard from "../components/ReviewCard";
import GameCard from "../components/Gamecard";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";

 function HomePage() {
  
  
  useEffect(() => {
    fetchGames()
    fetchReviews()
  }, [])
  
  
  
  async function fetchGames() {
    try {
      await gamesService.fetchGames()
      

    }
    catch (error: any){
      Pop.error(error);
    }
  }
  
  const gamecards = AppState.games?.slice(0, 6).map(game => <GameCard key={game.gameId} game={game} />) 
  
  async function fetchReviews(){
    try {
      await reviewsService.fetchReviews()
    }
    catch (error: any){
      Pop.error(error);
    }
  }
  
  const reviewcards = AppState.reviews?.slice().reverse().map(review => (<ReviewCard key={review.id} review={review} />));
  

  return (
    <div className="bg-dark">
      <div className="container-fluid bg-hero d-flex flex-column justify-content-center">
        <div className="row p-md-5 mt-md-5 text-bg kanit-regular text-md-start text-center">
          <div className="col-12">
            <h2 className="">Player-powered reviews you can trust</h2>
          </div>
          <div className="col-md-6 col-12">
            <h4>
            Whether you're into RPGs, shooters, or indie gems, thousands of gamers are sharing reviews and insights on our platform. New opinions drop daily—log in, rate, and join the conversation.
            </h4>
          </div>
        </div>
      </div>
    <div className="bg-dark">
      
        <div className="container mt-4">
          <h4>Browse Games</h4>
          <div className="row">
            {gamecards}
          </div>
          <div className="center">
            <Link to={"/games"}>
            <button className="browse-btn mt-3">Browse All Games</button>
            </Link>
          </div>
          <h4>All Reviews</h4>
          <div className="row">
            {reviewcards}
          </div>
        </div>
      
    </div>
  </div>
)}


export default observer(HomePage);