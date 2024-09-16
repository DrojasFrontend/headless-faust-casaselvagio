import { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import * as MENUS from "../constants/menus";
import { BlogInfoFragment } from "../fragments/GeneralSettings";
import { Footer, Main, NavigationMenu, SEO } from "../components";

import { Carusel } from "../components/UI/Caruseles/Carusel";
import { HeaderGreen } from "../components/UI/Header/HeaderGreen";
import { TitleCopy } from "../components/UI/Titles/TitleCopy";
import { TextImage } from "../components/UI/TextImages/TextImage";
import { CardsGrid } from "../components/UI/Cards/CardsGrid";
import { BannerTextCta } from "../components/UI/Banners/BannerTextCta";

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

	const grupoGaleria =
		props?.data?.pageBy?.paginaGatronomia?.grupoGaleria ?? [];
	const grupoTexto = props?.data?.pageBy?.paginaGatronomia?.grupotexto ?? [];
	const grupoPlatos = props?.data?.pageBy?.paginaGatronomia?.grupoPlatos ?? [];
	const grupoCta = props?.data?.pageBy?.paginaGatronomia?.grupocta ?? [];
	const [isNavShown, setIsNavShown] = useState(false);
	return (
		<>
			<SEO title={siteTitle} description={siteDescription} themeGeneralSettings={themeGeneralSettings} />
			<HeaderGreen
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
				<TitleCopy data={grupoGaleria} />
				<Carusel data={grupoGaleria}/>
				<TextImage data={grupoTexto} />
				<CardsGrid data={grupoPlatos} className="text--center" />
				<BannerTextCta data={grupoCta} />
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
		pageBy(uri: "/restaurante") {
			paginaGatronomia {
				grupoGaleria {
					titulo
					descripcion
					galeria {
						mediaItemUrl
						altText
						title
					}
				}
				grupotexto {
					items {
						estilo
						titulo
						descripcion
						imagen {
							mediaItemUrl
							altText
							title
						}
						cta {
							target
							title
							url
						}
						items {
							titulo
						}
					}
				}
				grupoPlatos {
					titulo
					descripcion
					targetas {
						imagen {
							mediaItemUrl
							altText
							title
						}
						detalle
						titulo
					}
					cta {
						url
						title
						target
					}
				}
				grupocta {
					imagen {
						mediaItemUrl
						altText
						title
					}
					titulo
					cta {
						url
						title
						target
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
