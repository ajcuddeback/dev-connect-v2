import { createGlobalStyle } from 'styled-components';

// fonts
import HindMadurai from '../fonts/HindMadurai-Regular.ttf';
import Philosopher from '../fonts/Philosopher-Regular.ttf';
import orientalTiles from '../images/oriental-tiles.png'

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
         /* background: #005bff; */
         /* background-image: url(${orientalTiles}); */
         
        background: linear-gradient( 0.25turn, #4765ab,  #28bad6);
        
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
        background: rgba(255,255,255,0.2);
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

    .disabled {
        opacity: 0;
        pointer-events: none;
    }

    .loader {
        border: 16px solid #f3f3f3;
        border-radius: 50%;
        border-top: 16px solid #3498db;
        width: 120px;
        height: 120px;
        -webkit-animation: spin 2s linear infinite; /* Safari */
        animation: spin 2s linear infinite;
    }

    /* Safari */
    @-webkit-keyframes spin {
    0% { -webkit-transform: rotate(0deg); }
    100% { -webkit-transform: rotate(360deg); }
    }

    @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
    }
    
`

export default GlobalStyle;