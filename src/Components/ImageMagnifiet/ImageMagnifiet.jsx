import { useState } from "react";
import PropTypes from 'prop-types';

const ImageMagnifier = ({
	src,
	width = "100%",
	height = "100%",
	magnifierHeight = 100,
	magnifierWidth = 100,
	zoomLevel = 1.5,
	className = "",
	alt = "Zoomable image",
}) => {
	const [[x, y], setXY] = useState([0, 0]);
	const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
	const [showMagnifier, setShowMagnifier] = useState(false);

	const handleMouseEnter = (e) => {
		const elem = e.currentTarget;
		const { width, height } = elem.getBoundingClientRect();
		setSize([width, height]);
		setShowMagnifier(true);
	};

	const handleMouseMove = (e) => {
		const elem = e.currentTarget;
		const { top, left } = elem.getBoundingClientRect();

		// Calculate cursor position relative to the image
		const x = e.clientX - left;
		const y = e.clientY - top;

		setXY([x, y]);
	};

	const handleMouseLeave = () => {
		setShowMagnifier(false);
	};

	return (
		<div
			className={`magnifier-container ${className}`}
			style={{
				position: "relative",
				width,
				height,
				overflow: "hidden",
			}}
		>
			<img
				src={src}
				className="magnifier-image"
				style={{
					width: "100%",
					height: "100%",
					objectFit: "cover",
					display: "block",
				}}
				onMouseEnter={handleMouseEnter}
				onMouseMove={handleMouseMove}
				onMouseLeave={handleMouseLeave}
				alt={alt}
			/>

			{showMagnifier && (
				<div
					className="magnifier-glass"
					style={{
						position: "absolute",
						pointerEvents: "none",
						height: `${magnifierHeight}px`,
						width: `${magnifierWidth}px`,
						top: `${y - magnifierHeight / 4}px`,
						left: `${x - magnifierWidth / 4}px`,
						opacity: 1,
						border: "1px solid lightgray",
						backgroundColor: "white",
						backgroundImage: `url('${src}')`,
						backgroundRepeat: "no-repeat",
						backgroundSize: `${imgWidth * zoomLevel}px ${
							imgHeight * zoomLevel
						}px`,
						backgroundPositionX: `${-x * zoomLevel + magnifierWidth / 2}px`,
						backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`,
						borderRadius: "50%",
						boxShadow: "0 0 10px rgba(0,0,0,0.2)",
						transform: "translate(-50%, -50%)",
						zIndex: 100,
					}}
				/>
			)}
		</div>
	);
};

ImageMagnifier.propTypes = {
	src: PropTypes.string.isRequired,
	width: PropTypes.string,
	height: PropTypes.string,
	magnifierHeight: PropTypes.number,
	magnifierWidth: PropTypes.number,
	zoomLevel: PropTypes.number,
	className: PropTypes.string,
	alt: PropTypes.string,
};

export default ImageMagnifier;
