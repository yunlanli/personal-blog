import Link from 'next/link'
import { getSortedPostsData } from '../../lib/posts'
import { Content } from '../../components/common'
import Layout from '../../components/layout'
import Date from '../../components/date'


export async function getStaticProps() {
    const allPostsData = getSortedPostsData()
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
                                    <a>{title}</a>
                                </Link>
                                <br />
                                <small className="lightText">
                                    <Date dateString={date} />
                                </small>
                            </li>
                        ))}
                    </ul>
                </section>
            </Content>
        </Layout>
    )
}