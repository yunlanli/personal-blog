import React from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { Content } from './common'


const NAME = 'Yunlan Li'

const Header = styled.div`
	background-color: #e5e5e5;
`

function path2link(basePath, pathStr) {
	let component, link, key = Math.random()

	switch (pathStr) {
		// path separator component
		case '/':
			component = <React.Fragment key={key}>  /  </React.Fragment>
			break;
		// link to homepage
		case '~':
		case NAME:
			link = basePath + '/'
			component = <a key={key} className="path" href={link}>{pathStr}</a>
			break;
		// regular path link
		default:
			link = `${basePath}/${pathStr}`
			component = <a key={key} className="path" href={link}>{pathStr}</a>	
	}

	return component
}


function initPathComponents(basePath) {
	// base path: ~ / {NAME}
	let components = [
		path2link(basePath, '~'),
		path2link(basePath, '/'),
		path2link(basePath, NAME)
	]

	return components
}


export default function useHeader() {
	const { basePath, asPath: currPath, ...router} = useRouter()
	let paths = currPath.split('/').filter(path => path != '')
	let pathComponents = initPathComponents(basePath)
	let pathSeparator = path2link(basePath, '/')


	for (let i = 0; i < paths.length; i++) {
		const curr = paths[i]

		// skip empty strings
		if (curr) {
			let prevPath = paths.slice(0,i).join('/')
			prevPath = prevPath ? `${basePath}/${prevPath}` : basePath
			const component = path2link(prevPath, curr)

			pathComponents.push(pathSeparator)
			pathComponents.push(component)
		}
	}

	return (
		<Header>
			<Content paddingBottom>
				<h1>{pathComponents}</h1>
			</Content>
		</Header>
	)
}