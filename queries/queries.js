import { gql } from "@apollo/client";
import { BlogInfoFragment } from "../fragments/GeneralSettings";

import { NavigationMenu } from "../components/UI/Header/NavigationMenu";

export const GET_FLOATING_MENU = gql`
	query GetFloatingMenu {
		themeGeneralSettings {
			options {
				grupomenufloating {
					items {
						icono {
							mediaItemUrl
						}
            iconoActive {
              mediaItemUrl
            }
						enlace {
							target
							title
							url
						}
					}
				}
			}
		}
	}
`;

export const GET_PAGE_DATA = gql`
  ${BlogInfoFragment}
  ${NavigationMenu.fragments.entry}
  query GetPageData(
    $headerLocation: MenuLocationEnum
    $footerLocationMain: MenuLocationEnum
    $footerLocation: MenuLocationEnum
    $uri: String!
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
    pageBy(uri: $uri) {
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
