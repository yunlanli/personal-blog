import Head from 'next/head'
import styled from 'styled-components'
import Layout from '../../components/layout'
import utilStyles from '../../styles/utils.module.css'
import { getSortedProjects } from '../../lib/projects'
import Project from '../../components/project'

const ProjectContainer = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-flow: row nowrap;

    & li {
        margin-right: 2em;
    }
`;

export async function getStaticProps() {
    const allProjectsData = getSortedProjects()
    return {
        props: {
            allProjectsData
        }
    }
}

export default function Portofolio({ allProjectsData }) {
    return (
        <Layout>
            <Head>
                <title>Personal Projects</title>
            </Head>
            <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
                <h2 className={utilStyles.headingLg}>Projects</h2>
                <ProjectContainer>
                    {allProjectsData.map(project => (
                        <li className={utilStyles.listItem} key={project.name}>
                            <Project info={project} />
                        </li>
                    ))}
                </ProjectContainer>
            </section>
        </Layout>
    )
}
