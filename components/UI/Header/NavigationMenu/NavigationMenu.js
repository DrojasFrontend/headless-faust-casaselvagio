import { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import { gql } from "@apollo/client";
import Link from "next/link";
import styles from "./NavigationMenu.module.scss";
import stylesFromWP from "./NavigationMenuClassesFromWP.module.scss";
import { flatListToHierarchical } from "@faustwp/core";

let cx = classNames.bind(styles);
let cxFromWp = classNames.bind(stylesFromWP);

import IconLocation from "../../../SVG/IconLocation";
import IconClose from "../../../SVG/IconClose";

export default function NavigationMenu({
	menuItems,
	className,
	setIsNavShown,
}) {
	const navRef = useRef(null); // Referencia al menú de navegación

	if (!menuItems) {
		return null;
	}

	const [currentPosition, setCurrentPosition] = useState(null);
	const DESTINATION = "Selvaggio, Ráquira, Boyacá, Colombia";
	const waypoints = [
		"Puente de Boyacá, Boyacá, Colombia",
		"Samacá, Boyacá, Colombia",
		"Sutamarchán, Boyacá, Colombia",
		"Tinjacá, Boyacá, Colombia",
		"Ráquira, Boyacá, Colombia",
	];
	const navigateToSelvaggio = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				const origin = `${position.coords.latitude},${position.coords.longitude}`;
				const destination = encodeURIComponent(DESTINATION);
				const waypointsStr = waypoints
					.map((wp) => encodeURIComponent(wp))
					.join("|");

				const url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&waypoints=${waypointsStr}&travelmode=driving`;
				window.open(url, "_blank");
			});
		}
	};

	// Basado en https://www.wpgraphql.com/docs/menus/#hierarchical-data
	const hierarchicalMenuItems = flatListToHierarchical(menuItems);

	function renderMenu(items) {
		return (
			<ul className={cx("menu")}>
				{items.map((item) => {
					const { id, path, label, children, cssClasses } = item;

					// @TODO - Remove guard clause after ghost menu items are no longer appended to array.
					if (!item.hasOwnProperty("__typename")) {
						return null;
					}

					return (
						<li key={id} className={cxFromWp(cssClasses)}>
							<Link href={path ?? ""}>{label ?? ""}</Link>
							{children.length ? renderMenu(children) : null}
						</li>
					);
				})}

				<li>
					<button onClick={navigateToSelvaggio} className={cx("location")}>
						<IconLocation />
						<span>Hoteles Casa Selvaggio</span>
					</button>
				</li>
			</ul>
		);
	}

	// Hook para manejar el click fuera del menú
	useEffect(() => {
		// Función para manejar los clics fuera del menú
		const handleClickOutside = (event) => {
			if (navRef.current && !navRef.current.contains(event.target)) {
				setIsNavShown(false); // Cerrar el menú si se hace clic fuera
			}
		};

		// Agregar evento de clic al documento
		document.addEventListener("mousedown", handleClickOutside);

		// Eliminar el evento al desmontar el componente
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [setIsNavShown]);

	return (
		<nav
			ref={navRef} // Añadir la referencia al nav
			className={cx(["component", className])}
			role="navigation"
			aria-label={`${menuItems[0]?.menu?.node?.name} menu`}
		>
			<button
				type="button"
				className={cx("nav-close")}
				onClick={() => setIsNavShown(false)}
				aria-label="Close navigation"
			>
				<IconClose />
			</button>
			{renderMenu(hierarchicalMenuItems)}
		</nav>
	);
}

NavigationMenu.fragments = {
	entry: gql`
		fragment NavigationMenuItemFragment on MenuItem {
			id
			path
			label
			parentId
			cssClasses
			menu {
				node {
					name
				}
			}
		}
	`,
};
