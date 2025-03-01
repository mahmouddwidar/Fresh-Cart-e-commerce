import { useEffect, useState } from "react";
import Style from "./Home.module.css";
import axios from "axios";
import { Grid } from "react-loader-spinner";
import { Link } from "react-router-dom";

export default function Home() {
	const [products, setProducts] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	async function getAllProducts() {
		setIsLoading(true);
		await axios
			.get("https://ecommerce.routemisr.com/api/v1/products")
			.then((response) => {
				setProducts(response.data.data);
				console.log(products);
			})
			.catch((error) => {
				console.error("error happened while getting products: ", error);
			});
		setIsLoading(false);
	}

	useEffect(() => {
		getAllProducts();
	}, []);

	return (
		<section className="container d-flex justify-content-center align-items-center" style={{ minHeight: '80vh'}}>
			{isLoading ? (
				<div className="d-flex justify-content-center align-items-center">
					<Grid
						visible={true}
						height="80"
						width="80"
						color="#4fa94d"
						ariaLabel="grid-loading"
						radius="12.5"
						wrapperStyle={{}}
						wrapperClass="grid-wrapper"
					/>
				</div>
			) : (
				<div className="d-flex justify-content-between align-items-center flex-wrap">
					{products.map((product, index) => {
						return (
							<Link to={`products`} className="card text-decoration-none col-md-2 m-2" key={index}>
								<div className=" overflow-hidden" style={{ height: "200px" }}>
									<img
										src={product.imageCover}
										alt={product.title}
										className="w-100"
									/>
								</div>
								<h6 className=" mt-2 text-success">{product.category.name}</h6>
								<h4>{product.title}</h4>
							</Link>
						);
					})}
				</div>
			)}
		</section>
	);
}
