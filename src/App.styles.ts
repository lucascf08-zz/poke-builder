import withTheme from "@material-ui/styles/withTheme";
import styled from "styled-components";
import itemFundo from "./assets/item-fundo.png";

export const StyledApp = withTheme(styled.div`
  background: ${(props) => props.theme.palette.primary.main};
  font-size: larger;
  height: 100vh;
  width: 100vw;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 10vw 30vw 10vw;
  gap: 1em;
  .header {
    width: 100%;
    position: sticky;
  }

  header {
    grid-column: 1 / span 5;
  }

  footer {
    grid-column: 1 / span 5;
  }
  main {
    grid-column: 1 / span 3;
    align-items: center;
    justify-content: center;
    .select-container {
      display: flex;
      flex-direction: column;
    }
  }

  aside {
    background: ${(props) => props.theme.palette.secondary.main};
    grid-column: span 2;
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

  .team-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(10rem, 10rem));
    grid-gap: 1rem;
    width: 100%;
    align-items: center;
    justify-content: center;
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
