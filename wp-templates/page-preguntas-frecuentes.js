import { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import * as MENUS from "../constants/menus";
import { BlogInfoFragment } from "../fragments/GeneralSettings";
import { Accordion, Footer, Main, NavigationMenu, SEO } from "../components";

import { HeaderWhite } from "../components/UI/Header/HeaderWhite";
import { HeroImageMedium } from "../components/UI/Heros/HeroImageMedium";

export default function Component(props) {
	const { data } = useQuery(Component.query, {
		variables: Component.variables(),
	});

	const themeGeneralSettings = data?.themeGeneralSettings ?? [];
	const { title: siteTitle, description: siteDescription } =
		data?.generalSettings;
	const primaryMenu = data?.headerMenuItems?.nodes ?? [];
	const footerMenuMain = data?.footerMenuItemsMain?.nodes ?? [];
	const footerMenu = data?.footerMenuItems?.nodes ?? [];

	const grupoHero = props?.data?.pageBy?.paginaFaqs?.grupoHero ?? [];
	const mostrarHero = props?.data?.pageBy?.paginaFaqs?.mostrarHero ?? "";
	const grupoPreguntas = props?.data?.pageBy?.paginaFaqs?.grupoPreguntas ?? [];
	const mostrarPreguntas =
		props?.data?.pageBy?.paginaFaqs?.mostrarPreguntas ?? "";

	const [isNavShown, setIsNavShown] = useState(false);

	return (
		<>
			<SEO title={siteTitle} description={siteDescription} themeGeneralSettings={themeGeneralSettings} />
			<HeaderWhite
				title={siteTitle}
				description={siteDescription}
				isNavShown={isNavShown}
				setIsNavShown={setIsNavShown}
			/>
			<Main
				menuItems={primaryMenu}
				isNavShown={isNavShown}
				setIsNavShown={setIsNavShown}
			>
				{mostrarHero && <HeroImageMedium data={grupoHero} />}
				{mostrarPreguntas && <Accordion data={grupoPreguntas} />}
			</Main>
			<Footer title={siteTitle} menuItemsMain={footerMenuMain} menuItems={footerMenu} />
		</>
	);
}

Component.query = gql`
	${BlogInfoFragment}
	${NavigationMenu.fragments.entry}
	query GetPageData(
		$headerLocation: MenuLocationEnum
		$footerLocationMain: MenuLocationEnum
		$footerLocation: MenuLocationEnum
	) {
		generalSettings {
			...BlogInfoFragment
		}
		themeGeneralSettings {
			pageSlug
			pageTitle
			options {
				favicon {
					mediaItemUrl
				}
				grupoheader {
					logo {
						mediaItemUrl
					}
					logoGreen {
						mediaItemUrl
					}
				}
			}
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
		footerMenuItemsMain: menuItems(where: { location: $footerLocationMain }) {
			nodes {
				...NavigationMenuItemFragment
			}
		}
		pageBy(uri: "/preguntas-frecuentes") {
			paginaFaqs {
				mostrarHero
				mostrarPreguntas
				grupoHero {
					titulo
					imagen {
						mediaItemUrl
						altText
						title
					}
				}
				grupoPreguntas {
					imagen {
						mediaItemUrl
						altText
						title
					}
					items {
						pregunta
						respuesta
					}
				}
			}
		}
	}
`;

Component.variables = () => {
	return {
		headerLocation: MENUS.PRIMARY_LOCATION,
		footerLocationMain: MENUS.FOOTER_LOCATION_MAIN,
		footerLocation: MENUS.FOOTER_LOCATION,
	};
};
