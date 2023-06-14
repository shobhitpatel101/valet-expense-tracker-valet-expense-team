import React from 'react'
import { ThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core/styles';

function MuiThemeProvider(props) {
  return (
    <ThemeProvider theme={props.theme}>{props.children}</ThemeProvider>
  )
}

export default MuiThemeProvider