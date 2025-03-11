import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { Bars } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { UserContext } from "../../Context/UserContext";
import { Helmet } from "react-helmet";

export default function Login() {
	let navigate = useNavigate();
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const { setUserToken, setUserData } = useContext(UserContext);

	const validationSchema = Yup.object({
		email: Yup.string()
			.email("Email is invalid!")
			.required("Email is Required."),
		password: Yup.string()
			.matches(
				/[A-Z][a-z 0-9]{5,10}$/,
				"Password must start with uppercase letter and followed by 5 to 10 chars. and numbers."
			)
			.required("Password is required"),
	});

	let formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema,
		onSubmit: LoginSubmit,
	});

	async function LoginSubmit(values) {
		setError(null);
		setIsLoading(true);

		await axios
			.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
			.then((response) => {
				if (response.data.message === "success") {
					setIsLoading(false);
					localStorage.setItem("userToken", response.data.token);
					setUserToken(response.data.token);
					localStorage.setItem('userData', JSON.stringify(response.data.user))
					setUserData(response.data.user);
					navigate("/");
				}
			})
			.catch((error) => {
				setIsLoading(false);
				console.error("Couldn't sing in and an error happened: ", error);
				setError(error.response.data.message);
			});
	}

	return (
		<>
			<Helmet>
				<title>Login</title>
				<meta
					name="description"
					content="Log in to your Fresh Cart account to access exclusive deals, track orders, and manage your preferences. Sign in now!"
				/>
			</Helmet>
			<div className="w-75 mx-auto py-4 px-2">
				<h2>Login</h2>
				<form onSubmit={formik.handleSubmit}>
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

					{isLoading ? (
						<div className="btn btn-success px-4 py-1">
							<Bars
								height="30"
								width="40"
								color="#FFF"
								ariaLabel="bars-loading"
								wrapperStyle={{}}
								wrapperClass=""
								visible={true}
							/>
						</div>
					) : (
						<div className="d-flex align-items-center">
							<button
								disabled={!(formik.isValid && formik.dirty)}
								type="submit"
								className="btn bg-main text-white"
							>
								Login
							</button>
							<Link to={"/register"} className="btn">
								Register Now
							</Link>
						</div>
					)}
					{error && (
						<div className="alert alert-danger mt-3 p-2">Fail, {error}</div>
					)}
				</form>
			</div>
		</>
	);
}
