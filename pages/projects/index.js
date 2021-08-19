import styled from 'styled-components'
import { Content } from '../../components/common'
import Layout from '../../components/layout'
import Project from '../../components/project'
import { getSortedProjects } from '../../lib/projects'


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
            <Content>
                <section>
                    <ProjectContainer>
                        {allProjectsData.map(project => (
                            <li className="listItem" key={project.name}>
                                <Project info={project} />
                            </li>
                        ))}
                    </ProjectContainer>
                </section>
            </Content>
        </Layout>
    )
}

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