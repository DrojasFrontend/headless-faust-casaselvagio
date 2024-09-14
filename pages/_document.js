import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
	render() {
		return (
			<Html>
				<Head />
				<Main />
				<NextScript />
				<noscript
					dangerouslySetInnerHTML={{
						__html: `<iframe src="https://www.googletagmanager.com/ns.html?id=G-RWLWBFBZJL" height="0" width="0" style="display: none; visibility: hidden;" />`,
					}}
				/>
			</Html>
		);
	}
}

export default MyDocument;
