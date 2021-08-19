import styled from 'styled-components'
import { Content } from '../components/common'
import { Email, GitHub, LinkedIn } from '../components/icons'
import Layout from '../components/layout'
import More from '../components/links'


const About = () => (
    <section>
        <h2>
            Rising junior studying CS at <a href="https://www.columbia.edu">Columbia</a>,
            <> </>engineering manager at <a href="https://www.columbiaspectator.com">Columbia Daily Spectator</a>.
            <> </>Previously, data engineering intern at <a href="https://www.patsnap.com">PatSnap</a>
            <> </>and research assistant at <a href="https://www.cs.columbia.edu/irt/">IRT lab</a> at Columbia.
            <> </><a href="https://www.atlanticcollege.org">UWC AC</a> alumni, foodie and tennis enthusiast.
        </h2>
    </section>
)

const Contact = () => (
    <Icons>
        <LinkedIn src="https://www.linkedin.com/in/yunlanli"/>
        <GitHub src="https://github.com/yunlanli"/>
        <Email src="mailto:yl4387@columbia.edu"/>
    </Icons>
)

export default function Home() {
    return (
        <Layout>
            <Content>
                <About />
                <Contact />
            </Content>

            <More />
        </Layout>
    )
}

const Icons = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 1em;
`