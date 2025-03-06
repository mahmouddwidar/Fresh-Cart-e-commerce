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
		lazyLoad: true,
	};

	function getAllCategoriesImages() {
		return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
	}

	let { data } = useQuery("getAllCategoriesImages", getAllCategoriesImages);
	let categories = data?.data.data;
	console.log(categories);

	return (
		<>
			<div className="slider-container">
				<Slider {...settings} className="my-4">
					{categories?.map((category, index) => (
						<img
							key={index}
							src={category.image}
							alt={category.name}
							className={`${Style.img}`}
						/>
					))}
				</Slider>
			</div>
		</>
	);
}
