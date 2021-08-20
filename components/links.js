import { useRouter } from 'next/router'
import styled from 'styled-components'
import { Content } from './common'


export function useLinks() {
	const { basePath, asPath, ...router } = useRouter()
	const pages = {
		"Projects": `${basePath}/projects`,
		"Blog": `${basePath}/posts`,
		"CV": `${basePath}/cv`
	}

  return (
      <Container>
	  	{
			Object.entries(pages).map(([text, href]) => (
				`${basePath}/${asPath}` != href &&
				<Button key={href}>
					<a href={href}>{text}</a>
				</Button>
			))
		}
      </Container>
  );
}

export default function More() {
	const Links = useLinks()

	return (
		<Content>
			<section>
				<h2>More About Me @</h2>
				{Links}
			</section>
		</Content>
	)
}

const Button = styled.button`
	min-width: 8em;
	padding: .5rem 0;
	border: 3px solid #e5e5e5;
	color: black;
	text-align: center;
	background-color: white;
	transition: background-color 0.3s, color 0.3s;

	&:hover {
		color: white;
		background-color: #e5e5e5;
	}

  	a {
		text-decoration: none;
		color: inherit;
		font-size: .9rem;
		font-weight: 600;

		&:hover { color: inherit; }
  	}
`;

const Container = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	gap: 2em;
`