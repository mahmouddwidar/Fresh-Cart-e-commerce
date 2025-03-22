import { Helmet } from "react-helmet";
import Style from "./Products.module.css";
import axios from "axios";
import { useQuery } from "react-query";
import WishListButton from "../WishListButton/WishListButton";
import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { CartContext } from "../../Context/CartContext";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function Products() {
	let { addToCart } = useContext(CartContext);
	const [searchQuery, setSearchQuery] = useState("");
	const [filteredProducts, setFilteredProducts] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);

	// Formik setup for the sidebar filter form
	const formik = useFormik({
		initialValues: {
			limit: "",
			priceLte: "",
			priceGte: "",
		},
		validationSchema: Yup.object({
			limit: Yup.number().positive().integer(),
			priceLte: Yup.number().positive(),
			priceGte: Yup.number().positive(),
		}),
		onSubmit: (values) => {
			formik.setValues(values);
		},
	});

	const {
		data: allProducts,
		isLoading,
		isError,
	} = useQuery(
		["products", formik.values, currentPage],
		async () => {
			const queryParams = new URLSearchParams();
			if (formik.values.limit) queryParams.append("limit", formik.values.limit);
			if (formik.values.priceLte)
				queryParams.append("price[lte]", formik.values.priceLte);
			if (formik.values.priceGte)
				queryParams.append("price[gte]", formik.values.priceGte);
			queryParams.append("page", currentPage); // Add current page to query params

			const { data } = await axios.get(
				`https://ecommerce.routemisr.com/api/v1/products?${queryParams.toString()}`
			);
			return data;
		}
	);

	// Filter products as the user types
	useEffect(() => {
		if (allProducts?.data) {
			const filtered = allProducts.data.filter((product) =>
				product.title.toLowerCase().includes(searchQuery.toLowerCase())
			);
			setFilteredProducts(filtered);
		}
	}, [searchQuery, allProducts]);

	// Add product to cart
	async function addProduct(productId) {
		let response = await addToCart(productId);
		if (response.data.status === "success") {
			toast.success(`${response.data.message}`, {
				position: "bottom-right",
				autoClose: 5000,
				pauseOnHover: true,
				draggable: true,
				transition: Bounce,
			});
		} else {
			toast.error(`${response.data.message}`, {
				position: "bottom-right",
				autoClose: 5000,
				pauseOnHover: true,
				draggable: true,
				transition: Bounce,
			});
		}
	}

	// Handle pagination
	const handlePageChange = (page) => {
		setCurrentPage(page);
	};

	return (
		<>
			<Helmet>
				<title>Products - Fresh Cart</title>
				<meta
					name="description"
					content="Explore our wide range of products at Fresh Cart. Find the best deals and shop with confidence. Free shipping available!"
				/>
			</Helmet>
			<ToastContainer />
			<div className="row my-4">
				{/* Sidebar */}
				<div className="col-md-3 p-3">
					<div className="card shadow-sm p-3">
						<h4 className="mb-3 d-flex align-items-center">
							<i className="fas fa-filter me-2"></i>
							Filters
						</h4>
						<form onSubmit={formik.handleSubmit}>
							{/* Limit */}
							<div className="mb-3">
								<label htmlFor="limit" className="form-label">
									<i className="fas fa-tags me-2"></i>
									Limit
								</label>
								<input
									type="number"
									id="limit"
									name="limit"
									className="form-control"
									onChange={formik.handleChange}
									value={formik.values.limit}
								/>
							</div>

							{/* Price (LTE) */}
							<div className="mb-3">
								<label htmlFor="priceLte" className="form-label">
									<i className="fas fa-dollar-sign me-2"></i>
									Price (Max)
								</label>
								<input
									type="number"
									id="priceLte"
									name="priceLte"
									className="form-control"
									onChange={formik.handleChange}
									value={formik.values.priceLte}
								/>
							</div>

							{/* Price (GTE) */}
							<div className="mb-3">
								<label htmlFor="priceGte" className="form-label">
									<i className="fas fa-dollar-sign me-2"></i>
									Price (Min)
								</label>
								<input
									type="number"
									id="priceGte"
									name="priceGte"
									className="form-control"
									onChange={formik.handleChange}
									value={formik.values.priceGte}
								/>
							</div>

							{/* Submit Button */}
							<button type="submit" className="btn bg-main text-white w-100">
								Apply Filters
							</button>
						</form>
					</div>
				</div>

				{/* Main Content */}
				<div className="col-md-9 p-3">
					{/* Search Form */}
					<form className="mb-4 d-flex">
						<input
							type="text"
							className="border rounded px-2 py-1 flex-grow-1 me-2"
							placeholder="Search products..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
					</form>

					<div className="row">
						{isLoading ? ( // Show placeholder cards when loading
							Array.from({ length: 6 }).map((_, index) => (
								<div className="col-md-4 mb-4" key={index}>
									<div className="card h-100">
										<div className="card-img-top placeholder-glow">
											<div
												className="placeholder w-100"
												style={{ height: "200px" }}
											></div>
										</div>
										<div className="card-body">
											<h5 className="card-title placeholder-glow">
												<span className="placeholder col-6"></span>
											</h5>
											<p className="card-text placeholder-glow">
												<span className="placeholder col-7"></span>
												<span className="placeholder col-4"></span>
												<span className="placeholder col-4"></span>
											</p>
										</div>
									</div>
								</div>
							))
						) : isError ? ( // Show error message if fetching fails
							<p>Failed to fetch products. Please try again later.</p>
						) : filteredProducts.length > 0 ? ( // Show filtered products
							filteredProducts.map((product, index) => (
								<div className="col-md-4 mb-4" key={index}>
									<Link
										to={`/product/${product.id}`}
										className={`${Style.product} card text-decoration-none h-100`}
									>
										<div className="position-relative">
											<img
												src={product.imageCover}
												alt={product.title}
												className="w-100 card-img-top"
											/>
											<WishListButton
												productId={product._id}
												className={Style["wishlist-button"]}
											/>
											<button
												className={`${Style.addToCart} d-flex justify-content-between align-items-center bg-main`}
												title="Add To Cart"
												onClick={(e) => {
													e.stopPropagation();
													e.preventDefault();
													addProduct(product._id);
												}}
											>
												<i className="fas fa-cart-plus"></i>
											</button>
										</div>
										<div className="card-body pb-0">
											<h6 className="mb-0 card-text font-sm fw-medium text-main">
												{product.category.name}
											</h6>
											<h4
												className="card-title h5 fw-bold"
												title={product.title}
											>
												{product.title}
											</h4>
										</div>
										<div className="p-3 d-flex justify-content-between align-items-center">
											<p className="fw-light m-0">{product.price} EGP</p>
											<span>
												{product.ratingsAverage}{" "}
												<i className="fas fa-star rating-color"></i>
											</span>
										</div>
									</Link>
								</div>
							))
						) : (
							<p>No products found.</p>
						)}
					</div>

					{/* Pagination */}
					{allProducts?.metadata && (
						<nav aria-label="Page navigation" className="mt-4">
							<ul className="pagination justify-content-center">
								{/* Previous Button */}
								<li
									className={`page-item ${
										currentPage === 1 ? "disabled" : "text-main"
									}`}
								>
									<button
										className="page-link"
										onClick={() => handlePageChange(currentPage - 1)}
									>
										Previous
									</button>
								</li>

								{/* Page Numbers */}
								{Array.from(
									{ length: allProducts.metadata.numberOfPages },
									(_, index) => (
										<li
											key={index}
											className={`page-item ${
												currentPage === index + 1 ? "bg-main" : ""
											}`}
										>
											<button
												className={`page-link ${
													currentPage === index + 1 ? "bg-main text-white" : ""
												}`}
												onClick={() => handlePageChange(index + 1)}
											>
												{index + 1}
											</button>
										</li>
									)
								)}

								{/* Next Button */}
								<li
									className={`page-item ${
										currentPage === allProducts.metadata.numberOfPages
											? "disabled"
											: "text-main"
									}`}
								>
									<button
										className="page-link text-main"
										onClick={() => handlePageChange(currentPage + 1)}
									>
										Next
									</button>
								</li>
							</ul>
						</nav>
					)}
				</div>
			</div>
		</>
	);
}
