import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import * as MENUS from "../constants/menus";
import { BlogInfoFragment } from "../fragments/GeneralSettings";
import {
	Footer,
	Main,
	NavigationMenu,
	FeaturedImage,
	SEO,
} from "../components";
import { HeaderWhite } from "../components/UI/Header/HeaderWhite";
import { Container } from "../components/Layout/Container";
import { HeroCaruselPosts } from "../components/UI/Heros/HeroCaruselPosts";
import { CardPost } from "../components/UI/Cards/CardPost";

import LogoGreen from "/public/img/logo-green-casaselvaggio.svg";

const GET_POSTS = gql`
	query GetPosts($first: Int!, $after: String) {
		posts(first: $first, after: $after) {
			pageInfo {
				hasNextPage
				hasPreviousPage
				startCursor
				endCursor
			}
			edges {
				node {
					id
					title
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
							firstName
						}
					}
					date
					internaBlog {
						imgen {
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

const POSTS_PER_PAGE = 24;

export default function BlogPage(props) {
	const [currentPage, setCurrentPage] = useState(1);
	const [cursor, setCursor] = useState(null);
	const [isNavShown, setIsNavShown] = useState(false);

	const {
		loading: postsLoading,
		error: postsError,
		data: postsData,
		fetchMore,
	} = useQuery(GET_POSTS, {
		variables: { first: POSTS_PER_PAGE, after: cursor },
	});

	if (props.loading || postsLoading) {
		return (
			<div className="loading">
				<Image
					src={LogoGreen}
					alt="Logo casa selvaggio"
					width={120}
					height={53}
					title="logo casaselvaggio"
				/>
			</div>
		);
	}

	if (postsError) {
		return <div>Error: {postsError.message}</div>;
	}

	const siteSeo = props.data.page.seo;
	const themeGeneralSettings = props?.data?.themeGeneralSettings ?? [];
	const primaryMenu = props?.data?.headerMenuItems?.nodes ?? [];
	const footerMenuMain = props?.data?.footerMenuItemsMain?.nodes ?? [];
	const footerMenu = props?.data?.footerMenuItems?.nodes ?? [];
	const { title, content, featuredImage } = props?.data?.page ?? { title: "" };
	const mostrarCarusel = props?.data?.page?.paginaBlog?.mostrarcarusel ?? "";
	const categories = props?.data?.categories?.edges ?? [];

	const posts = postsData?.posts?.edges ?? [];
	const pageInfo = postsData?.posts?.pageInfo;

	const totalPosts = 100;
	const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

	const handlePageClick = (pageNumber) => {
		setCurrentPage(pageNumber);
		const newCursor = pageNumber === 1 ? null : pageInfo.endCursor;

		fetchMore({
			variables: { after: newCursor },
			updateQuery: (previousResult, { fetchMoreResult }) => {
				if (!fetchMoreResult) return previousResult;

				return {
					posts: {
						...fetchMoreResult.posts,
						edges: [...fetchMoreResult.posts.edges],
					},
				};
			},
		});
	};

	const handleNextPage = () => {
		if (currentPage < totalPages && pageInfo.hasNextPage) {
			const newPage = currentPage + 1;
			handlePageClick(newPage);
		}
	};

	const handlePreviousPage = () => {
		if (currentPage > 1) {
			const newPage = currentPage - 1;
			handlePageClick(newPage);
		}
	};

	return (
		<>
			<SEO data={siteSeo} themeGeneralSettings={themeGeneralSettings} />
			<HeaderWhite isNavShown={isNavShown} setIsNavShown={setIsNavShown} />
			<Main
				menuItems={primaryMenu}
				isNavShown={isNavShown}
				setIsNavShown={setIsNavShown}
			>
				{mostrarCarusel && <HeroCaruselPosts data={posts} />}
				<section className="CardsPost">
					<div className="CardsPost__scroll">
						<ul className="CardsPost__category">
							{categories
								.filter((category) => category?.node?.slug !== "uncategorized")
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
						<h2 className="heading--40 color--primary">Descubrir artículos</h2>
						<div className="CardsPost__grid">
							{posts.map((post, index) => (
								<CardPost key={index} data={post} />
							))}
						</div>

						{/* Paginación */}
						<div className="pagination">
							{currentPage > 1 && (
								<button
									className="pagination__prev"
									type="button"
									aria-label="anterior"
									onClick={handlePreviousPage}
								>
									Anterior
								</button>
							)}

							{[...Array(totalPages)].map((_, index) => {
								const pageNumber = index + 1;
								return (
									<button
										className={`pagination__currentPage ${
											currentPage === pageNumber ? "active" : ""
										}`}
										type="button"
										aria-label="pagina actual"
										key={pageNumber}
										onClick={() => handlePageClick(pageNumber)}
									>
										{pageNumber}
									</button>
								);
							})}

							{currentPage < totalPages && pageInfo.hasNextPage && (
								<button
									className="pagination__next"
									type="button"
									aria-label="siguiente"
									onClick={handleNextPage}
								>
									Siguiente
								</button>
							)}
						</div>
					</Container>
				</section>
			</Main>
			<Footer
				themeGeneralSettings={themeGeneralSettings}
				menuItemsMain={footerMenuMain}
				menuItems={footerMenu}
			/>
		</>
	);
}

BlogPage.variables = ({ databaseId }, ctx) => {
	return {
		databaseId,
		headerLocation: MENUS.PRIMARY_LOCATION,
		footerLocationMain: MENUS.FOOTER_LOCATION_MAIN,
		footerLocation: MENUS.FOOTER_LOCATION,
		asPreview: ctx?.asPreview,
	};
};

BlogPage.query = gql`
	${BlogInfoFragment}
	${NavigationMenu.fragments.entry}
	${FeaturedImage.fragments.entry}
	query GetPageData(
		$databaseId: ID!
		$headerLocation: MenuLocationEnum
		$footerLocationMain: MenuLocationEnum
		$footerLocation: MenuLocationEnum
		$asPreview: Boolean = false
	) {
		page(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
			title
			content
			...FeaturedImageFragment
			paginaBlog {
				mostrarcarusel
			}
			seo {
				title
				metaDesc
				canonical
				opengraphImage {
					mediaItemUrl
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
	}
`;
