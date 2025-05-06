import { useState } from "react";
import { gql } from "@apollo/client";
import * as MENUS from "../../../constants/menus";
import { BlogInfoFragment } from "../../../fragments/GeneralSettings";
import { SEO, NavigationMenu, Main, Footer } from "../../../components";

import { HeaderWhite } from "../../../components/UI/Header/HeaderWhite";
import { HeroImageTextCTA } from "../../../components/UI/Heros/HeroImageTextCTA";
import { TextImage } from "../../../components/UI/TextImages";
import { CardsGridThree } from "../../../components/UI/Cards/CardsGridThree";

export default function Component(props, pageProps) {
	// Loading state for previews
	if (props.loading) {
		return <>Loading...</>;
	}

	const siteSeo = props?.data?.experiencia?.seo;

	const themeGeneralSettings = props?.data?.themeGeneralSettings ?? [];
	const primaryMenu = props?.data?.headerMenuItems?.nodes ?? [];
	const headerMenu = props?.data?.menuHeaderMenuItems?.nodes ?? [];
	const footerMenu = props?.data?.footerMenuItems?.nodes ?? [];
	const footerMenuMain = props?.data?.footerMenuItemsMain?.nodes ?? [];

	const experiencia = props?.data?.experiencia ?? [];
	const grupoTexto = props?.data?.experiencia?.postInterna?.grupotexto ?? [];
	const postInternas = props?.data?.experiencias?.nodes ?? [];
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
				<HeroImageTextCTA data={experiencia} />
				<TextImage data={grupoTexto} />
				<CardsGridThree
					data={postInternas}
					heading="Experiencias más populares"
				/>
			</Main>
			<Footer
				themeGeneralSettings={themeGeneralSettings}
				menuItemsMain={footerMenuMain}
				menuItems={footerMenu}
			/>
		</>
	);
}

Component.variables = ({ databaseId }, ctx) => {
	return {
		databaseId,
		headerLocation: MENUS.PRIMARY_LOCATION,
		menuHeaderLocation: MENUS.HEADER_LOCATION,
		footerLocationMain: MENUS.FOOTER_LOCATION_MAIN,
		footerLocation: MENUS.FOOTER_LOCATION,
		asPreview: ctx?.asPreview,
	};
};

Component.query = gql`
	${BlogInfoFragment}
	${NavigationMenu.fragments.entry}
	query GetPageData(
		$databaseId: ID!
		$headerLocation: MenuLocationEnum
		$menuHeaderLocation: MenuLocationEnum
		$footerLocationMain: MenuLocationEnum
		$footerLocation: MenuLocationEnum
		$asPreview: Boolean = false
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
		experiencia(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
			title
			excerpt
			seo {
				title
				metaDesc
				canonical
				opengraphImage {
					mediaItemUrl
				}
			}
			postInterna {
				grupobanner {
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
