import styled from 'styled-components'


const Icon = styled.span`
    font-size: 2rem;
    color: ${props => props.color ? props.color : 'black'};
    transition: color 0.3s;

    &:hover {
        color: ${props => props.hoverColor ? props.hoverColor : '#e5e5e5'};
    }

    &:visited {
        color: black;
    }
`

const GenericIcon = (props) => (
	<Icon color={props.color} hoverColor={props.hoverColor}>
		<a href={props.src}>
			<i className={props.iconName} aria-hidden="true"/>
		</a>
	</Icon>
)

export const LinkedIn = ({ src }) => (
	<GenericIcon
		hoverColor="#0077b5"
		iconName="fab fa-linkedin"
		src={src}
	/>
)

export const GitHub = ({ src }) => (
	<GenericIcon
		iconName="fab fa-github"
		src={src}
	/>
)

export const Email = ({ src }) => (
	<GenericIcon
		iconName="far fa-envelope"
		src={src}
	/>
)