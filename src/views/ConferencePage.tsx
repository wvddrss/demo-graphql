import { Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import BaseView from "./BaseView";
import { useGetConferenceQuery } from '../lib/generated/gql/graphql'


type TParams = {
	id: string
}

export default function ConferencePage () {
	const {
		id
	} = useParams<TParams>()

	const navigate = useNavigate()

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

	return (
		<BaseView title={data?.conference?.name} back={true} onBackClick={onBackClick}>
			<Grid container spacing={3}>
				{/* Chart */}
				<Grid item xs={12} md={6} lg={6}>
					<Paper
						sx={{
							p: 2,
							display: 'flex',
							flexDirection: 'column',
						}}
					>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell>
										Talks
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{data?.conference?.talks?.map(talk => (
									<TableRow>
										<TableCell>
											{talk?.speakers?.map(speaker => speaker.name).join(',')}
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</Paper>
				</Grid>
				<Grid item xs={12} md={6} lg={6}>
					<Paper
						sx={{
							p: 2,
							display: 'flex',
							flexDirection: 'column',
						}}
					>
					</Paper>
				</Grid>
			</Grid>
		</BaseView>
	)
}