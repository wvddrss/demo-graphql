import { gql } from "@apollo/client"
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, DialogProps, Select, MenuItem, FormControl, InputLabel } from "@mui/material"
import { useFormik } from "formik"
import { MutationAddTalkToConferenceArgs, useAddTalkToConferenceMutation, useGetTalksQuery } from "../../lib/generated/gql/graphql"

interface IProps extends DialogProps {
	onAdded: (id: string) => void
	onCancel: () => void
	conferenceId: string
}

export default function AddTalkToConferenceModal ({
	onAdded,
	onCancel,
	conferenceId,
	...props
}: IProps) {

	const {
		data
	} = useGetTalksQuery()

	const [mutate, { loading }] = useAddTalkToConferenceMutation({
		onCompleted: (data) => {
			if (data &&
				data.addTalkToConference) {
				onAdded(data.addTalkToConference?.id)
			}
		},
		update: (cache, result) => {
			cache.modify({
				fields: {
					conference(existingConference = {}) {
						const newTalksRef = cache.writeFragment({
							data: {
								...result.data?.addTalkToConference,
							},
							variables: {
								id: conferenceId
							},
							fragment: gql`
								fragment NewConference on conference {
									id,
									title,
									summary,
									talks {
										id
										title
										summary
									}
								}
							`
						})
						return {
							...existingConference,
							talks: newTalksRef
						}
					}
				}
			})
		}
	})

	const formik = useFormik<Omit<MutationAddTalkToConferenceArgs, 'conferenceId'>>({
		initialValues: {
			talkId: ''
		},
		onSubmit: (values) => {
			mutate({
				variables: {
					conferenceId,
					talkId: values.talkId
				}
			})
		}
	})

	const onCancelHandler = () => {
		formik.resetForm()
		onCancel()
	}

	return (
		<Dialog {...props} onClose={onCancel}>
			<DialogTitle>Add a new talk</DialogTitle>
			<form onSubmit={formik.handleSubmit}>
				<DialogContent>
					<FormControl fullWidth>
						<InputLabel id='talkLabel'>Talk</InputLabel>
						<Select
							autoFocus
							margin="dense"
							id={'talkId'}
							name={'talkId'}
							label='Talks'
							value={formik.values.talkId}
							onChange={formik.handleChange}
						>
							{data?.talks?.map(talk => (
								<MenuItem key={talk.id} value={talk.id}>{talk.title}</MenuItem>
							))}
						</Select>
					</FormControl>
				</DialogContent>
				<DialogActions>
					<Button onClick={onCancelHandler}>Cancel</Button>
					<Button type='submit' disabled={loading}>{loading ? 'Loading...' : 'Add'}</Button>
				</DialogActions>
			</form>
		</Dialog>
	)
}