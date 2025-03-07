import { Helmet } from "react-helmet";
import Style from "./NotFound.module.css";

export default function NotFound() {
	return (
		<>
			<Helmet>
				<title>Page Not Found</title>
				<meta
					name="description"
					content="Oops! The page you're looking for doesn't exist. Explore our wide range of products at Fresh Cart or return to the homepage."
				/>
			</Helmet>
			<h1>NotFound</h1>
		</>
	);
}
