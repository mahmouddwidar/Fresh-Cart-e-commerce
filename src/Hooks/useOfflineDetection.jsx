import { useEffect } from "react";
import { useState } from "react";

export default function useOfflineDetection() {
	const [isOnline, setIsOnline] = useState(true);

	function detectOffline() {
		window.addEventListener("online", () => {
			setIsOnline(true);
		});

		window.addEventListener("offline", () => {
			setIsOnline(false);
		});
	}

	useEffect(() => {
		detectOffline();
	}, []);

	return (
		<>
			{!isOnline && (
				<div className="network-offline border border-danger">
					<i className="fa-solid fa-wifi text-danger me-2"></i> You&apos;re
					currently offline
				</div>
			)}
		</>
	);
}
