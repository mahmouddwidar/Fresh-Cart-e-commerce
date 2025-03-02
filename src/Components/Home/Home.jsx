import { useContext, useEffect, useState } from "react";
import Style from "./Home.module.css";
import axios from "axios";
import { Grid } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { CartContext } from "../../Context/CartContext";

export default function Home() {
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
		return axios.get("https://ecommerce.routemisr.com/api/v1/products");
	}

	let { data, isLoading, isError, isFetching } = useQuery(
		"products",
		getAllProducts
	);

	let { addToCart } = useContext(CartContext);

	return (
		<section
			className="container d-flex justify-content-center align-items-center py-4 my-4"
			style={{ minHeight: "80vh" }}
		>
			{isLoading ? (
				<div className="d-flex justify-content-center align-items-center">
					<Grid
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
				<div className="row justify-content-between align-items-center mx-auto">
					{data?.data.data.map((product, index) => {
						return (
							<Link
								to={`/`}
								className={`${Style.product} align-self-start card text-decoration-none col-md-3 col-lg-2 m-2`}
								style={{ "--i": index + 1 }}
								key={index}
							>
								<div className="position-relative">
									<img
										src={product.imageCover}
										alt={product.title}
										className="w-100 card-img-top"
									/>
									<button
										className={`${Style.addToCart} d-flex justify-content-between align-items-center`}
										title="Add To Cart"
										onClick={() => {
											addToCart(1);
										}}
									>
										<i className="fa-solid fa-cart-plus"></i>
									</button>
								</div>
								<div className="card-body pb-0">
									<h6
										className="mb-0 card-text font-sm fw-medium"
										style={{ color: "var(--main-color)" }}
									>
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
										<i
											className="fa-solid fa-star"
											style={{ color: "var(--rating-color)" }}
										></i>
									</span>
								</div>
							</Link>
						);
					})}
				</div>
			)}
		</section>
	);
}
