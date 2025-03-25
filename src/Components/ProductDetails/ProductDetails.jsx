import { useQuery } from "react-query";
import Style from "./ProductDetails.module.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import { Helmet } from "react-helmet";
import { Bounce, toast, ToastContainer } from "react-toastify";
import WishListButton from "../WishListButton/WishListButton";
import { MutatingDots } from "react-loader-spinner";
import Slider from "react-slick";
import ImageMagnifier from "../ImageMagnifiet/ImageMagnifiet";

export default function ProductDetails() {
	let params = useParams();
	let { addToCart } = useContext(CartContext);

	function getProductDetails(id) {
		return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
	}

	let { data, isLoading, isError } = useQuery("productDetails", () =>
		getProductDetails(params.id)
	);
	let productDetails = data?.data.data;

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

	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 3000,
		lazyLoad: "ondemand",
	};

	return (
		<>
			{isError && (
				<div className="alert alert-danger p-2">
					Error happened while getting the product!
				</div>
			)}
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
			) : productDetails ? (
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
							{/* Slider  */}
							<Slider {...settings} className="mb-4">
								{productDetails.images.map((img, index) => (
									<div key={index}>
										<ImageMagnifier
											src={img}
											width="500px"
											height="500px"
											magnifierHeight={150}
											magnifierWidth={150}
											zoomLevel={2}
											alt={productDetails.title}
											className="img-fluid product-image-magnifier"
										/>
									</div>
								))}
							</Slider>
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
							<div className="d-flex justify-content-between align-items-center mt-3">
								<button
									className="btn bg-main text-white w-75"
									onClick={() => addProduct(productDetails._id)}
								>
									Add To Cart
								</button>
								<WishListButton
									productId={productDetails._id}
									className={Style["wishlist-button"]}
								/>
							</div>
						</div>
					</div>
					<ToastContainer />
				</>
			) : (
				""
			)}
		</>
	);
}
