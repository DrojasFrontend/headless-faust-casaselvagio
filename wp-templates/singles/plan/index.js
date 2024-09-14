import { useState } from "react";
import { useRouter } from "next/router";
import { gql } from "@apollo/client";
import * as MENUS from "../../../constants/menus";
import {
	BlogInfoFragment,
	ThemeGeneralSettingsFragment,
} from "../../../fragments/GeneralSettings";
import { SEO, NavigationMenu, Main, Footer } from "../../../components";

import { Header } from "../../../components/UI/Header";
import { HeroImageTextCTA } from "../../../components/UI/Heros/HeroImageTextCTA";
import { TextImage } from "../../../components/UI/TextImages";
import { CardsGridThree } from "../../../components/UI/Cards/CardsGridThree";
import { BannerTextCta } from "../../../components/UI/Banners/BannerTextCta";

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

	const plan = props?.data?.plan ?? [];
	const grupoTexto = props?.data?.plan?.postInterna?.grupotexto ?? [];
	const postInternas = props?.data?.planes?.nodes ?? [];
  const grupoCta = props?.data?.plan?.postInterna?.grupocta ?? [];

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
				<HeroImageTextCTA data={plan} />
				<TextImage data={grupoTexto} />
				<CardsGridThree data={postInternas} heading="Planes mas destacados"/>
        <BannerTextCta data={grupoCta} />
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
		plan(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
			title
			excerpt
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
		planes {
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
