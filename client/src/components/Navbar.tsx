import { Link } from "react-router-dom";
import Login from "./Login";

export function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <Link className="navbar-brand d-flex align-items-center gap-2" to={''}>
        <span className="fw-bold text-white">Checkpoint <span className="mdi mdi-check-bold"></span></span>
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarContent"
        aria-controls="navbarContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarContent">
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <Link to={'Games'} className="nav-link text-uppercase text-success">
              All Games
            </Link>
          </li>
        </ul>
        <div className="d-flex">
          <Login />
        </div>
      </div>
    </nav>
  );
}
