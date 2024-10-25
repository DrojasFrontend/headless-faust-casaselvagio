import { gql } from "@apollo/client";
import { useState } from "react";
import { useFaustQuery } from "@faustwp/core";
import * as MENUS from "../constants/menus";
import { BlogInfoFragment } from "../fragments/GeneralSettings";
import { Main, NavigationMenu, SEO } from "../components";

import { HeaderWhite } from "../components/UI/Header/HeaderWhite";
import { HeroImageMedium } from "../components/UI/Heros/HeroImageMedium";
import { CardsPlan } from "../components/UI/Cards/CardsPlan";
import { Footer } from "../components/UI/Footer";

const GET_LAYOUT_QUERY = gql`
	${BlogInfoFragment}
	${NavigationMenu.fragments.entry}
	query GetLayout(
		$headerLocation: MenuLocationEnum
		$menuHeaderLocation: MenuLocationEnum
		$footerLocationMain: MenuLocationEnum
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
		menuHeaderMenuItems: menuItems(where: { location: $menuHeaderLocation }) {
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
				grupoFooter {
					redes {
						link {
							target
							title
							url
						}
						icon {
							mediaItemUrl
						}
					}
				}
			}
		}

		pageBy(uri: "/planes") {
			seo {
				title
				metaDesc
				canonical
				opengraphImage {
					mediaItemUrl
				}
			}
			paginaPlanes {
				grupohero {
					titulo
					imagen {
						mediaItemUrl
						altText
						title
					}
				}
				grupotexto {
					titulo
					descripcion
				}
			}
		}
	}
`;

const GET_ALL_PLANES_QUERY = gql`
	query GetAllPlanes($first: Int!) {
		planes(first: $first) {
			nodes {
				title
				excerpt
				uri
				featuredImage {
					node {
						mediaItemUrl
						altText
						title
					}
				}
			}
		}
	}
`;
export default function Component() {
	const {
		themeGeneralSettings,
		generalSettings,
		headerMenuItems,
		menuHeaderMenuItems,
		footerMenuItems,
		footerMenuItemsMain,
		pageBy,
	} = useFaustQuery(GET_LAYOUT_QUERY);
	const { planes } = useFaustQuery(GET_ALL_PLANES_QUERY);

	const siteSeo = pageBy?.seo;

	const primaryMenu = headerMenuItems?.nodes ?? [];
	const headerMenu = menuHeaderMenuItems?.nodes ?? [];
	const footerMenuMain = footerMenuItemsMain?.nodes ?? [];
	const footerMenu = footerMenuItems?.nodes ?? [];

	const grupoHero = pageBy?.paginaPlanes?.grupohero ?? [];
	const grupoTexto = pageBy?.paginaPlanes?.grupotexto ?? [];

	const [isNavShown, setIsNavShown] = useState(false);

	return (
		<>
			<SEO data={siteSeo} themeGeneralSettings={themeGeneralSettings} />
			<HeaderWhite
				title={siteSeo?.title}
				isNavShown={isNavShown}
				setIsNavShown={setIsNavShown}
				menuItems={primaryMenu}
				menuHeaderItems={headerMenu}
			/>
			<Main
				menuItems={primaryMenu}
				isNavShown={isNavShown}
				setIsNavShown={setIsNavShown}
			>
				<HeroImageMedium data={grupoHero} />
				<CardsPlan data={planes?.nodes} detail={grupoTexto} />
			</Main>
			<Footer
				themeGeneralSettings={themeGeneralSettings}
				menuItemsMain={footerMenuMain}
				menuItems={footerMenu}
			/>
		</>
	);
}

Component.queries = [
	{
		query: GET_LAYOUT_QUERY,
		variables: (seedNode, ctx) => ({
			headerLocation: MENUS.PRIMARY_LOCATION,
			menuHeaderLocation: MENUS.HEADER_LOCATION,
			footerLocationMain: MENUS.FOOTER_LOCATION_MAIN,
			footerLocation: MENUS.FOOTER_LOCATION,
		}),
	},
	{
		query: GET_ALL_PLANES_QUERY,
		variables: () => ({
			first: 5,
		}),
	},
];
