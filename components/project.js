import styled from 'styled-components'
import Date from '../components/date'
import { TagList } from './tags';

const Card = styled.div`
    width: 20rem;
    border-radius: .4rem;
    overflow: hidden;
    box-shadow: 0 3rem 6rem rgba(0, 0, 0, .1);
    cursor: pointer;

    &:hover {
        transform: translateY(-.5%);
        box-shadow: 0 4rem 8rem rgba(0, 0, 0, .2);
    }
`
const Thumbnail = styled.img`
    height: 35%;
    width: 100%;
    object-fit: cover;
`
const Content = styled.div`
    padding: 0 2em;
`

const Title = styled.h4`
    margin: 0;
    padding: .7em 0 0;
`

const GitHub = styled.a`
    display: inline;
    margin-left: .5em;
`;

const Logo = styled.img`
    display: inline-block;
    width: .8rem;

    &:hover {
        width: 1.1rem;
        transition: width .2s;
    }
`;

const Time = styled.span`
    display: inline-block;
    font-size: .9rem;
    font-weight: 600;
    line-height: 1.5em;
    margin: .5rem 0;
`

const Desc = styled.span`
    display: inline-block;
    font-size: .8rem;
    line-height: 1.5em;
`

const Explore = styled.div`
    font-size: 1rem;
    line-height: 3em;
    text-align: center;
    margin: 2rem 0;
    background-color: #e6ecff;
    color: #3363ff;

    a:hover {
        text-decoration: underline;
    }
`


export default function Project({ info }) {
    const {
        name,
        time: { start, end },
        description,
        thumbnail_url,
        tech_stack,
        github,
        website
    } = info;

    return (
        <Card>
            <Thumbnail src={thumbnail_url}/>
            <Content>
                <Title>
                    {name}
                    { github ? <GitHub href={github}>
                        <Logo src='/GitHub.png' />
                    </GitHub> : null }
                </Title>
                <Time>
                    <Date dateString={start} dateFormat='MMM yyyy'/>
                    {' - '}
                    { !end ? 'Present' : <Date dateString={end} dateFormat='MMM yyyy'/>}
                </Time>
                <TagList list={tech_stack} />
                <Desc>{description}</Desc>
                <Explore><a href={website}>Explore &rarr;</a></Explore>
            </Content>
        </Card>
    )
}
