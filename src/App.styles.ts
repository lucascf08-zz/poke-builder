import withTheme from "@material-ui/styles/withTheme";
import styled from "styled-components";
import itemFundo from "./assets/item-fundo.png";

export const StyledApp = withTheme(styled.div`
  background: ${(props) => props.theme.palette.primary.main};
  font-size: larger;

  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 10vw 30vw 10vw;
  gap: 1em;

  header {
    grid-column: 1 / span 5;
  }

  footer {
    grid-column: 1 / span 5;
    background: ${(props) => props.theme.palette.secondary.main};
    display: grid;
    align-items: center;
    grid-gap: 1rem;
    justify-content: center;
    grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
  }

  main {
    grid-column: 1 / span 3;
    align-items: center;
    justify-content: center;
    .select-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }

  aside {
    background: ${(props) => props.theme.palette.secondary.main};
    grid-column: span 2;
  }

  @media (max-width: 40rem) {
    main,
    aside {
      grid-column: 1 / span 5;
    }
  }
  .barra {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  .img-container {
    min-width: 20vh;
    img {
      width: 100%;
    }
    background: url(${itemFundo});
    border-radius: 1rem;
  }
`);

interface props {
  type: string;
}
export const StyledPokeContainer = withTheme(styled.div<props>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: url(${itemFundo});

  border-radius: 1rem;
  border-color: ${(props) =>
    props.type === "fire"
      ? "#FF8832"
      : props.type === "water"
      ? "#48C3CB"
      : props.type === "grass"
      ? "#74CB48"
      : "white"};
  border-style: solid;
  border-width: 4px;
  padding: 1rem 1rem;
  text-overflow: ellipsis;
`);
