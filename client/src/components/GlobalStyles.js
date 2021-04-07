import { createGlobalStyle } from 'styled-components';

// fonts
import HindMadurai from '../fonts/HindMadurai-Regular.ttf';
import Philosopher from '../fonts/Philosopher-Regular.ttf';

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    html:focus-within {
        scroll-behavior: smooth;
    }

    @font-face {
        font-family: 'Hind Madurai';
        src: url(${HindMadurai}) format('truetype');
        font-style: normal;
        font-display: auto;
    }

    @font-face {
        font-family: 'Philosopher';
        src: url(${Philosopher}) format('truetype');
        font-style: normal;
        font-display: auto;
    }

    body {
        text-rendering: optimizeSpeed;
        min-height: 100vh;
        background: #005bff;
        background: linear-gradient( #090718,  #005bff);
    }

    button {
        cursor: pointer;
    }

    a {
        text-decoration: none;
        color: black;
    }

    ol, ul {
	    list-style: none;
    }

    h1 {
        font-size: 48px;
        font-family: 'Philosopher';
    }
    h2 {
        font-family: 'Philosopher';
        font-size: 36px;
    }
    p {
        font-size: 16px;
    }

    p,
    input,
    textarea,
    button,
    a {
        font-family: 'Hind Madurai';
    }
    input,
    textarea {
        padding: 5px;
        border-radius: 5px;
        outline: none;
        border: none;
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