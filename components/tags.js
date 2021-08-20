import styled from 'styled-components'


const TAG2COLOR = {
    'C': 'white',
    'Docker': '#2496ED',
    'Firebase': '#F7C52A',
    'Java': '#E95420',
    'JavaScript': '#f7df1e',
    'JupyterHub': '#E46E2E',
    'Linux': '#E95420',
    'MySQL': '#61DBFB',
    'Nginx': '#28a528',
    'Node.js': '#28a528',
    'PostgreSQL': '#61DBFB',
    'Python': '#FFD343',
    'React.js': '#61DBFB'
}

export const Tag = ({ name }) => <TagContainer tagID={name}>{name}</TagContainer>;

export function TagList({ list }) {
        return (
            <List>
                {list.map((tag) => <Tag name={tag} key={tag}/>)}
            </List>
        )
}
    
const TagContainer = styled.div`
    font-size: .5rem;
    line-height: 1.8em;
    padding: 0 1em;
    color: ${props => TAG2COLOR[props.tagID]};
    background-color: #36454f;
    border-radius: 2em;
`

const List = styled.ul`
    list-style: none;
    padding: .5em 0 0;
    margin: 0;
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    gap: .25em .5em;
`
