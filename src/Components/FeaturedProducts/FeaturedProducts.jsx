import Style from "./FeaturedProducts.module.css";
import { useContext } from "react";
import axios from "axios";
import { MutatingDots } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { CartContext } from "../../Context/CartContext";
import { Bounce, toast, ToastContainer } from "react-toastify";
import WishListButton from "../WishListButton/WishListButton";

export default function FeaturedProducts() {
	// const [products, setProducts] = useState([]);
	// const [isLoading, setIsLoading] = useState(false);

	// async function getAllProducts() {
	// 	setIsLoading(true);
	// 	await axios
	// 		.get("https://ecommerce.routemisr.com/api/v1/products")
	// 		.then((response) => {
	// 			setProducts(response.data.data);
	// 			console.log(products);
	// 		})
	// 		.catch((error) => {
	// 			console.error("error happened while getting products: ", error);
	// 		});
	// 	setIsLoading(false);
	// }

	// useEffect(() => {
	// 	getAllProducts();
	// }, []);

	function getAllProducts() {
		return axios.get(
			"https://ecommerce.routemisr.com/api/v1/products?sort=-sold"
		);
	}

	let { data, isLoading, isError } = useQuery("getFeaturedProducts", getAllProducts);

	let { addToCart } = useContext(CartContext);

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

	return (
		<>
			{isLoading ? (
				<div className="d-flex justify-content-center align-items-center">
					<MutatingDots
						visible={true}
						height="80"
						width="80"
						color="#4fa94d"
						ariaLabel="grid-loading"
						radius="12.5"
						wrapperStyle={{}}
						wrapperClass="grid-wrapper"
					/>
				</div>
			) : (
				<>
					<div className="container mt-5">
						<div className="text-center mb-4">
							<h2 className="display-4 font-weight-bold text-main">
								Most Sold Products
							</h2>
							<p className="lead text-muted">
								Explore our best-selling items loved by customers worldwide.
							</p>
						</div>
					</div>
					<div
						className="row justify-content-between align-items-center mx-auto staggered-animation"
						style={{ "--i": 4 }}
					>
						{data?.data.data.slice(0, 11).map((product, index) => {
							return (
								<Link
									to={`/product/${product.id}`}
									className={`${Style.product} staggered-animation align-self-start card text-decoration-none mb-4 col-md-3 col-lg-2 m-2 z-0`}
									style={{ "--i": index + 1 }}
									key={index}
								>
									<div className="position-relative">
										<img
											src={product.imageCover}
											alt={product.title}
											className="w-100 card-img-top"
										/>
										{/* {console.log(product._id)} */}
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
											<i className="fa-solid fa-cart-plus"></i>
										</button>
									</div>
									<div className="card-body pb-0">
										<h6 className="mb-0 card-text font-sm fw-medium text-main">
											{product.category.name}
										</h6>
										<h4 className="card-title h5 fw-bold" title={product.title}>
											{product.title}
										</h4>
									</div>
									<div className="p-3 d-flex justify-content-between align-items-center">
										<p className="fw-light m-0">{product.price} EGP</p>
										<span>
											{product.ratingsAverage}{" "}
											<i className="fa-solid fa-star rating-color"></i>
										</span>
									</div>
								</Link>
							);
						})}
						<ToastContainer />
					</div>
				</>
			)}
		</>
	);
}
