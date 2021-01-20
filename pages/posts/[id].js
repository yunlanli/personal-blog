import utilStyles from '../../styles/utils.module.css'
import Head from 'next/head'
import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Date from '../../components/date'
import unified from 'unified'
import markdown from 'remark-parse'
import { Code, Pre } from '../../components/code_block'
import remark2rehype from 'remark-rehype'
import rehypePrism from '../../lib/rehypePrism'
import rehype2react from 'rehype-react'

export async function getStaticPaths() {
    const paths = getAllPostIds();
    return {
        paths,
        fallback:false
    }
}

export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id);
    return {
        props: {
            postData
        }
    }
}

export default function Post({ postData }) {
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <article>
                <h1 className={utilStyles.headingXl}>{postData.title}</h1>
                <div className={utilStyles.lightText}>
                    <Date dateString={postData.date} />
                </div>
                {/* <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} /> */}
                {
                    unified()
                        .use(markdown)
                        .use(remark2rehype)
                        .use(rehypePrism)
                        .use(rehype2react, {
                            createElement: React.createElement,
                            components: {
                                pre: Pre,
                                code: Code
                            }
                        })
                        .processSync(postData.content).result
                }
            </article>
        </Layout>
    )
}
