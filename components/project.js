import styled from 'styled-components';
import Date from '../components/date';
import { device } from '../lib/constants';
import { TagList } from './tags';


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
    const exploreLink = website || github
    const margin = exploreLink ? 0 : '2rem'

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
                <Desc
                    marginBottom={margin}
                    dangerouslySetInnerHTML={{__html: description}}
                />
                {
                    exploreLink &&
                    <Explore><a href={exploreLink}>Explore &rarr;</a></Explore>
                }
            </Content>
        </Card>
    )
}

const Card = styled.div`
    width: 100%;
    border-radius: .4rem;
    overflow: hidden;
    box-shadow: 0 3rem 6rem rgba(0, 0, 0, .1);
    cursor: pointer;
    transition: transform 0.3s, box-shadow 0.3s;

    &:hover {
        transform: translateY(-.5%);
        box-shadow: 0 4rem 8rem rgba(0, 0, 0, .2);
    }
`
const Thumbnail = styled.img`
    width: 100%;

    @media (min-width: ${device.laptopMin}) {
        height: 200px;
        object-fit: fill;
    }
`
const Content = styled.div`
    padding: 0 2em;
`

const Title = styled.h3`
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

const Time = styled.h4`
    font-weight: 500;
    margin: .25rem 0;
`

const Desc = styled.p`
    font-size: .8rem;
    white-space: pre-wrap;
    margin-bottom: ${props => props.marginBottom || 0}
`

const Explore = styled.div`
    font-size: 1rem;
    line-height: 3em;
    text-align: center;
    margin: 1.5rem 0 2rem;
    border: 3px solid #e5e5e5;
    background-color: white;
    color: black;
    transition: background-color 0.3s, color 0.3s;

    &:hover {
        background-color: #e5e5e5;
        color: white;
    }

    a {
        text-decoration: none;
        transition: font-weight 0.3s;
        &:hover {
            font-weight: 1000;
        }
    }
`