import { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Bounce, toast, ToastContainer } from "react-toastify";
import Style from "./Addresses.module.css";
import axios from "axios";
import { UserContext } from "../../Context/UserContext";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Bars } from "react-loader-spinner";

export default function Addresses() {
	let { userToken } = useContext(UserContext);
	const [showAddForm, setShowAddForm] = useState(false);
	const queryClient = useQueryClient();

	const validationSchema = Yup.object({
		name: Yup.string()
			.min(3, "Minimum length is 3")
			.max(20, "Maximum length is 20")
			.required("Address name is required."),
		details: Yup.string()
			.min(10, "Minimum length is 10")
			.required("Address details are required."),
		phone: Yup.string()
			.matches(/^01[0125][0-9]{8}$/, "Enter a valid Egyptian phone number")
			.required("Phone number is required."),
		city: Yup.string()
			.min(3, "Minimum length is 3")
			.required("City is required."),
	});

	const mutation = useMutation(submitAddress, {
		onSuccess: () => {
			toast.success(`Address Added successfully`, {
				position: "bottom-right",
				autoClose: 5000,
				pauseOnHover: true,
				draggable: true,
				transition: Bounce,
			});
			queryClient.invalidateQueries("LoggedUserAddresses");
			setShowAddForm(false);
		},
		onError: (error) => {
			toast.error(`Failed to add address: ${error.message}`, {
				position: "bottom-right",
				autoClose: 5000,
				pauseOnHover: true,
				draggable: true,
				transition: Bounce,
			});
		},
	});

	let formik = useFormik({
		initialValues: {
			name: "",
			details: "",
			phone: "",
			city: "",
		},
		validationSchema,
		onSubmit: (values) => {
			mutation.mutate(values);
		},
	});

	function submitAddress(values) {
		return axios.post(
			`https://ecommerce.routemisr.com/api/v1/addresses`,
			values,
			{
				headers: {
					token: userToken,
				},
			}
		);
	}

	function getLoggedUserAddresses() {
		return axios.get(`https://ecommerce.routemisr.com/api/v1/addresses`, {
			headers: {
				token: userToken,
			},
		});
	}

	function removeAddress(addressId) {
		return axios.delete(
			`https://ecommerce.routemisr.com/api/v1/addresses/${addressId}`,
			{
				headers: {
					token: userToken,
				},
			}
		);
	}

	let deleteMutation = useMutation(removeAddress, {
		onSuccess: () => {
			toast.success(`Address Deleted successfully`, {
				position: "bottom-right",
				autoClose: 5000,
				pauseOnHover: true,
				draggable: true,
				transition: Bounce,
			});
			queryClient.invalidateQueries("LoggedUserAddresses");
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

	let { data, isLoading, isError } = useQuery(
		"LoggedUserAddresses",
		getLoggedUserAddresses
	);
	let allAddresses = data?.data.data || null;

	return (
		<>
			<ToastContainer />
			<h1 className="mb-4">Addresses</h1>
			<button
				onClick={() => setShowAddForm(!showAddForm)}
				className={`btn ${Style["add-address"]} ${
					showAddForm ? Style["add-address-focus"] : ""
				}`}
			>
				<i className="fa-solid fa-plus"></i> Add Address
			</button>

			{/* Address Form */}
			{showAddForm && (
				<form
					onSubmit={formik.handleSubmit}
					className={`${Style["address-form"]} ms-0`}
				>
					{/* Address Name */}
					<label htmlFor="name">Name</label>
					<input
						type="text"
						name="name"
						id="name"
						className={Style["form-control"]}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.name}
					/>
					{formik.errors.name && formik.touched.name && (
						<div className={Style["error-message"]}>{formik.errors.name}</div>
					)}

					{/* Address Details */}
					<label htmlFor="details">Details</label>
					<textarea
						name="details"
						id="details"
						className={Style["form-control"]}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.details}
					/>
					{formik.errors.details && formik.touched.details && (
						<div className={Style["error-message"]}>
							{formik.errors.details}
						</div>
					)}

					{/* City */}
					<label htmlFor="city">City</label>
					<input
						type="text"
						name="city"
						id="city"
						className={Style["form-control"]}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.city}
					/>
					{formik.errors.city && formik.touched.city && (
						<div className={Style["error-message"]}>{formik.errors.city}</div>
					)}

					{/* Phone */}
					<label htmlFor="phone">Phone</label>
					<input
						type="tel"
						name="phone"
						id="phone"
						className={Style["form-control"]}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.phone}
					/>
					{formik.errors.phone && formik.touched.phone && (
						<div className={Style["error-message"]}>{formik.errors.phone}</div>
					)}

					{/* Submit Button */}
					<button
						type="submit"
						disabled={mutation.isLoading}
						className={`btn ${Style["btn"]}`}
					>
						{mutation.isLoading ? "Adding..." : "Add Address"}
					</button>
				</form>
			)}

			{/* All Addresses */}
			{!showAddForm && (
				<div className="mt-4">
					{isLoading ? (
						<Bars
							height="30"
							width="40"
							color="#FFF"
							ariaLabel="bars-loading"
							wrapperStyle={{}}
							wrapperClass=""
							visible={true}
						/>
					) : isError ? (
						<div className="alert alert-danger">Error loading addresses.</div>
					) : allAddresses.length > 0 ? (
						allAddresses.map((address, index) => (
							<div
								key={address._id}
								className={`staggered-animation ${Style["address-card"]}`}
								style={{ "--i": index + 1 }}
							>
								<div>
									<h5 className="ms-1">{address.name}</h5>
									<p className="ms-3 text-muted">{address.details}</p>
									<p className="ms-3 text-muted">{address.city}</p>
									<p className="ms-3 text-muted">{address.phone}</p>
								</div>
								<button
									onClick={() => deleteMutation.mutate(address._id)}
									className={`btn btn-outline-danger`}
								>
									<i className="fa-solid fa-trash"></i> Delete
								</button>
							</div>
						))
					) : (
						<div className="d-flex justify-content-center align-items-center p-4 h2">
							No addresses found.
						</div>
					)}
				</div>
			)}
		</>
	);
}
