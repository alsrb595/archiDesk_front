"use client";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: 'CustomFont';
        src: url('/fonts/establishRetrosansOTF.otf') format('opentype');
        font-weight: normal;
        font-style: normal;
        font-display: swap;
    }

    body {
        width: 100vw;
        height: 100vh;
        background: linear-gradient(0deg, #d7d2cc 0%, #444444 100%);
        padding: 80px 60px;
        margin: 0;
        box-sizing: border-box;
        font-family: 'CustomFont', sans-serif;
        overflow: hidden;
    }

    h1, h2, h3, h4, h5, h6, p, span, a, div {
        font-family: 'CustomFont', sans-serif;
    }
`;

export default GlobalStyle;
