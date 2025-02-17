import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { FallingLines } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function Register() {
	let navigate = useNavigate();
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	// const phoneRegex = /^(\+1[-. ]?)?(\d{3}[-. ]?|\(\d{3}\)[-. ]?)\d{3}[-. ]?\d{4}$/;
	const validationSchema = Yup.object({
		name: Yup.string()
			.min(3, "Minimum length is 3")
			.max(10, "Maximum length is 10")
			.required("Name is required."),
		// phone: Yup.string().matches(phoneRegex, "Phone number is invalid!").required("Phone number is required"),
		phone: Yup.string()
			.min(11, "Phone number must be 11 numbers")
			.max(11, "Phone number must be 11 numbers")
			.required("Phone number is required"),
		email: Yup.string()
			.email("Email is invalid!")
			.required("Email is Required."),
		password: Yup.string()
			.matches(
				/[A-Z][a-z 0-9]{5,10}$/,
				"Password must start with uppercase letter and followed by 5 to 10 chars. and numbers."
			)
			.required("Password is required"),
		rePassword: Yup.string()
			.oneOf([Yup.ref("password")], "password and rePassword don't match!")
			.required("Re-password is required."),
	});

	let formik = useFormik({
		initialValues: {
			name: "",
			phone: "",
			email: "",
			password: "",
			rePassword: "",
		},
		validationSchema,
		onSubmit: registerSubmit,
	});

	async function registerSubmit(values) {
		setError(null);
		setIsLoading(true);

		await axios
			.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
			.then((response) => {
				if (response.data.message === "success") {
					setIsLoading(false);
					navigate("/login");
				}
			})
			.catch((error) => {
				setIsLoading(false);
				if (error.response.status == 409) {
					setError(error.response.data.message);
				} else {
					setError(error.response.data.errors.msg);
				}
				console.error("Couldn't sing up and an error happened: ", error);
			});
	}

	return (
		<div className="w-75 mx-auto py-4 px-2">
			<h2>Register Now</h2>
			<form onSubmit={formik.handleSubmit}>
				<label htmlFor="name">Name: </label>
				<input
					className="form-control mb-2"
					type="text"
					name="name"
					id="name"
					value={formik.values.name}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
				/>
				{formik.errors.name && formik.touched.name && (
					<div className="alert alert-danger p-2 mt-2">
						{formik.errors.name}
					</div>
				)}

				<label htmlFor="phone">Phone: </label>
				<input
					className="form-control mb-2"
					type="tel"
					name="phone"
					id="phone"
					value={formik.values.phone}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
				/>
				{formik.errors.phone && formik.touched.phone && (
					<div className="alert alert-danger p-2 mt-2">
						{formik.errors.phone}
					</div>
				)}

				<label htmlFor="email">Email: </label>
				<input
					className="form-control mb-2"
					type="email"
					name="email"
					id="email"
					value={formik.values.email}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
				/>
				{formik.errors.email && formik.touched.email && (
					<div className="alert alert-danger p-2 mt-2">
						{formik.errors.email}
					</div>
				)}

				<label htmlFor="password">Password: </label>
				<input
					className="form-control mb-2"
					type="password"
					name="password"
					id="password"
					value={formik.values.password}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
				/>
				{formik.errors.password && formik.touched.password && (
					<div className="alert alert-danger p-2 mt-2">
						{formik.errors.password}
					</div>
				)}

				<label htmlFor="repassword">rePassword: </label>
				<input
					className="form-control mb-2"
					type="password"
					name="rePassword"
					id="repassword"
					value={formik.values.rePassword}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
				/>
				{formik.errors.rePassword && formik.touched.rePassword && (
					<div className="alert alert-danger p-2 mt-2">
						{formik.errors.rePassword}
					</div>
				)}

				{isLoading ? (
					<div className="btn btn-success px-4 py-0">
						<FallingLines
							color="#fff"
							width="40"
							visible={true}
							ariaLabel="falling-circles-loading"
						/>
					</div>
				) : (
					<button
						disabled={!(formik.isValid && formik.dirty)}
						type="submit"
						className="btn bg-main text-white"
					>
						Register
					</button>
				)}
				{error && (
					<div className="alert alert-danger mt-3 p-2">Fail, {error}</div>
				)}
			</form>
		</div>
	);
}
