import { useQuery, gql } from "@apollo/client";
import { useState } from "react";
import * as MENUS from "../constants/menus";
import { BlogInfoFragment } from "../fragments/GeneralSettings";
import {
	Footer,
	HeroImageTextCTA,
	Main,
	NavigationMenu,
	SEO,
} from "../components";

import { HeaderWhite } from "../components/UI/Header/HeaderWhite";
import { CardsGridTwo } from "../components/UI/Cards/CardsGridTwo";
import { TextImage } from "../components/UI/TextImages";
import { CardsGridFourCarusel } from "../components/UI/Cards/CardsGridFourCarusel";

export default function Component(props) {
	const { data } = useQuery(Component.query, {
		variables: Component.variables(),
	});

	const siteSeo = props.data.pageBy.seo;

	const themeGeneralSettings = data?.themeGeneralSettings ?? [];
	const primaryMenu = data?.headerMenuItems?.nodes ?? [];
	const footerMenuMain = data?.footerMenuItemsMain?.nodes ?? [];
	const footerMenu = data?.footerMenuItems?.nodes ?? [];

	const grupoHero = props?.data?.pageBy?.paginaDiarioSelvaggio?.grupoHero ?? [];

	const grupoTexto =
		props?.data?.pageBy?.paginaDiarioSelvaggio?.grupotexto ?? [];

	const grupoTargetas =
		props?.data?.pageBy?.paginaDiarioSelvaggio?.grupotargetas ?? [];

	const grupoTextoBottom =
		props?.data?.pageBy?.paginaDiarioSelvaggio?.grupotextobottom ?? [];

	const grupoEquipo =
		props?.data?.pageBy?.paginaDiarioSelvaggio?.grupoequipo ?? [];

	const mostrarEquipo =
		props?.data?.pageBy?.paginaDiarioSelvaggio?.mostrarEquipo;
	const mostrarHero = props?.data?.pageBy?.paginaDiarioSelvaggio?.mostrarHero;
	const mostrarTargetas =
		props?.data?.pageBy?.paginaDiarioSelvaggio?.mostrartargetas;
	const mostrarTexto = props?.data?.pageBy?.paginaDiarioSelvaggio?.mostrarTexto;
	const mostrarTextoBottom = props?.data?.pageBy?.paginaDiarioSelvaggio?.mostrartextobottom;

	const [isNavShown, setIsNavShown] = useState(false);
	return (
		<>
			<SEO data={siteSeo} themeGeneralSettings={themeGeneralSettings} />
			<HeaderWhite isNavShown={isNavShown} setIsNavShown={setIsNavShown} />
			<Main
				menuItems={primaryMenu}
				isNavShown={isNavShown}
				setIsNavShown={setIsNavShown}
			>
				{mostrarHero && <HeroImageTextCTA data={grupoHero} />}
				{mostrarTexto && <TextImage data={grupoTexto} />}
				{mostrarTargetas && <CardsGridTwo data={grupoTargetas} />}
				{mostrarTextoBottom && <TextImage data={grupoTextoBottom} />}
				{mostrarEquipo && <CardsGridFourCarusel data={grupoEquipo} />}
			</Main>
			<Footer
				themeGeneralSettings={themeGeneralSettings}
				menuItemsMain={footerMenuMain}
				menuItems={footerMenu}
			/>
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
		pageBy(uri: "/diario-selvaggio") {
			seo {
				title
				metaDesc
				canonical
				opengraphImage {
					mediaItemUrl
				}
			}
			paginaDiarioSelvaggio {
				mostrarEquipo
				mostrarHero
				mostrarTexto
				mostrartextobottom
				mostrartargetas
				grupoHero {
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
							icono {
								mediaItemUrl
							}
						}
					}
				}
				grupotextobottom {
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
							icono {
								mediaItemUrl
							}
						}
					}
				}
				grupotargetas {
					titulo
					descripcion
					items {
						titulo
						detalle
						imagen {
							mediaItemUrl
							altText
							title
						}
					}
				}
				grupoequipo {
					titulo
					descripcion
					items {
						nombre
						rol
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
