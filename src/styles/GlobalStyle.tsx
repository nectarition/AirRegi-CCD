import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
html, body, #root {
  height: 100%;
  background-color: #111;
  font-family: sans-serif;

  @media screen and (max-height: 420px) {
    font-size: 12px;
  }
}

h1, h2, h3, h4, h5, h6 {
  font-weight: 700;
}
h1 { font-size: 2em; }
h2 { font-size: 1.75em; }
h3 { font-size: 1.5em; }
h4 { font-size: 1.25em; }
h5 { font-size: 1em; }
h6 { font-size: 0.9em; }

a {
  color: #000000;
}

p {
  font-size: 1em;
}
`

export default GlobalStyle
