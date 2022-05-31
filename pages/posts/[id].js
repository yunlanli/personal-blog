import React from 'react'
import Head from 'next/head'
import Script from 'next/script'
import {unified} from 'unified'
import rehypeParse from 'rehype-parse'
import rehype2react from 'rehype-react'
import markdown from 'remark-parse'
import remark2rehype from 'remark-rehype'
import { Code, Content, Pre } from '../../components/common'
import Date from '../../components/date'
import Layout from '../../components/layout'
import { dbxGetAllPostIds, dbxGetPostData } from '../../lib/posts'
import rehypePrism from '../../lib/rehypePrism'


export async function getStaticPaths() {
  const paths = await dbxGetAllPostIds();
  return {
    paths,
    fallback: 'blocking'
  }
}

export async function getStaticProps({ params }) {
  const postData = await dbxGetPostData(params.id);
  return {
    props: {
      postData
    }
  }
}

export function toReact(content, ext) {
  if (ext == 'md') {
    return unified()
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
      .processSync(content).result
  } else if (ext === 'html') {
    return unified()
      .use(rehypeParse)
      .use(rehype2react, {
        createElement: React.createElement,
        components: {
          pre: Pre,
          code: Code
        }
      })
      .processSync(content).result
  }
}

function TexMagic() {
  // renders Latex
  return (
    <>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js?config=TeX-AMS_HTML" />
    </>
  )
}

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>

      <TexMagic />

      <Content>
        <article>
          <h1 className="headingXl">{postData.title}</h1>
          <div className="lightText">
            <Date dateString={postData.date} />
          </div>
          { toReact(postData.content, postData.ext) }
        </article>
      </Content>
    </Layout>
  )
}
