import { Grid, Paper, Table, TableHead, TableRow, TableCell, TableBody, Fab, CircularProgress } from "@mui/material"
import BaseView from "./BaseView"
import AddPersonModal from "./modals/AddPersonModal"
import { useGetPersonsQuery } from '../lib/generated/gql/graphql'
import AddIcon from '@mui/icons-material/Add'
import { useState } from "react"

export default function PersonPage () {

	const {
		data,
		loading
	} = useGetPersonsQuery()

	const [open, setOpen] = useState<boolean>(false)

	const onOpenAddPersonModal = () => {
		setOpen(true)
	}

	let content: JSX.Element[] | JSX.Element = <TableRow><TableCell colSpan={3}>No people yet...</TableCell></TableRow>
	if (loading) {
		content =  <TableRow><TableCell colSpan={3}><CircularProgress /></TableCell></TableRow>
	} else if (data &&
		data.persons &&
		data.persons.length > 0) {
		content = data.persons.map(person => (
			<TableRow key={person.id}>
				<TableCell>
					{person.name}
				</TableCell>
				<TableCell>
					{person.githubAccount}
				</TableCell>
				<TableCell>
					{person.blog}
				</TableCell>
			</TableRow>
		))
	}

	const onAddedPerson = () => {
		setOpen(false)
	}

	const onCancel = () => {
		setOpen(false)
	}

	return (
		<BaseView title="Persons">
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
										Github account
									</TableCell>
									<TableCell>
										Blog
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
							onClick={onOpenAddPersonModal}
							color="primary"
							aria-label="add">
							<AddIcon />
						</Fab>
					</Paper>
				</Grid>
				<AddPersonModal
					open={open} onAdded={onAddedPerson} onCancel={onCancel}
				/>
			</Grid>
		</BaseView>
	)
}