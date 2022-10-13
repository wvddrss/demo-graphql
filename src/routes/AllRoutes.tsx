
import ConferencePage from '../views/ConferencePage'
import ConferencesPage from '../views/ConferencesPage'

const routes = [{
	key: 'conferences',
	path: '/',
	component: <ConferencesPage />
}, {
	key: 'conference',
	path: '/conference/:id',
	component: <ConferencePage />
}]

export default routes