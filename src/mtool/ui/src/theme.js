/*
 *   BSD LICENSE
 *   Copyright (c) 2021 Samsung Electronics Corporation
 *   All rights reserved.
 *
 *   Redistribution and use in source and binary forms, with or without
 *   modification, are permitted provided that the following conditions
 *   are met:
 *
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in
 *       the documentation and/or other materials provided with the
 *       distribution.
 *     * Neither the name of Samsung Electronics Corporation nor the names of its
 *       contributors may be used to endorse or promote products derived
 *       from this software without specific prior written permission.
 *
 *   THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 *   "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 *   LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 *   A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 *   OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 *   SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 *   LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 *   DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 *   THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 *   (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 *   OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import { createTheme } from "@material-ui/core/styles";

export const customTheme = {
  palette: {
    primary: {
      light: '#788595',
      main: '#484E57',
      dark: '#171719',
      contrastText: '#fff'
    },
    secondary: {
      light: '#c9d0d9',
      main: '#4c6380',
      dark: '#334763',
      contrastText: '#fff'
    },
    error: {
      main: '#FF3603',
      dark: "#CD2C16"
    },
    warning: {
      light: '#FFC603',
      main: '#FF9603',
      dark: '#c2520d'
    },
    success: {
      light: "#55F603",
      main: "#55C603",
      dark: '#177b01',
    },
    palette: {
      type: 'dark',
    },
  },
  table: {
    header: {
      backgroundColor: "#4c6380",
      color: "white",
      fontSize: 14,
      flexDirection: 'row'
    }
  },
  tab: {
    selected: {
      color: '#212225',
      borderBottom: `2px solid #212225`,
      fontWeight: 600
    }
  },
  typography: {
    fontFamily: 'Arial',
    fontSize: 14
  },
  page: {
    title: {
      textAlign: 'left',
      fontSize: 16,
      fontWeight: 'bold',
      color: '#424850'
    }
  },
  card: {
    header: {
      textAlign: 'left',
      marginLeft: '24px',
      paddingTop: '8px',
      marginBottom: '5px',
      fontSize: 16,
      fontWeight: 'bold',
      color: '#424850'
    }
  },
  toolbar: {
    height: '55px'
  }
};

export const TableTheme = createTheme({
  typography: {
    fontSize: 14,
    fontFamily: 'Arial'
  },
  palette: {
    primary: {
      main: '#4caf50',
    },
    secondary: {
      main: 'rgba(0, 0, 0, 0.54)'
    },
  },
});

export const PageTheme = createTheme({
  ...customTheme,
  typography: {
    ...customTheme.typography,
    fontSize: 12
  }
})

const MToolTheme = createTheme(customTheme);
export default MToolTheme;
