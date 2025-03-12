import { useContext } from "react";
import Style from "./Profile.module.css";
import { UserContext } from "../../Context/UserContext";

export default function Profile() {
	let { userData } = useContext(UserContext);

	return (
		<>
			<h1>Profile</h1>
			<div className={`${Style.profileCard} ms-0`}>
				<div className={Style.profileInfo}>
					<div className={Style.infoItem}>
						<span className={Style.infoLabel}>Name</span>
						<span className={Style.infoValue}>{userData.name}</span>
					</div>
					<div className={Style.infoItem}>
						<span className={Style.infoLabel}>Email</span>
						<span className={Style.infoValue}>{userData.email}</span>
					</div>
				</div>
			</div>
		</>
	);
}
