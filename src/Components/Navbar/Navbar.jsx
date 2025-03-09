import Style from "./Navbar.module.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/imgs/freshcart-logo.svg";
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";

export default function Navbar() {
	let { userToken, setUserToken } = useContext(UserContext);
	let navigate = useNavigate();

	function logOut() {
		localStorage.removeItem("userToken");
		setUserToken(null);
		navigate("/login");
	}

	return (
		<nav className="navbar navbar-expand-lg bg-body-tertiary">
			<div className="container-fluid container">
				<Link className="navbar-brand" to="/">
					<img src={logo} alt="Fresh Cart Logo" />
				</Link>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					{/* Links */}
					{userToken !== null ? (
						<ul className="navbar-nav me-auto mb-2 mb-lg-0">
							<li className="nav-item">
								<NavLink className="nav-link" aria-current="page" to="/">
									Home
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink className="nav-link" to="/products">
									Products
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink className="nav-link position-relative" to="/cart">
									<i className="fa-solid fa-cart-shopping"></i>{" "}
									<span className="cart-nav">
										5
									</span>
								</NavLink>
							</li>
						</ul>
					) : (
						""
					)}

					<ul className="navbar-nav ms-auto mb-2 mb-lg-0">
						{/* TODO: Make sure icons are good, and responsive on small screens  */}
						<li className="nav-item d-flex align-items-center">
							<i className="fab fa-facebook-f me-3"></i>
							<i className="fab fa-twitter me-3"></i>
							<i className="fab fa-youtube me-3"></i>
							<i className="fab fa-instagram me-3"></i>
						</li>
						{userToken !== null ? (
							<li className="nav-item">
								<button
									className="nav-link"
									onClick={() => {
										logOut();
									}}
								>
									Log out
								</button>
							</li>
						) : (
							<>
								<li className="nav-item">
									<NavLink className="nav-link" to="/login">
										Login
									</NavLink>
								</li>
								<li className="nav-item">
									<NavLink className="nav-link" to="/register">
										Register
									</NavLink>
								</li>
							</>
						)}
					</ul>
				</div>
			</div>
		</nav>
	);
}
