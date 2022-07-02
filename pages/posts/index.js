import Link from 'next/link'
import styled from 'styled-components'

import { dbxGetSortedPostsData } from '../../lib/posts'
import { Content, Link as StyledLink } from '../../components/common'
import Layout from '../../components/layout'
import Date from '../../components/date'


export async function getStaticProps() {
  const allPostsData = await dbxGetSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}

export default function Posts({ allPostsData }) {
  return (
    <Layout home>
      <Content>
        <section>
          <ul className="list">
            {allPostsData.map(({ id, date, title }) => (
              <li className="listItem" key={id}>
                <Link href={`/posts/${id}`}>
                  <StyledLink margin="0 0 .5em 0">{title}</StyledLink>
                </Link>
                <ArticleDate>
                  <Date dateString={date} />
                </ArticleDate>
              </li>
            ))}
          </ul>
        </section>
      </Content>
    </Layout>
  )
}

const ArticleDate = styled.small`
  display: block;
  color: #999;
  margin-top: .5em;
`
