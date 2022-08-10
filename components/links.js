import { useRouter } from 'next/router'
import styled from 'styled-components'
import { Content, Link } from './common'

const CvUrl = "https://www.dropbox.com/s/bg8dosvmk1ririn/Yunlan.Li.pdf?dl=0"

export function useLinks() {
	const { basePath, asPath, ...router } = useRouter()
	const pages = {
		"Projects": `${basePath}/projects`,
		"Blog": `${basePath}/posts`,
		"CV": `${CvUrl}`
	}

  return (
      <Container>
	  	{
			Object.entries(pages).map(([text, href]) => (
				(`${basePath}/${asPath}` != href) && <Link href={href}>{text}</Link>
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

const Container = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	gap: 1em 1.5em;
	font-size: 1.1em;
	font-weight: 700;
	line-height: 1.5em;
`
