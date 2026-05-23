import { Link, redirect, Router } from "react-router-dom";

const NavbarComponent = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 shadow">
      <div className="container-fluid">
        <Link className="navbar-brand w-25 fw-bold fs-4" to="/home">
          AI Itinerary Creator
        </Link>
        <div>
            {/* <button className="btn btn-outline-light me-2">Itinerary</button> */}
            <button className="btn btn-outline-light" onClick={()=> {localStorage.removeItem('token');window.location.href = '/';}}>Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default NavbarComponent;