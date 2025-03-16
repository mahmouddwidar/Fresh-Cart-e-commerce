import { useMutation } from "react-query";
import Style from "./WishListButton.module.css";
import { Bounce, toast } from "react-toastify";
import { useContext } from "react";
import { WishListContext } from "../../Context/WishListContext";
import PropTypes from "prop-types";

export default function WishListButton({ productId, className }) {
	let { addProductToWishList } = useContext(WishListContext);
	let addToWishListMutation = useMutation(addProductToWishList, {
		onSuccess: () => {
			toast.success(`Product added to your Wish List`, {
				position: "bottom-right",
				autoClose: 5000,
				pauseOnHover: true,
				draggable: true,
				transition: Bounce,
			});
		},
		onError: (error) => {
			toast.error(`Failed to delete address: ${error.message}`, {
				position: "bottom-right",
				autoClose: 5000,
				pauseOnHover: true,
				draggable: true,
				transition: Bounce,
			});
		},
	});
	
	return (
		<>
			<button
				// className={`btn ${Style["wishlist-button"]}`}
				className={`btn ${className}`}
				title="Add Product To Wish List"
				onClick={(e) => {
					e.stopPropagation();
					e.preventDefault();
					addToWishListMutation.mutate(productId);
				}}
			>
				<i className={`fas fa-heart`}></i>
			</button>
		</>
	);
}

WishListButton.propTypes = {
	productId: PropTypes.string.isRequired,
	className: PropTypes.string,
};
