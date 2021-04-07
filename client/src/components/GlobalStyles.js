import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    html:focus-within {
        scroll-behavior: smooth;
    }

    body {
        text-rendering: optimizeSpeed;
        min-height: 100vh;
        background: #151BC2;
        /* background: linear-gradient( #0f0718,  #151BC2); */
    }

    button {
        cursor: pointer;
    }

    a {
        text-decoration: none;
    }

    ol, ul {
	    list-style: none;
    }

    .glass-background,
    .glass-button {
        border: none;
        border-radius: 5px;
        background: rgba(255,255,255,0.35);
        backdrop-filter: blur(5px);
    }

    .glass-button {
        padding: .5rem 1rem;
        position: relative;
        top: 0;
    }
    .glass-button:hover {
        top: 3px;
    }
`

export default GlobalStyle;