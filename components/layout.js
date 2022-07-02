import Head from 'next/head'
import useHeader from './header'


export const siteTitle = 'Yunlan Li'

export default function Layout({ children }) {
    const Header = useHeader()

    return (
        <>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <script src="https://kit.fontawesome.com/169dc53729.js" crossOrigin="anonymous" />
                <meta
                    name="description"
                    content="Learn how to build a personal website using Next.js"
                />
                <meta name="og:title" content={siteTitle} />
                <meta name="twitter:card" content="summary_large_image" />
                <title>{siteTitle}</title>
            </Head>

            {Header}
            <main>{children}</main>
        </>
    )
}