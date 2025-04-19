import { createHashRouter } from 'react-router-dom';
import { App } from './App.tsx';
import { accountService } from './services/AccountService.ts';
import AuthGuard from './utils/AuthGuard.js';
import ErrorPage from './pages/ErrorPage.tsx';
import HomePage from './pages/HomePage.tsx';
import AboutPage from './pages/GameListPage.tsx';
import AccountPage from './pages/AccountPage.tsx';
import GameDetailsPage from './pages/GameDetailsPage';
import GameListPage from './pages/GameListPage.tsx';


export const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "games",
        element: <GameListPage />,
      },
      {
        path: "account",
        element:
          <AuthGuard>
            <AccountPage />
          </AuthGuard>,
      },
      {
        path: "games/:gameId",
        element: <GameDetailsPage/>,
      },
    ],
  },
]);