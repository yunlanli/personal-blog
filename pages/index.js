import styled from 'styled-components'
import { Content, Link } from '../components/common'
import { useWindowSize } from '../components/hooks'
import { Email, GitHub, LinkedIn } from '../components/icons'
import Layout from '../components/layout'
import More from '../components/links'
import { device } from '../lib/constants'


const About = ({ windowSize }) => {
    const info = (
        <>
            Hi There!, I'm a recent graduate from <Link href="https://www.columbia.edu">Columbia</Link>.
            <> </>My interests lie in full-stack development and distributed systems.<br/><br/>

            Previously, systems engineer intern at <Link href="https://www.servicenow.com/">ServiceNow</Link>,
            <> </>engineering manager at <Link href="https://www.columbiaspectator.com">Columbia Daily Spectator</Link>,
            <> </>data engineering intern at <Link href="https://www.patsnap.com">PatSnap</Link>
            <> </>and research assistant at <Link href="https://www.cs.columbia.edu/irt/">IRT lab</Link> at Columbia.
        </>
    )
    const windowWidth = windowSize.width
    const mobileMaxWidth = device.mobileMax.slice(0, -2)

    return windowWidth < mobileMaxWidth ?
        (
            <section>
                <h3>{info}</h3>
            </section>
        ) : (
            <section>
                <h2>{info}</h2>
            </section>
        )
}

const Contact = () => (
    <Icons>
        <LinkedIn src="https://www.linkedin.com/in/yunlanli"/>
        <GitHub src="https://github.com/yunlanli"/>
        <Email src="mailto:yl4387@columbia.edu"/>
    </Icons>
)

export default function Home() {
    const windowSize = useWindowSize()

    return (
        <Layout>
            <Content lineHeight="1.75em">
                <About windowSize={windowSize}/>
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
