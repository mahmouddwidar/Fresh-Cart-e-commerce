import Style from "./MainSlider.module.css";
import Slider from "react-slick";
import slide1 from "../../assets/slider/slider-image-1.jpeg";
import slide2 from "../../assets/slider/slider-image-2.jpeg";
import slide3 from "../../assets/slider/slider-image-3.jpeg";
import slide4 from "../../assets/slider/slider-image-4.jpeg";
import banner1 from "../../assets/slider/grocery-banner.png";
import banner2 from "../../assets/slider/grocery-banner-2.jpeg";

export default function MainSlider() {
	const settings = {
		dots: true,
		arrows: false,
		fade: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		waitForAnimate: false,
		autoplay: true,
		autoplaySpeed: 5000,
		cssEase: "linear",
	};
	return (
		<>
			<div className="row mt-4 gx-0 staggered-animation" style={{ "--i": 2 }}>
				<div className="col-md-10">
					<Slider {...settings} className="mb-2">
						<img height={500} src={slide1} alt="slide 1" />
						<img height={500} src={slide2} alt="slide 2" />
						<img height={500} src={slide3} alt="slide 3" />
						<img height={500} src={slide4} alt="slide 4" />
					</Slider>
				</div>
				<div className="col-md-2">
					<img className={`${Style.banner}`} src={banner1} alt="Banner" />
					<img className={`${Style.banner}`} src={banner2} alt="Banner" />
				</div>
			</div>
		</>
	);
}
