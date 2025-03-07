import Slider from "react-slick";
import Style from "./CategoriesSlider.module.css";
import { useQuery } from "react-query";
import axios from "axios";

export default function CategoriesSlider() {
	const settings = {
		infinite: true,
		slidesToShow: 7,
		slidesToScroll: 1,
		autoplay: true,
		speed: 4000,
		autoplaySpeed: 1,
		cssEase: "linear",
	};

	function getAllCategoriesImages() {
		return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
	}

	let { data } = useQuery("getAllCategoriesImages", getAllCategoriesImages);
	let categories = data?.data.data;

	return (
		<>
			<div className="slider-container staggered-animation" style={{ '--i': 3 }}>
				<Slider {...settings} className="my-4">
					{categories?.map((category, index) => (
						<>
							<img
								key={index}
								src={category.image}
								alt={category.name}
								className={`${Style.img}`}
							/>
							<h2 className="h6 mt-2 fw-semibold">{category.name}</h2>
						</>
					))}
				</Slider>
			</div>
		</>
	);
}
