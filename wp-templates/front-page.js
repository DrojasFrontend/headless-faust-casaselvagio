import { useState } from "react";

import { useQuery, gql } from "@apollo/client";
import * as MENUS from "../constants/menus";
import { BlogInfoFragment } from "../fragments/GeneralSettings";
import { Footer, Main, NavigationMenu, Hero, SEO } from "../components";

import { Header } from "../components/UI/Header";
import { HeroImage } from "../components/UI/Heros/HeroImage";

export default function Component() {
	const { data } = useQuery(Component.query, {
		variables: Component.variables(),
	});

	const { title: siteTitle, description: siteDescription } =
		data?.generalSettings;
	const primaryMenu = data?.headerMenuItems?.nodes ?? [];
	const footerMenu = data?.footerMenuItems?.nodes ?? [];

	const [isNavShown, setIsNavShown] = useState(false);

	return (
		<>
			<SEO title={siteTitle} description={siteDescription} />
			<Header
				title={siteTitle}
				description={siteDescription}
				isNavShown={isNavShown} // Estado de visibilidad
				setIsNavShown={setIsNavShown}
			/>
			<Main
				menuItems={primaryMenu}
				isNavShown={isNavShown}
				setIsNavShown={setIsNavShown}
			>
				<HeroImage />
			</Main>
			<Footer title={siteTitle} menuItems={footerMenu} />
		</>
	);
}

Component.query = gql`
	${BlogInfoFragment}
	${NavigationMenu.fragments.entry}
	query GetPageData(
		$headerLocation: MenuLocationEnum
		$footerLocation: MenuLocationEnum
	) {
		generalSettings {
			...BlogInfoFragment
		}
		headerMenuItems: menuItems(where: { location: $headerLocation }) {
			nodes {
				...NavigationMenuItemFragment
			}
		}
		footerMenuItems: menuItems(where: { location: $footerLocation }) {
			nodes {
				...NavigationMenuItemFragment
			}
		}
	}
`;

Component.variables = () => {
	return {
		headerLocation: MENUS.PRIMARY_LOCATION,
		footerLocation: MENUS.FOOTER_LOCATION,
	};
};
