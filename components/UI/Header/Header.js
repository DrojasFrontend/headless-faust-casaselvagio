import Image from "next/image";
import styles from "./Header.module.scss";
import className from "classnames/bind";
let cx = className.bind(styles);

import { Container } from "../../Layout/Container";
import IconMenu from "../../SVG/IconMenu";

import Logo from "/public/img/logocasaselvaggio.svg";

export default function Header({
	title,
	menuItems,
	isNavShown,
	setIsNavShown,
}) {
	return (
		<header className={cx(["component"])}>
			<Container>
				<div className={cx(["grid"])}>
					<div className={cx(["logo"])}>
						<Image src={Logo} alt={title} title="logo" />
					</div>
					<button
						type="button"
						className={cx("nav-toggle")}
						onClick={() => setIsNavShown(!isNavShown)}
						aria-label="Toggle navigation"
						aria-controls={cx("primary-navigation")}
						aria-expanded={isNavShown}
					>
						<IconMenu />
						MENÚ
					</button>
				</div>
			</Container>
		</header>
	);
}
