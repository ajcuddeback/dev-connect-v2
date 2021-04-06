import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        min-height: 100vh;
        background: linear-gradient( #0f0718,  #151BC2);
    }

    .glass-background {
        border: none;
        border-radius: 5px;
        background: rgba(255,255,255,0.35);
        backdrop-filter: blur(5px);
    }
`

export default GlobalStyle;