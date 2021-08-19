import styled from 'styled-components'


const TAG2COLOR = {
    'React.js': '#61DBFB',
    'Java': '#E95420',
    'JavaScript': '#f7df1e',
    'Nginx': '#28a528',
    'Node.js': '#28a528',
    'Linux': '#E95420',
    'MySQL': '#00758f'
}

export const Tag = ({ name }) => <TagContainer tagID={name}>{name}</TagContainer>;

export function TagList({ list }) {
        return (
            <List>
                { list.map((tag) => <Tag name={tag} key={tag}/>) }
            </List>
        )
}
    
const TagContainer = styled.div`
    font-size: .5rem;
    line-height: 1.7em;
    padding: 0 1.5em;
    color: ${props => TAG2COLOR[props.tagID]};
    background-color: #36454f;
    border-radius: 2em;
`

const List = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-flow: row wrap;
    align-content: space-around;
    width: 100%;
    height: 2.5rem;
    padding-right: 2rem;
    margin-bottom: 1rem;

    div {
        margin-right: 1em;
    }
`