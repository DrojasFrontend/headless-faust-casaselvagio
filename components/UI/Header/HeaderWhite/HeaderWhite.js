import { useState, useEffect } from "react";

import Link from "next/link";
import Image from "next/image";

import styles from "./Header.module.scss";
import className from "classnames/bind";
let cx = className.bind(styles);

import { Container } from "../../../Layout/Container";
import IconMenu from "../../../SVG/IconMenu";

import LogoDefault from "/public/img/logocasaselvaggio.svg";
import LogoGreen from "/public/img/logo-green-casaselvaggio.svg";

export default function Header({
	title,
	menuItems,
	isNavShown,
	setIsNavShown,
	router,
}) {
	const [scrolled, setScrolled] = useState(false);
	const handleScroll = () => {
		const offset = window.scrollY;
		if (offset > 50) {
			setScrolled(true);
		} else {
			setScrolled(false);
		}
	};
	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);
	const menuClasses = scrolled ? "header-scrolled" : "";

	return (
		<header className={cx(["component", menuClasses])}>
			<Container>
				<div className={cx(["grid"])}>
					<div className={cx(["logo"])}>
						<Link href="/">
							<a>
								<span className={cx("desktop")}>
									<Image
										src={LogoDefault}
										alt={title}
										width={120}
										height={53}
										title="logo casaselvaggio"
									/>
								</span>
								<span className={cx("mobile")}>
									<Image
										src={LogoGreen}
										alt={title}
										width={120}
										height={53}
										title="logo casaselvaggio"
									/>
								</span>
							</a>
						</Link>
					</div>
					<button
						type="button"
						onClick={() => setIsNavShown(!isNavShown)}
						aria-label="Toggle navigation"
						aria-controls={cx("primary-navigation")}
						aria-expanded={isNavShown}
						className={cx(["nav-toggle", "color--white"])}
					>
						<IconMenu />
						MENÚ
					</button>
				</div>
			</Container>
		</header>
	);
}
