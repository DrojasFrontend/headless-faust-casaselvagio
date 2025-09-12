import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
	return (
		<Html lang="es">
			<Head>
				{/* Favicon global como fallback */}
				<link rel="icon" href="/favicon.ico" />
				<meta name="theme-color" content="#2d5a27" />
			</Head>
			<body>
				<Main />
				<NextScript />
				<noscript
					dangerouslySetInnerHTML={{
						__html: `<iframe src="https://www.googletagmanager.com/ns.html?id=G-RWLWBFBZJL" height="0" width="0" style="display: none; visibility: hidden;" />`,
					}}
				/>
			</body>
		</Html>
	);
}
