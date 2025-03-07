import { useQuery } from "react-query";
import Style from "./ProductDetails.module.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import { Helmet } from "react-helmet";

export default function ProductDetails() {
	let params = useParams();
	let { addToCart, getLoggedUserCart } = useContext(CartContext);

	function getProductDetails(id) {
		return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
	}

	let { data, isLoading, isError } = useQuery("productDetails", () =>
		getProductDetails(params.id)
	);
	let productDetails = data?.data.data;

	async function addProduct(productId) {
		let response = await addToCart(productId);
		console.log(response);
	}

	return (
		<>
			{productDetails ? (
				<>
					<Helmet>
						<title>{productDetails.title}</title>
						<meta
							name="description"
							content={`Discover the ${productDetails.title} at Fresh Cart. durable, stylish, affordable. Shop now and enjoy free shipping!`}
						/>
					</Helmet>
					<div className="row py-4 align-items-center ">
						<div className="col-md-4 staggered-animation" style={{ "--i": 1 }}>
							<img
								src={productDetails.imageCover}
								alt={productDetails.title}
								className="w-100"
							/>
						</div>
						<div className="col-md-8 staggered-animation" style={{ "--i": 2 }}>
							<h2>{productDetails.title}</h2>
							<p>{productDetails.description}</p>
							<h6 className="text-main">{productDetails.category.name}</h6>
							<div className="d-flex justify-content-between align-items-center">
								<h6>Price: {productDetails.price} EGP</h6>
								<span>
									{productDetails.ratingsAverage}
									<i className="fa-solid fa-star rating-color ms-2"></i>
								</span>
							</div>
							<button
								className="btn bg-main text-white w-100 mt-3"
								onClick={() => addProduct(productDetails._id)}
							>
								Add To Cart
							</button>
						</div>
					</div>
				</>
			) : (
				""
			)}
		</>
	);
}
