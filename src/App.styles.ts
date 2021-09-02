import withTheme from "@material-ui/styles/withTheme";
import styled from "styled-components";
import itemFundo from "./assets/item-fundo.png";

export const StyledApp = withTheme(styled.div`
  background: ${(props) => props.theme.palette.primary.main};
  font-size: larger;
  height: 100vh;
  width: 100vw;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  gap: 2rem;
  .header {
    background: ${(props) => props.theme.palette.secondary.main};
    color: ${(props) => props.theme.palette.primary.light};
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.12), 0px 2px 2px rgba(0, 0, 0, 0.24);
    width: 100%;
    position: sticky;
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
