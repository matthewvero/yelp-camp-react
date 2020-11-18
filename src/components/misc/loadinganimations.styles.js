import styled, {keyframes} from 'styled-components/macro'


const loading = keyframes`
0%{background-position:0% 50%}
100%{background-position:100% 50%}
`

export const Loader = styled.div`
      animation: ${loading} 7s linear infinite forwards;
      background: linear-gradient(270deg, ${props => props.theme.loadingDark}, ${props => props.theme.loadingLight}, ${props => props.theme.loadingDark}, ${props => props.theme.loadingLight});
      background-size: 300% 300%;
`

export const LoadingText = styled(Loader)`
      width: 90%;
      min-height: 10px;
      border-radius: 50px;
      margin: 5px 0;
`

export const LoadingImage = styled(Loader)`
      min-width: 100%;
      min-height: 70%;

`

