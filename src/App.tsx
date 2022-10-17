import './App.css';
import { ApolloClient, InMemoryCache, ApolloProvider, split, HttpLink } from '@apollo/client';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material';
import Routes from './views/Routes';
import { WebSocketLink } from '@apollo/client/link/ws'
import { SubscriptionClient } from 'subscriptions-transport-ws'
import { getMainDefinition } from '@apollo/client/utilities';

const httpLink = new HttpLink({
	uri: 'http://localhost:8080/graphql',
});

const wsLink = new WebSocketLink(
	new SubscriptionClient("ws://localhost:8080/subscriptions")
);
const splitLink = split(
	({ query }) => {
		const definition = getMainDefinition(query);
		return (
			definition.kind === 'OperationDefinition' &&
			definition.operation === 'subscription'
		);
	},
	wsLink,
	httpLink
)

const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: splitLink
})

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
