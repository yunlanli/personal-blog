import styled from 'styled-components'
import { device } from '../lib/constants'


export const Code = styled.code`
    background-color: #eee;
`

export const Pre = styled.pre`
    background-color: #eee;
    border-left: 6px solid #00458b;
    font-size: 1rem;
    line-height: 1.4;
    margin: 0 0 24px;
    max-width: 100%;
    overflow: auto;
    padding: 24px;
    width: 100%;
`

export const Content = styled.div`
	margin: 0 auto;
	max-width: 74rem;

    @media (min-width: ${device.mobileMin}) {
        padding: ${
            props => props.paddingBottom ?
                "2rem 2rem;" :
            "2rem 2rem 0"
        };
    }
    @media (min-width: ${device.tabletMin}) {
        padding: ${
            props => props.paddingBottom ?
                "3rem 3rem;" :
            "3rem 3rem 0"
        };
    }
`
