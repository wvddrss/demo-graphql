import { Grid, Paper, Table, TableHead, TableRow, TableCell, TableBody, Fab, CircularProgress } from "@mui/material"
import BaseView from "./BaseView"
import { useGetTalksQuery } from '../lib/generated/gql/graphql'
import AddIcon from '@mui/icons-material/Add'
import { useState } from "react"
import AddTalkModal from "./modals/AddTalkModal"

export default function PersonPage () {

	const {
		data,
		loading
	} = useGetTalksQuery()

	const [open, setOpen] = useState<boolean>(false)

	const onOpenTalksModal = () => {
		setOpen(true)
	}

	let content: JSX.Element[] | JSX.Element = <TableRow><TableCell colSpan={3}>No talks yet...</TableCell></TableRow>
	if (loading) {
		content =  <TableRow><TableCell colSpan={3}><CircularProgress /></TableCell></TableRow>
	} else if (data &&
		data.talks &&
		data.talks.length > 0) {
		content = data.talks.map(talk => (
			<TableRow key={talk.id}>
				<TableCell>
					{talk.title}
				</TableCell>
				<TableCell>
					{talk.summary}
				</TableCell>
			</TableRow>
		))
	}

	const onAddedTalk = () => {
		setOpen(false)
	}

	const onCancel = () => {
		setOpen(false)
	}

	return (
		<BaseView title="Talks">
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
										Title
									</TableCell>
									<TableCell>
										Summary
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
							onClick={onOpenTalksModal}
							color="primary"
							aria-label="add">
							<AddIcon />
						</Fab>
					</Paper>
				</Grid>
				<AddTalkModal
					open={open} onAdded={onAddedTalk} onCancel={onCancel}
				/>
			</Grid>
		</BaseView>
	)
}