import styled from 'styled-components'
import { Content } from '../../components/common'
import Layout from '../../components/layout'
import Project from '../../components/project'
import { device } from '../../lib/constants'
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
                            <ListItem key={project.name}>
                                <Project info={project} />
                            </ListItem>
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

    & li {
        margin-bottom: 4rem;
    }

    /* for screens smaller than min of latptop */
    flex-direction: column;

    @media (min-width: ${device.laptopMin}) {
        flex-flow: row wrap;    
        justify-content: space-around;
    }
`;

const ListItem = styled.li`
    margin: 0 0 1.25rem;
    /* for screens smaller than min of latptop */
    width: 100%;
    flex-direction: column;

    @media (min-width: ${device.laptopMin}) {
        width: 20rem;
        flex-flow: row wrap;    
        gap: 2rem;
    }
`