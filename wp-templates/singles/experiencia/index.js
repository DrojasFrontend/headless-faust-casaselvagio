import { useState } from "react";
import { useRouter } from 'next/router';
import { gql } from "@apollo/client";
import * as MENUS from "../../../constants/menus";
import {
  BlogInfoFragment,
  ThemeGeneralSettingsFragment,
} from "../../../fragments/GeneralSettings";
import {
  SEO,
  NavigationMenu,
  Main,
  Footer,
} from "../../../components";

import { Header } from "../../../components/UI/Header";
import { HeroImageTextCTA } from "../../../components/UI/Heros/HeroImageTextCTA";
import { TextImage } from "../../../components/UI/TextImages";
import { CardsGridThree } from "../../../components/UI/Cards/CardsGridThree";

export default function Component(props, pageProps) {
  const router = useRouter();
  // Loading state for previews
  if (props.loading) {
    return <>Loading...</>;
  }

  const pageTitle = props?.data?.casodeExito?.title;
  const { title: siteTitle, description: siteDescription } =
    props?.data?.generalSettings;
  const primaryMenu = props?.data?.headerMenuItems?.nodes ?? [];
  const themeGeneralSettings = props?.data?.themeGeneralSettings ?? [];

  const experiencia = props?.data?.experiencia ?? [];

  const grupoTexto = props?.data?.experiencia?.postExperiencia?.grupotexto ?? [];

  const postExperiencias = props?.data?.experiencias?.nodes ?? [];

  const [isNavShown, setIsNavShown] = useState(false);

  return (
    <>
    
      <SEO title={siteTitle} description={siteDescription} />
      <Header
        title={siteTitle}
				description={siteDescription}
				isNavShown={isNavShown}
				setIsNavShown={setIsNavShown}
				router={router}
      />
      <Main>
        <HeroImageTextCTA data={experiencia}/>
        <TextImage data={grupoTexto} />
        <CardsGridThree data={postExperiencias} />
      </Main>
      <Footer />
    </>
  );
}

Component.variables = ({ databaseId }, ctx) => {
  return {
    databaseId,
    headerLocation: MENUS.PRIMARY_LOCATION,
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
		footerMenuItems: menuItems(where: { location: $footerLocation }) {
			nodes {
				...NavigationMenuItemFragment
			}
		}
    experiencia(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      title
      excerpt
      postExperiencia {
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
        link
        featuredImage {
          node {
            altText
            mediaItemUrl
            title
          }
        }
        postExperiencia {
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
