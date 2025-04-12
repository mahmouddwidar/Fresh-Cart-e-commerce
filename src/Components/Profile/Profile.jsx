import { useContext, useState, useEffect } from "react";
import Style from "./Profile.module.css";
import { UserContext } from "../../Context/UserContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useMutation } from "react-query";
import { Bounce, toast, ToastContainer } from "react-toastify";

export default function Profile() {
	const { userData, setUserData, userToken } = useContext(UserContext);
	const [isEditing, setIsEditing] = useState(false);
	const [initialValues, setInitialValues] = useState({
		name: userData.name,
		email: userData.email,
		phone: userData.phone || "",
	});

	useEffect(() => {
		setInitialValues({
			name: userData.name,
			email: userData.email,
			phone: userData.phone || "",
		});
	}, [userData]);

	const validationSchema = Yup.object({
		name: Yup.string()
			.min(3, "Minimum length is 3")
			.max(10, "Maximum length is 10")
			.required("Name is required."),
		phone: Yup.string()
			.min(11, "Phone number must be 11 numbers")
			.max(11, "Phone number must be 11 numbers")
			.required("Phone number is required"),
		email: Yup.string()
			.email("Email is invalid!")
			.required("Email is Required."),
	});

	// Function to compare objects and return only changed fields
	const getChangedValues = (currentValues, initialValues) => {
		const changes = {};
		Object.keys(currentValues).forEach((key) => {
			if (currentValues[key] !== initialValues[key]) {
				changes[key] = currentValues[key];
			}
		});
		return changes;
	};

	// Submit Form
	const handleSubmit = (values) => {
		const changedValues = getChangedValues(values, initialValues);

		// If nothing changed, just exit edit mode
		if (Object.keys(changedValues).length === 0) {
			setIsEditing(false);
			return;
		}
		mutation.mutate(changedValues);
	};

	const updateLoggedUserData = (values) => {
		return axios.put(
			`https://ecommerce.routemisr.com/api/v1/users/updateMe/`,
			values,
			{ headers: { token: userToken } }
		);
	};

	const mutation = useMutation(updateLoggedUserData, {
		onSuccess: (data) => {
			setUserData((prev) => ({
				...prev,
				...data.data.data,
			}));
			
			toast.success(`Profile updated successfully`, {
				position: "bottom-right",
				autoClose: 5000,
				pauseOnHover: true,
				draggable: true,
				transition: Bounce,
			});
			setIsEditing(false);
		},
		onError: (error) => {
			toast.error(
				`Failed to update profile: ${error.response.data.errors.msg}`,
				{
					position: "bottom-right",
					autoClose: 5000,
					pauseOnHover: true,
					draggable: true,
					transition: Bounce,
				}
			);
		},
	});

	const formik = useFormik({
		initialValues: initialValues,
		enableReinitialize: true,
		validationSchema,
		onSubmit: handleSubmit,
	});

	const handleCancel = () => {
		formik.resetForm();
		setIsEditing(false);
	};

	const isLoading = mutation.isLoading;

	return (
		<>
			<h1>Profile</h1>
			<ToastContainer />
			<div className={`${Style.profileCard} ms-0`}>
				{!isEditing ? (
					<div className={Style.profileInfo}>
						<div className={Style.infoItem}>
							<span className={Style.infoLabel}>Name</span>
							<span className={Style.infoValue}>{userData.name}</span>
						</div>
						<div className={Style.infoItem}>
							<span className={Style.infoLabel}>Email</span>
							<span className={Style.infoValue}>{userData.email}</span>
						</div>
						<div className={Style.infoItem}>
							<span className={Style.infoLabel}>Phone</span>
							<span className={Style.infoValue}>{userData.phone}</span>
						</div>
						<button
							className={`btn bg-main text-white ${Style.editButton}`}
							onClick={() => setIsEditing(true)}
						>
							Edit Profile
						</button>
					</div>
				) : (
					<form onSubmit={formik.handleSubmit} className={Style.profileForm}>
						<div className={`form-group ${Style.formGroup}`}>
							<label htmlFor="name">Name</label>
							<input
								type="text"
								className="form-control"
								id="name"
								name="name"
								value={formik.values.name}
								onBlur={formik.handleBlur}
								onChange={formik.handleChange}
							/>
							{formik.errors.name && formik.touched.name && (
								<div className="alert alert-danger p-1 mt-1">
									{formik.errors.name}
								</div>
							)}
						</div>
						<div className={`form-group ${Style.formGroup}`}>
							<label htmlFor="email">Email</label>
							<input
								type="email"
								className="form-control"
								id="email"
								name="email"
								value={formik.values.email}
								onBlur={formik.handleBlur}
								onChange={formik.handleChange}
							/>
							{formik.errors.email && formik.touched.email && (
								<div className="alert alert-danger p-1 mt-1">
									{formik.errors.email}
								</div>
							)}
						</div>
						<div className={`form-group ${Style.formGroup}`}>
							<label htmlFor="phone">Phone</label>
							<input
								type="tel"
								className="form-control"
								id="phone"
								name="phone"
								value={formik.values.phone}
								onBlur={formik.handleBlur}
								onChange={formik.handleChange}
							/>
							{formik.errors.phone && formik.touched.phone && (
								<div className="alert alert-danger p-1 mt-1">
									{formik.errors.phone}
								</div>
							)}
						</div>
						<div className={Style.formButtons}>
							<button
								type="button"
								className="btn btn-secondary"
								onClick={handleCancel}
							>
								Cancel
							</button>
							<button
								type="submit"
								className="btn bg-main text-white"
								disabled={isLoading}
							>
								{isLoading ? "Saving..." : "Save Changes"}
							</button>
						</div>
					</form>
				)}
			</div>
		</>
	);
}
