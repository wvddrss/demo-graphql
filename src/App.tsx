import './App.css';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material';
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

function App() {
	return (
		<ApolloProvider client={client}>
			<ThemeProvider theme={muiTheme}>
				<CssBaseline />
				<Routes />
			</ThemeProvider>
		</ApolloProvider>
	);
}

export default App;
