
import { Camera, Mic, People, Comment } from '@mui/icons-material'
import CommentsPage from '../views/CommentsPage'
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
}, {
	key: 'comments',
	path: '/comments',
	label: 'Comments',
	component: <CommentsPage />,
	icon: <Comment />
}]

const subRoutes = [{
	key: 'conference',
	path: '/conference/:id',
	component: <ConferencePage />
}]

const allRoutes = [...mainRoutes, ...subRoutes]
export default allRoutes