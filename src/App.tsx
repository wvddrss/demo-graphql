import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { AppBar as MuiAppBar, AppBarProps, AppBarProps as MuiAppBarProps, Badge, Box, Container, CssBaseline, Divider, Drawer, Grid, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, styled, Toolbar, Typography } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import VideocamIcon from '@mui/icons-material/Videocam'
import Routes from './views/Routes';

const client = new ApolloClient({
	uri: 'http://localhost:8080/graphql',
	cache: new InMemoryCache(),
})


client
	.query({
		query: gql`
			query GetLocations {
				persons {
					id
					name
				}
			}
		`,
	})
	.then((result) => console.log(result));

const muiTheme = createTheme()

const drawerWidth: number = 240;


function App() {
	const [open, setOpen] = useState<boolean>(false)
	const toggleDrawer = () => {
		setOpen(!open)
	}
	return (
		<ApolloProvider client={client}>
			<ThemeProvider theme={muiTheme}>
				<CssBaseline />
				{/* <Drawer variant="permanent" open={open}>
					<Toolbar
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'flex-end',
							px: [1],
							width: drawerWidth,
						}}
					>
						<IconButton onClick={toggleDrawer}>
							<ChevronLeftIcon />
						</IconButton>
					</Toolbar>
					<Divider />
					<List component="nav">
						<ListItemButton>
							<ListItemIcon>
								<VideocamIcon />
							</ListItemIcon>
							<ListItemText primary="Conferences" />
						</ListItemButton>
					</List>
				</Drawer> */}
				<Routes />
			</ThemeProvider>
		</ApolloProvider>
	);
}

export default App;
