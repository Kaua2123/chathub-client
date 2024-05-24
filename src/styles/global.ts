import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    font-size: 62.5%; /* para uso da medida relativa "rem"  */
    scroll-behavior: smooth;
}

body {
    font-size: 1.7rem;
    line-height: 1.5;
    background-color: ${({ theme }) => theme.colors.darkBlue};
}

h1, h2, h3, h4, h5, h6 {
    font-family: 'Montserrat', sans-serif;
    color: ${({ theme }) => theme.colors.white};
}

h1 {
    font-size: 6rem;
}

h2 {
    font-size: 5rem;
}

h3 {
    font-size: 4rem;
}

h4 {
    font-size: 3.5rem;
}

h5 {
    font-size: 3rem;
}

h6 {
    font-size: 2.5rem;
}

a {
    text-decoration: none;
}


`;
