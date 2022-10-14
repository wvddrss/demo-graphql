import {
	BrowserRouter as Router,
	Navigate,
	Route,
	Routes,
} from 'react-router-dom'
import routes from '../routes/AllRoutes'

export default function AllRoutes () {
	const routesJsx = routes.map(route => 
		<Route key={route.key} path={route.path} element={route.component} />
	)
	const routesJsxWithRedirect = [
		<Route key={'index'} path={'/'} element={<Navigate to='/conferences' replace={true}	/>} />,
		...routesJsx,
	]
	return (
		<Router>
			<Routes>{routesJsxWithRedirect}</Routes>
		</Router>
	)
}