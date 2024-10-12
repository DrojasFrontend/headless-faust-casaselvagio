import { gql } from "@apollo/client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import * as MENUS from "../constants/menus";
import { BlogInfoFragment } from "../fragments/GeneralSettings";
import { Main, NavigationMenu, SEO } from "../components";

import { HeaderWhite } from "../components/UI/Header/HeaderWhite";
import { HeroCaruselPosts } from "../components/UI/Heros/HeroCaruselPosts";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { Container } from "../components/Layout/Container";
import { CardPost } from "../components/UI/Cards/CardPost";
import { Footer } from "../components/UI/Footer";

export default function Component(props) {
	const themeGeneralSettings = props?.data?.themeGeneralSettings ?? [];
	const { title: siteTitle, description: siteDescription } =
		props?.data?.generalSettings;
	const primaryMenu = props?.data?.headerMenuItems?.nodes ?? [];
	const headerMenu = props?.data?.menuHeaderMenuItems?.nodes ?? [];
	const footerMenu = props?.data?.footerMenuItems?.nodes ?? [];
	const footerMenuMain = props?.data?.footerMenuItemsMain?.nodes ?? [];
  const categories = props?.data?.categories?.edges ?? [];
	const posts = props?.data?.nodeByUri?.posts?.edges;

	const [isNavShown, setIsNavShown] = useState(false);

	return (
		<>
			<SEO title={siteTitle} description={siteDescription} themeGeneralSettings={themeGeneralSettings} />
			<HeaderWhite
				title={siteTitle}
				description={siteDescription}
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
				<>
					<HeroCaruselPosts data={posts} />
					<section className="CardsPost">
						<div className="CardsPost__scroll">
							<ul className="CardsPost__category">
								{categories
									.filter(
										(category) => category?.node?.slug !== "uncategorized"
									) // Filtrar "Uncategorized"
									.map((category, index) => (
										<li key={index}>
											<Link href={`categoria/${category?.node?.slug}`}>
												<a className="category">
													<Image
														src={
															category?.node?.postCategoria?.icono?.mediaItemUrl
														}
														alt={category?.node?.name}
														width={44}
														height={44}
													/>
													{category?.node?.name}
												</a>
											</Link>
										</li>
									))}
							</ul>
						</div>
						<Container>
							<Breadcrumbs />
							<h2 className="heading--40 color--primary">
								Descubrir artículos
							</h2>
							<div className="CardsPost__grid">
								{posts.map((post, index) => (
									<CardPost key={index} data={post} />
								))}
							</div>
						</Container>
					</section>
				</>
			</Main>
			<Footer
				title={siteTitle}
				menuItemsMain={footerMenuMain}
				menuItems={footerMenu}
			/>
		</>
	);
}
Component.query = gql`
	${BlogInfoFragment}
	${NavigationMenu.fragments.entry}
	query GetCategoryPage(
		$uri: String!
		$headerLocation: MenuLocationEnum
		$menuHeaderLocation: MenuLocationEnum
		$footerLocationMain: MenuLocationEnum
		$footerLocation: MenuLocationEnum
	) {
		nodeByUri(uri: $uri) {
			... on Category {
				name
				posts(first: 10) {
					edges {
						node {
							id
							title
							content
							date
							uri
							excerpt
							featuredImage {
								node {
									mediaItemUrl
									altText
									title(format: RAW)
								}
							}
							author {
								node {
									name
								}
							}
						}
					}
				}
			}
		}
    categories(first: 10) {
			edges {
				node {
					id
					name
					slug
					postCategoria {
						icono {
							mediaItemUrl
						}
					}
				}
			}
		}
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
	}
`;

Component.variables = ({ uri }) => {
	return {
		uri,
		headerLocation: MENUS.PRIMARY_LOCATION,
		menuHeaderLocation: MENUS.HEADER_LOCATION,
		footerLocationMain: MENUS.FOOTER_LOCATION_MAIN,
		footerLocation: MENUS.FOOTER_LOCATION,
	};
};
