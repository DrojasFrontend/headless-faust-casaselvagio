import { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import * as MENUS from "../constants/menus";
import { BlogInfoFragment } from "../fragments/GeneralSettings";
import { Footer, Main, NavigationMenu, SEO } from "../components";

import { HeaderWhite } from "../components/UI/Header/HeaderWhite";
import { HeroCarusel } from "../components/UI/Heros/HeroCarusel";
import { Gallery } from "../components/UI/Galleries/Gallery";

export default function Component(props, pageProps) {
	const { data } = useQuery(Component.query, {
		variables: Component.variables(),
	});

	const themeGeneralSettings = data?.themeGeneralSettings ?? [];
	const { title: siteTitle, description: siteDescription } =
		data?.generalSettings;
	const primaryMenu = data?.headerMenuItems?.nodes ?? [];
	const footerMenuMain = data?.footerMenuItemsMain?.nodes ?? [];
	const footerMenu = data?.footerMenuItems?.nodes ?? [];

	const grupoCarusel = props?.data?.pageBy?.paginaGaleria?.grupoCarusel ?? [];
	const grupoGaleria = props?.data?.pageBy?.paginaGaleria?.grupogaleria ?? [];
	const mostrarCarusel =
		props?.data?.pageBy?.paginaGaleria?.mostrarcarusel ?? "";
	const mostrarGaleria =
		props?.data?.pageBy?.paginaGaleria?.mostrarGaleria ?? "";

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
				{mostrarCarusel && <HeroCarusel data={grupoCarusel} />}
				{mostrarGaleria && <Gallery data={grupoGaleria} />}
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
		footerMenuItemsMain: menuItems(where: { location: $footerLocationMain }) {
			nodes {
				...NavigationMenuItemFragment
			}
		}
		footerMenuItems: menuItems(where: { location: $footerLocation }) {
			nodes {
				...NavigationMenuItemFragment
			}
		}
		pageBy(uri: "/galeria") {
			paginaGaleria {
				mostrarcarusel
				mostrarGaleria
				grupoCarusel {
					slides {
						titulo
						descripcion
						cta {
							target
							title
							url
						}
						imagen {
							mediaItemUrl
							altText
							title
						}
					}
				}
				grupogaleria {
					Imagenes {
						columnas
						imagen {
							mediaItemUrl
							altText
							title
						}
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
