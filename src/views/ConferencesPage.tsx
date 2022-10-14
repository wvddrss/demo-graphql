import { CircularProgress, Fab, Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useGetConferencesQuery } from "../lib/generated/gql/graphql";
import BaseView from "./BaseView";
import AddIcon from '@mui/icons-material/Add'
import { AddConferenceModal } from "./modals/AddConferenceModal";
import { useState } from "react";


export default function ConferencesPage () {

	const [open, setOpen] = useState<boolean>(false)

	const {
		data,
		loading
	} = useGetConferencesQuery()
	
	const navigation = useNavigate()

	const getConferenceLink = (id: string) => {
		return `/conference/${id}`
	}

	let content: JSX.Element[] | JSX.Element = <TableRow><TableCell colSpan={3}>No conferences yet...</TableCell></TableRow>
	if (loading) {
		content = <TableRow><TableCell colSpan={3}><CircularProgress /></TableCell></TableRow>
	} else if (data &&
		data.conferences &&
		data.conferences.length > 0) {
		content = data.conferences.map(conference => (
			<TableRow key={conference.id}>
				<TableCell>
					<Link to={getConferenceLink(conference.id)}>
						{conference.name}
					</Link>
				</TableCell>
				<TableCell>
					{conference.city}
				</TableCell>
			</TableRow>
		))
	}

	const onOpenAddConferenceDialog = () => {
		setOpen(true)
	}

	const onAddedConference = (id: string) => {
		navigation(getConferenceLink(id))
		setOpen(false)
	}

	return (
		<BaseView title="Conferences">
			<Grid container spacing={3}>
				{/* Chart */}
				<Grid item xs={12} md={12} lg={12}>
					<Paper
						sx={{
							p: 2,
							display: 'flex',
							flexDirection: 'column',
							position: 'relative'
						}}
					>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell>
										Name
									</TableCell>
									<TableCell>
										Location
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{content}
							</TableBody>
						</Table>
						<Fab
							sx={{
								position: 'absolute',
								bottom: -24,
								right: -24,
							}}
							onClick={onOpenAddConferenceDialog}
							color="primary"
							aria-label="add">
							<AddIcon />
						</Fab>
					</Paper>
				</Grid>
				<AddConferenceModal
					open={open} onAdded={onAddedConference} onCancel={function (): void {
						setOpen(false)
					}}
				/>
			</Grid>
		</BaseView>
	)
}