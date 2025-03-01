import { useFormik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import Style from "./Footer.module.css";
import amazonPay from "../../assets/footer/Amazon_Pay_logo.png";
import masterCard from "../../assets/footer/MasterCard-Logo.png";
import paypal from "../../assets/footer/PayPal.png";
import appleStore from "../../assets/footer/get-it-on-apple-store.png";
import googlePlay from "../../assets/footer/get-it-on-google-play-badge.png";

export default function Footer() {
	const validationSchema = Yup.object({
		email: Yup.string().email("Invalid Email!").required("Email is required."),
	});
	const formik = useFormik({
		initialValues: {
			email: "",
		},
		validationSchema,
		onSubmit: emailSubmit,
	});

	function emailSubmit(values) {
		console.log(values);
	}
	return (
		<section className="bg-light">
			<footer className="container py-4">
				<h2>Get The FreshCart app</h2>
				<p>
					We will send you a link, open it on your phone to download the app.
				</p>
				<form
					onSubmit={formik.handleSubmit}
					className="ps-4 mb-4 d-flex justify-content-between align-items-center"
				>
					<input
						type="email"
						name="email"
						placeholder="Email .."
						value={formik.values.email}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						className="w-75 form-control"
					/>
					<button type="submit" className="btn btn-success me-4">
						Share App Link
					</button>
				</form>
				{formik.errors.email && formik.touched.email && (
					<p className="alert alert-danger mx-4 mt-4">{formik.errors.email}</p>
				)}
				<hr className="opacity-25" />
				<div className="d-flex justify-content-between align-items-center">
					<div className="d-flex justify-content-between align-items-center">
						<h5 className="me-3">Payments Partners</h5>
						<img
							className="me-2"
							style={{ width: "48px" }}
							src={amazonPay}
							alt="Amazon Pay Logo"
						/>
						<img
							className="me-2"
							style={{ width: "48px" }}
							src={masterCard}
							alt="Master Card Logo"
						/>
						<img
							className="me-2"
							style={{ width: "48px" }}
							src={paypal}
							alt="Paypal Logo"
						/>
					</div>
					<div className="d-flex justify-content-between align-items-center">
						<h5 className="me-3">Get deliveries with FreshCart</h5>
						<Link to={"/"}>
							<img
								className="me-2"
								style={{ width: "98px" }}
								src={appleStore}
								alt="Apple Store Logo"
							/>
						</Link>
						<Link to={"/"}>
							<img
								className="me-2"
								style={{ width: "108px" }}
								src={googlePlay}
								alt="Google Play Logo"
							/>
						</Link>
					</div>
				</div>
				<hr className="mb-4 opacity-25" />
			</footer>
		</section>
	);
}
