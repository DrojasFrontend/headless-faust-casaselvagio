import { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import * as MENUS from "../constants/menus";
import { BlogInfoFragment } from "../fragments/GeneralSettings";
import { Main, NavigationMenu, SEO } from "../components";

import { HeaderWhite } from "../components/UI/Header/HeaderWhite";
import { HeroImage } from "../components/UI/Heros/HeroImage";
import { CardsGrid } from "../components/UI/Cards/CardsGrid";
import { BannerTextCta } from "../components/UI/Banners/BannerTextCta";
import { CardsBigSmall } from "../components/UI/Cards/CardsBigSmall";
import { CardsGridThreeCarusel } from "../components/UI/Cards/CardsGridThreeCarusel";
import { Footer } from "../components/UI/Footer";
import { Calendar } from "../components/UI/Calendar";

export default function Component(props) {
	const { data } = useQuery(Component.query, {
		variables: Component.variables(),
	});

	const siteSeo = props?.data?.pageBy?.seo;
	const themeGeneralSettings = data?.themeGeneralSettings ?? [];
	const primaryMenu = data?.headerMenuItems?.nodes ?? [];
	const headerMenu = data?.menuHeaderMenuItems?.nodes ?? [];
	const footerMenu = data?.footerMenuItems?.nodes ?? [];
	const footerMenuMain = data?.footerMenuItemsMain?.nodes ?? [];

	const grupoHero = props?.data?.pageBy?.paginaInicio?.grupoHero ?? [];
	const grupoRefugio = props?.data?.pageBy?.paginaInicio?.gruporefugio ?? [];
	const grupoCta = props?.data?.pageBy?.paginaInicio?.grupocta ?? [];
	const grupohabitaciones =
		props?.data?.pageBy?.paginaInicio?.grupohabitaciones ?? [];
	const grupoexperiencias =
		props?.data?.pageBy?.paginaInicio?.grupoexperiencias ?? [];

	const mostrarHero = props?.data?.pageBy?.paginaInicio?.mostrarHero;
	const mostrarRefigio = props?.data?.pageBy?.paginaInicio?.mostrarRefigio;
	const mostrarHabitaciones =
		props?.data?.pageBy?.paginaInicio?.mostrarHabitaciones;
	const mostrarExperiencias =
		props?.data?.pageBy?.paginaInicio?.mostrarExperiencias;

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
				{mostrarHero && <HeroImage data={grupoHero} />}
				{mostrarRefigio && <CardsGrid data={grupoRefugio} />}
				<BannerTextCta data={grupoCta} />
				{mostrarHabitaciones && <CardsBigSmall data={grupohabitaciones} />}
				{mostrarExperiencias && (
					<CardsGridThreeCarusel data={grupoexperiencias} />
				)}
				<Calendar />
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
					video
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
						video {
							mediaItemUrl
						}
						imagen {
							mediaItemUrl
							altText
							title
						}
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
						columnas
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
		menuHeaderLocation: MENUS.HEADER_LOCATION,
		footerLocationMain: MENUS.FOOTER_LOCATION_MAIN,
		footerLocation: MENUS.FOOTER_LOCATION,
	};
};