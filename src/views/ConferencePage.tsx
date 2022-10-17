import { Fab, Grid, List, ListItem, ListItemButton, ListItemText, Paper, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import BaseView from "./BaseView";
import { useGetConferenceQuery } from '../lib/generated/gql/graphql'
import { useState } from "react";
import Talk from "./talks/Talk";
import AddIcon from '@mui/icons-material/Add'
import AddTalkToConferenceModal from './modals/AddTalkToConferenceModal'


type TParams = {
	id: string
}

export default function ConferencePage () {
	const {
		id
	} = useParams<TParams>()

	const navigate = useNavigate()

	const [activeTalk, setActiveTalk] = useState<string>()
	const [openDialog, setOpenDialog] = useState<boolean>(false)

	const {
		data
	} = useGetConferenceQuery({
		variables: {
			id: id
		}
	})

	const onBackClick = () => {
		navigate('/')
	}

	const onSelectTalk = (id: string) => {
		setActiveTalk(id)
	}

	const renderTalks = () => {
		if (data &&
			data.conference &&
			data.conference.talks) {
			const {
				talks
			} = data.conference
			return (
				<List>
					{talks.map(talk => (
						<ListItem key={talk.id} alignItems='flex-start'	onClick={() => onSelectTalk(talk.id)}>
							<ListItemButton selected={talk.id === activeTalk}>
								<ListItemText primary={talk.title} />
							</ListItemButton>
						</ListItem>
					))}
				</List>
			)
		}
		return undefined
	}

	const onOpenAddTalkToConferenceDialog = () => {
		setOpenDialog(!openDialog)
	}

	const onClose = () => {
		setOpenDialog(false)
	}

	return (
		<BaseView title={data?.conference?.name} back={true} onBackClick={onBackClick}>
			<Grid container spacing={3}>
				<Grid item xs={12} md={4} lg={4}>
					<Paper
						sx={{
							p: 2,
							display: 'flex',
							flexDirection: 'column',
							position: 'relative'
						}}
					>
						<Typography variant="h6">Talks</Typography>
						{renderTalks()}
						<Fab
							sx={{
								position: 'absolute',
								bottom: -24,
								right: -24,
							}}
							onClick={onOpenAddTalkToConferenceDialog}
							color="primary"
							aria-label="add">
							<AddIcon />
						</Fab>
					</Paper>
				</Grid>
				<Grid item xs={12} md={8} lg={8}>
					{
						!!activeTalk && (
							<Talk id={activeTalk} />
						)
					}
				</Grid>
				{data?.conference?.id && <AddTalkToConferenceModal onAdded={onClose} onCancel={onClose} conferenceId={data?.conference.id} open={openDialog} />}
			</Grid>
		</BaseView>
	)
}