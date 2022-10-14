
import { Camera, Mic, People } from '@mui/icons-material'
import ConferencePage from '../views/ConferencePage'
import ConferencesPage from '../views/ConferencesPage'
import PersonsPage from '../views/PersonsPage'
import TalksPage from '../views/TalksPage'

export const mainRoutes = [{
	key: 'conferences',
	path: '/conferences',
	label: 'Conferences',
	component: <ConferencesPage />,
	icon: <Camera />
}, {
	key: 'persons',
	path: '/persons',
	label: 'Persons',
	component: <PersonsPage />,
	icon: <People />
}, {
	key: 'talks',
	path: '/talks',
	label: 'Talks',
	component: <TalksPage />,
	icon: <Mic />
}]

const subRoutes = [{
	key: 'conferences',
	path: '/',
	component: <ConferencesPage />
}, {
	key: 'conference',
	path: '/conference/:id',
	component: <ConferencePage />
}]

const allRoutes = [...mainRoutes, ...subRoutes]
export default allRoutes