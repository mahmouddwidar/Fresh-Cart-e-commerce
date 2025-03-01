import { useFormik } from "formik";
import * as Yup from "yup";
import Style from "./Footer.module.css";

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
				<form onSubmit={formik.handleSubmit} className="ps-4 d-flex justify-content-between align-items-center">
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
			</footer>
		</section>
	);
}
