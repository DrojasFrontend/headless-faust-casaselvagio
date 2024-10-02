import { useState } from "react";

import classNames from "classnames/bind";
import * as SELECTORS from "../../constants/selectors";
import styles from "./Main.module.scss";
let cx = classNames.bind(styles);

import { NavigationMenu } from "../UI/Header/NavigationMenu";
import { NavigationMenuFloating } from "../UI/Header/NavigationMenuFloating";

export default function Main({
	children,
	className,
	menuItems,
	isNavShown,
	setIsNavShown,
	...props
}) {
	return (
		<main
			id={SELECTORS.MAIN_CONTENT_ID}
			tabIndex={-1}
			className={cx(["component", className])}
			{...props}
		>
			{children}
			<NavigationMenu
				className={cx(["primary-navigation", isNavShown ? "show" : undefined])}
				menuItems={menuItems}
				setIsNavShown={setIsNavShown}
			/>
			<NavigationMenuFloating/>
		</main>
	);
}
