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

	const siteSeo = props.data.pageBy.seo;

	const themeGeneralSettings = data?.themeGeneralSettings ?? [];
	const primaryMenu = data?.headerMenuItems?.nodes ?? [];
	const headerMenu = data?.menuHeaderMenuItems?.nodes ?? [];
	const footerMenuMain = data?.footerMenuItemsMain?.nodes ?? [];
	const footerMenu = data?.footerMenuItems?.nodes ?? [];

	const grupoGaleria =
		props?.data?.pageBy?.paginaGatronomia?.grupoGaleria ?? [];
	const grupoGaleriaCtaTop =
		props?.data?.pageBy?.paginaGatronomia?.grupoGaleria?.grupoctatop ?? [];
	const grupoTexto = props?.data?.pageBy?.paginaGatronomia?.grupotexto ?? [];
	const grupoPlatos = props?.data?.pageBy?.paginaGatronomia?.grupoPlatos ?? [];
	const grupoCta = props?.data?.pageBy?.paginaGatronomia?.grupocta ?? [];
	const [isNavShown, setIsNavShown] = useState(false);
	return (
		<>
			<SEO data={siteSeo} themeGeneralSettings={themeGeneralSettings} />
			<HeaderGreen
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
				<TitleCopy data={grupoGaleria} />
				<Carusel data={grupoGaleria} />
				<BannerTextCta data={grupoGaleriaCtaTop} />
				<TextImage data={grupoTexto} />
				<CardsGrid data={grupoPlatos} className="text--center" />
				<BannerTextCta data={grupoCta} />
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
		pageBy(uri: "/restaurante") {
			seo {
				title
				metaDesc
				canonical
				opengraphImage {
					mediaItemUrl
				}
			}
			paginaGatronomia {
				grupoGaleria {
					titulo
					descripcion
					galeria {
						mediaItemUrl
						altText
						title
					}
					grupoctatop {
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
		menuHeaderLocation: MENUS.HEADER_LOCATION,
		footerLocationMain: MENUS.FOOTER_LOCATION_MAIN,
		footerLocation: MENUS.FOOTER_LOCATION,
	};
};
