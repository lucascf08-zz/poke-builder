import withTheme from "@material-ui/styles/withTheme";
import styled from "styled-components";

export const StyledApp = withTheme(styled.div`
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  background: ${(props) => props.theme.palette.secondary.dark};
  height: 100vh;
  width: 100vw;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  .div-central {
    font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
      "Lucida Sans", Arial, sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: ${(props) => props.theme.palette.primary.light};
    width: 50%;
    height: 100%;
    gap: 1rem;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.12), 0px 2px 2px rgba(0, 0, 0, 0.24);
    padding-bottom: 1rem;
    .barra {
      background-color: ${(props) => props.theme.palette.secondary.main};
      color: ${(props) => props.theme.palette.primary.light};
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 3rem;
    }
  }
`);
