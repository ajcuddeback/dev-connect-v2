import { createGlobalStyle } from "styled-components";

// fonts
import HindMadurai from "../fonts/HindMadurai-Regular.ttf";
import Philosopher from "../fonts/Philosopher-Regular.ttf";
import orientalTiles from "../images/oriental-tiles.png";

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

    ::-webkit-scrollbar {
        width: 7px;
    }
    /* Track */
    ::-webkit-scrollbar-track {
    background:  linear-gradient( #4765ab,  #28bad6); 
    }
    
    /* Handle */
    ::-webkit-scrollbar-thumb {
    background:#f05454; 
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
    background: #eb2222; 
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



    .container {
        text-align: center;
        padding: 4px;
    }

    textarea.form-input {
        margin-top: 10px;
        height: 50px;
        width: 300px;
    }

    .questionFormContainer {
        margin: 0 auto;
        padding: 10px 15px;
        max-width: 500px;
    }

    .questionCardContainer {
        display: flex;
        justify-content: center;
        flex-direction: column;
        margin: 0 auto 10px;
        border: none;
        border-radius: 5px;
        background: rgba(255,255,255,0.2);
        backdrop-filter: blur(5px);
        padding: 10px 15px;
        max-width: 80%;
        min-height: 25px;
    }

    .questionList {
        margin-top: 25px;
    }

    .questionHeaderDiv {
        margin: 5px auto;
    }

    .questionDiv {
        margin: 0 auto;
    }

    .answerDiv {
        margin: 0 auto;
    }

    .questionListTitle {
        margin-bottom: 25px;
        text-align: center;
    }

    .eachAnswer {
        margin: 0 auto 10px;
        padding: 10px 15px;
        max-width: 70%;
        border: none;
        border-radius: 5px;
        background: rgba(255,255,255,0.2);
        backdrop-filter: blur(5px);
    }

    .answerInfoWrapper {

    }

    .characterCount {
        margin-top: 25px;
    }

    .questionBtn {
        display: flex;
        margin-left: 42%;
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
    
`;

export default GlobalStyle;
