import { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import * as MENUS from "../constants/menus";
import { BlogInfoFragment } from "../fragments/GeneralSettings";
import { Main, NavigationMenu, SEO } from "../components";

import { HeaderWhite } from "../components/UI/Header/HeaderWhite";
import { HeroImage } from "../components/UI/Heros/HeroImage";
import { CardsGrid } from "../components/UI/Cards/CardsGrid";
import { CardsBigSmall } from "../components/UI/Cards/CardsBigSmall";
import { CardsGridThreeCarusel } from "../components/UI/Cards/CardsGridThreeCarusel";
import { Footer } from "../components/UI/Footer";

export default function Component(props) {
	const { data } = useQuery(Component.query, {
		variables: Component.variables(),
	});

	const siteSeo = props.data.pageBy.seo

	const themeGeneralSettings = data?.themeGeneralSettings ?? [];
	const primaryMenu = data?.headerMenuItems?.nodes ?? [];
	const footerMenu = data?.footerMenuItems?.nodes ?? [];
	const footerMenuMain = data?.footerMenuItemsMain?.nodes ?? [];

	const grupoHero = props?.data?.pageBy?.paginaInicio?.grupoHero ?? [];
	const grupoRefugio = props?.data?.pageBy?.paginaInicio?.gruporefugio ?? [];
	const grupohabitaciones =
		props?.data?.pageBy?.paginaInicio?.grupohabitaciones ?? [];
	const grupoexperiencias =
		props?.data?.pageBy?.paginaInicio?.grupoexperiencias ?? [];

	const [isNavShown, setIsNavShown] = useState(false);

	const mostrarHero = props?.data?.pageBy?.paginaInicio?.mostrarHero;
	const mostrarRefigio = props?.data?.pageBy?.paginaInicio?.mostrarRefigio;
	const mostrarHabitaciones = props?.data?.pageBy?.paginaInicio?.mostrarHabitaciones;
	const mostrarExperiencias = props?.data?.pageBy?.paginaInicio?.mostrarExperiencias;

	return (
		<>
			<SEO data={siteSeo} themeGeneralSettings={themeGeneralSettings} />
			<HeaderWhite
				isNavShown={isNavShown}
				setIsNavShown={setIsNavShown}
			/>
			<Main
				menuItems={primaryMenu}
				isNavShown={isNavShown}
				setIsNavShown={setIsNavShown}
			>
				{mostrarHero && (
					<HeroImage data={grupoHero} />
				)}
				
				{mostrarRefigio && (
					<CardsGrid data={grupoRefugio} />
				)}

				{mostrarHabitaciones && (
					<CardsBigSmall data={grupohabitaciones} />
				)}

				{mostrarExperiencias && (
					<CardsGridThreeCarusel data={grupoexperiencias} />
				)}
				
			</Main>
			<Footer themeGeneralSettings={themeGeneralSettings} menuItemsMain={footerMenuMain} menuItems={footerMenu} />
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
		pageBy(uri: "/") {
			seo {
				title
				metaDesc
				canonical
				opengraphImage {
					mediaItemUrl
				}
			}
			paginaInicio {
				mostrarHero
				mostrarRefigio
				mostrarHabitaciones
				mostrarExperiencias

				grupoHero {
					titulo
					imagen {
						mediaItemUrl
						altText
						title
					}
				}
				gruporefugio {
					descripcion
					titulo
					targetas {
						detalle
						titulo
						imagen {
							mediaItemUrl
							altText
							title
						}
					}
				}
				grupohabitaciones {
					titulo
					descripcion
					targetas {
						cta {
							url
							title
							target
						}
						titulo
						imagen {
							mediaItemUrl
							altText
							title
						}
					}
				}
				grupoexperiencias {
					titulo
					descripcion
					targetas {
						titulo
						subTitulo
						descripcion
						imagen {
							mediaItemUrl
							altText
							title
							mediaDetails {
								height
								width
							}
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
