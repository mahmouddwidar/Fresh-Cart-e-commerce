import { Helmet } from "react-helmet";
import CategoriesSlider from "../CategoriesSlider/CategoriesSlider";
import FeaturedProducts from "../FeaturedProducts/FeaturedProducts";
import MainSlider from "../MainSlider/MainSlider";

export default function Home() {
	return (
		<>
			<Helmet>
				<title>Home - Fresh Cart</title>
				<meta name="description" content="Shop the latest collection of running shoes at Fresh Cart. Find the best deals on athletic footwear for men, and women. Free shipping available!" />
			</Helmet>
			<MainSlider />
			<CategoriesSlider />
			<FeaturedProducts />
		</>
	);
}
