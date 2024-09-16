import { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import * as MENUS from "../constants/menus";
import { BlogInfoFragment } from "../fragments/GeneralSettings";
import { Footer, Main, NavigationMenu, SEO } from "../components";

import { HeaderWhite } from "../components/UI/Header/HeaderWhite";
import { HeroCarusel } from "../components/UI/Heros/HeroCarusel";
import { CardsGridThree } from "../components/UI/Cards/CardsGridThree";
import { CardsMasonry } from "../components/UI/Cards/CardsMasonry";
import { BannerTextCta } from "../components/UI/Banners/BannerTextCta";

export default function Component(props) {
	const { data } = useQuery(Component.query, {
		variables: Component.variables(),
	});

	const themeGeneralSettings = data?.themeGeneralSettings ?? [];
	const { title: siteTitle, description: siteDescription } =
		data?.generalSettings;
	const primaryMenu = data?.headerMenuItems?.nodes ?? [];
	const footerMenu = data?.footerMenuItems?.nodes ?? [];
	const footerMenuMain = data?.footerMenuItemsMain?.nodes ?? [];

	const grupoCarusel =
		props?.data?.pageBy?.paginaExperiencias?.grupoCarusel ?? [];
	const grupoSitios =
		props?.data?.pageBy?.paginaExperiencias?.grupositios ?? [];
	const postInternas = props?.data?.experiencias?.nodes ?? [];
	const grupoCta = props?.data?.pageBy?.paginaExperiencias?.grupoCta ?? [];
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
				<HeroCarusel data={grupoCarusel} />
				<CardsGridThree data={postInternas} heading="Experiencias más populares" />
				<CardsMasonry data={grupoSitios} />
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
		$footerLocation: MenuLocationEnum
		$footerLocationMain: MenuLocationEnum
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
		pageBy(uri: "/tours") {
			paginaExperiencias {
				grupoCarusel {
					slides {
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
					}
				}
				grupositios {
					titulo
					descripcion
					targetas {
						titulo
						imagen {
							mediaItemUrl
							altText
							title
						}
						items {
							titulo
						}
					}
					cantidad
					detalle
					cta {
						target
						title
						url
					}
				}
				grupoCta {
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
		experiencias {
			nodes {
				title
				excerpt
				uri
				featuredImage {
					node {
						altText
						mediaItemUrl
						title
					}
				}
				postInterna {
					grupocaracteristicas {
						titulo
						caracteristica {
							detalle
						}
						titulo
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
