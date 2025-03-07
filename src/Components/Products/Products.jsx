import { Helmet } from "react-helmet";
import Style from "./Products.module.css";

export default function Products() {
	return (
		<>
			<Helmet>
				<title>Products - Fresh Cart</title>
				<meta
					name="description"
					content="Explore our wide range of products at Fresh Cart. Find the best deals and shop with confidence. Free shipping available!"
				/>
			</Helmet>
			<h1>Products</h1>
		</>
	);
}
