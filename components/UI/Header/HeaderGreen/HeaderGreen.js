import { useState, useEffect } from "react";

import Link from "next/link";
import Image from "next/image";

import styles from "./HeaderGreen.module.scss";
import className from "classnames/bind";
let cx = className.bind(styles);

import { Container } from "../../../Layout/Container";
import IconMenu from "../../../SVG/IconMenu";

import LogoGreen from "/public/img/logo-green-casaselvaggio.svg";

export default function HeaderGreen({
	title,
	isNavShown,
	setIsNavShown,
	menuItems,
	menuHeaderItems
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
					<div className={cx("left")}>
						{menuHeaderItems?.slice(0, 4).map((m, idx) => {
							return (
								<Link href={m.path} key={idx}>
									<a
										className={cx("link", m.cssClasses)}
										target={m.cssClasses?.includes("target") ? "_blank" : undefined}
									>
										{m.label}
									</a>
								</Link>
							);
						})}
					</div>

					<div className={cx(["logo"])}>
						<Link href="/">
							<a>
								<Image 
									src={LogoGreen} 
									alt={title} 
									width={120}
									height={53}
									title="logo casaselvaggio"
									priority
								/>
							</a>
						</Link>
					</div>

					<div className={cx("right")}>
						{menuHeaderItems?.slice(4, 7).map((m, idx) => {
							return (
								<Link href={m.path} key={idx}>
									<a
										className={cx("link", m.cssClasses)}
										target={m.cssClasses?.includes("target") ? "_blank" : undefined}
									>
										{m.label}
									</a>
								</Link>
							);
						})}
					</div>

					<button
						type="button"
						onClick={() => setIsNavShown(!isNavShown)}
						aria-label="Toggle navigation"
						aria-controls={cx("primary-navigation")}
						aria-expanded={isNavShown}
						className={cx(["nav-toggle", "color--default"])}
					>
						<IconMenu />
						MENÚ
					</button>
				</div>
			</Container>
		</header>
	);
}
