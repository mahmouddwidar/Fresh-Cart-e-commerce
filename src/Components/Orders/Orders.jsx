import { useContext } from "react";
import Style from "./Orders.module.css";
import { UserContext } from "../../Context/UserContext";
import { useQuery } from "react-query";
import emptyOrders from "../../assets/Empty-Orders.svg";
import { MutatingDots } from "react-loader-spinner";
import axios from "axios";

export default function Orders() {
	let { userData } = useContext(UserContext);

	function getUserOrders(userId) {
		return axios.get(
			`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`
		);
		// return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/`);
	}

	let { data, isLoading, isError } = useQuery("getUserOrders", () =>
		getUserOrders(userData["id"])
	);
	let allOrders = data?.data;
	console.log(allOrders);
	

	return (
		<>
			<h1 className="mb-4">Orders</h1>
			{isError && (
				<div className="alert alert-danger p-1">
					Error happened while getting your order
				</div>
			)}
			{isLoading ? (
				<div className="d-flex justify-content-center align-items-center">
					<MutatingDots
						visible={true}
						height="100"
						width="100"
						color="#4fa94d"
						secondaryColor="#4fa94d"
						radius="12.5"
						ariaLabel="mutating-dots-loading"
						wrapperStyle={{}}
						wrapperClass=""
					/>
				</div>
			) : allOrders.length === 0 ? (
				<img
					className="w-75 staggered-animation"
					style={{ "--i": 1 }}
					src={emptyOrders}
					alt="Empty Order"
				/>
			) : (
				<div className="container my-5">
					{allOrders.map((order, index) => {
						return (
							<>
								<div
									key={index}
									className="d-flex justify-content-between align-items-center mb-4 staggered-animation"
									style={{ "--i": index + 1 }}
								>
									<h2 className="text-main">Order #{order.id}</h2>
									<div className="d-flex gap-3">
										<span
											className={`badge ${
												order.isPaid ? "bg-success" : "bg-danger"
											}`}
										>
											{order.isPaid ? "Paid" : "Not Paid"}
										</span>
										<span
											className={`badge ${
												order.isDelivered ? "bg-success" : "bg-warning"
											}`}
										>
											{order.isDelivered ? "Delivered" : "Not Delivered"}
										</span>
									</div>
								</div>
								{/* Order Summary */}
								<div
									className="card shadow-sm mb-2 staggered-animation"
									style={{ "--i": index + 1 }}
								>
									<div className="card-body">
										<h5 className="card-title text-main">Order Summary</h5>
										<div className="row">
											<div className="col-md-6">
												<p>
													<strong>Order Date:</strong> {(new Date(order.paidAt)).toLocaleString()}
												</p>
												<p>
													<strong>Payment Method:</strong>{" "}
													{order.paymentMethodType}
												</p>
											</div>
											<div className="col-md-6">
												<p>
													<strong>Total Price:</strong> {order.totalOrderPrice}{" "}
													EGP
												</p>
												<p>
													<strong>Shipping Price:</strong> $0
												</p>
												<p>
													<strong>Tax Price:</strong> $0
												</p>
											</div>
										</div>
									</div>
								</div>
								{/* Shipping Address */}
								<div
									className="card shadow-sm mb-4 staggered-animation"
									style={{ "--i": index + 1 }}
								>
									<div className="card-body">
										<h5 className="card-title text-main">Shipping Address</h5>
										<p className="mb-1">
											<strong>Details:</strong> Home Address, Alexadnria
										</p>
										<p>
											<strong>Phone:</strong> 01234567890
										</p>
									</div>
								</div>
								<hr />
							</>
						);
					})}
				</div>
			)}
		</>
	);
}
