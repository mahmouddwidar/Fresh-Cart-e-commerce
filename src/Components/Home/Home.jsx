import CategoriesSlider from "../CategoriesSlider/CategoriesSlider";
import FeaturedProducts from "../FeaturedProducts/FeaturedProducts";
import MainSlider from "../MainSlider/MainSlider";

export default function Home() {
	return (
		<>
			<MainSlider />
			<CategoriesSlider />
			<FeaturedProducts />
		</>
	);
}
