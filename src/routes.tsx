
import ConferencePage from './views/ConferencePage'
import ConferencesPage from './views/ConferencesPage'

const routes = [{
	key: 'conferences',
	path: '/conferences',
	component: <ConferencePage />
}, {
	key: 'conference',
	path: '/conference/:id',
	component: <ConferencePage />
}]

export default routes