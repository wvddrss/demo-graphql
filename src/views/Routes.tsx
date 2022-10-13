import {
  BrowserRouter as Router,
	Route,
	Routes
} from 'react-router-dom'
import routes from '../routes/AllRoutes'

export default function AllRoutes () {
	const routesJsx = routes.map(route => 
		<Route key={route.key} path={route.path} element={route.component} />
	)
	return (
		<Router>
			<Routes>{routesJsx}</Routes>
		</Router>
	)
}