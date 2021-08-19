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
                <meta
                    property="og:image"
                    content={`https://og-image.now.sh/${encodeURI(
                        siteTitle
                    )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
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