import axios from "axios";
import Style from "./WishList.module.css";
import { useContext, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { MutatingDots } from "react-loader-spinner";
import emptyWishList from "../../assets/WishList.svg";
import { Bounce, toast, ToastContainer } from "react-toastify";

export default function WishList() {
	const { userToken } = useContext(UserContext);
	const [hoveredProduct, setHoveredProduct] = useState(null);
	const queryClient = useQueryClient();

	// Fetch wishlist data
	const getLoggedUserWishList = async () => {
		const { data } = await axios.get(
			`https://ecommerce.routemisr.com/api/v1/wishlist`,
			{
				headers: { token: userToken },
			}
		);
		return data.data;
	};

	const {
		data: wishlist,
		isLoading,
		isError,
	} = useQuery("wishlist", getLoggedUserWishList);

	// Mutation to remove product from wishlist
	const removeFromWishListMutation = useMutation(
		(productId) =>
			axios.delete(
				`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
				{
					headers: { token: userToken },
				}
			),
		{
			onSuccess: () => {
				toast.success(`Product removed from wishlist!`, {
					position: "bottom-right",
					autoClose: 5000,
					pauseOnHover: true,
					draggable: true,
					transition: Bounce,
				})
				queryClient.invalidateQueries("wishlist");
			},
			onError: () => {
				toast.error(`Failed to remove product from wishlist.`, {
					position: "bottom-right",
					autoClose: 5000,
					pauseOnHover: true,
					draggable: true,
					transition: Bounce,
				})
			},
		}
	);

	const handleRemove = (productId) => {
		removeFromWishListMutation.mutate(productId);
	};

	return (
		<div className="container mb-4">
			<ToastContainer />
			<h1 className="mb-4">Wish List</h1>
			{isError && (
				<div className="alert alert-danger p-2">
					Error happened while getting your wishlist!
				</div>
			)}
			{isLoading ? (
				<div className="d-flex justify-content-center align-items-center vh-50">
					<MutatingDots
						visible={true}
						height="100"
						width="100"
						color="#0aad0a"
						secondaryColor="#0aad0a"
						radius="12.5"
						ariaLabel="mutating-dots-loading"
					/>
				</div>
			) : wishlist?.length === 0 ? (
				<div className="text-center staggered-animation" style={{ '--i': 1 }}>
					<img className="w-75" src={emptyWishList} alt="Empty wishlist" />
					<p className="mt-3 text-muted">Your wishlist is empty.</p>
				</div>
			) : (
				<div className="row">
					{wishlist?.map((product, index) => (
						<div className="col-md-4 mb-4 staggered-animation" style={{ '--i': index+1 }} key={product._id}>
							<div
								className={`card shadow-sm ${Style.wishlistCard}`}
								onMouseEnter={() => setHoveredProduct(product._id)}
								onMouseLeave={() => setHoveredProduct(null)}
							>
								{/* Remove Button (Heart Icon) */}
								<button
									className={`${Style.removeButton}`}
									title="Remove from wish list"
									onClick={() => handleRemove(product._id)}
								>
									<i
										className={`fas ${
											hoveredProduct === product._id
												? "fa-heart-crack"
												: "fa-heart"
										} ${Style.heartIcon}`}
									/>
								</button>

								{/* Product Image */}
								<img
									src={product.imageCover}
									alt={product.title}
									className="card-img-top"
									style={{ height: "200px", objectFit: "contain" }}
								/>

								{/* Product Details */}
								<div className="card-body">
									<h5 className="card-title" title={product.title}>{product.title}</h5>
									<p className="card-text text-main">
										{product.price.toLocaleString()} EGP
									</p>
								</div>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
