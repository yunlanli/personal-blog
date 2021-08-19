import Head from 'next/head'
import rehype2react from 'rehype-react'
import markdown from 'remark-parse'
import remark2rehype from 'remark-rehype'
import unified from 'unified'
import { Code, Content, Pre } from '../../components/common'
import Date from '../../components/date'
import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import rehypePrism from '../../lib/rehypePrism'


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

            <Content>
                <article>
                    <h1 className="headingXl">{postData.title}</h1>
                    <div className="lightText">
                        <Date dateString={postData.date} />
                    </div>
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
            </Content>
        </Layout>
    )
}