import { gql } from "@apollo/client"
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, DialogProps, Select, MenuItem } from "@mui/material"
import { useFormik } from "formik"
import { MutationAddSpeakerToTalkArgs, useAddSpeakerToTalkMutation, useGetPersonsQuery, } from "../../lib/generated/gql/graphql"

interface IProps extends DialogProps {
	onAdded: (id: string) => void
	onCancel: () => void
	talkId: string
}

export default function AddSpeakerToTalkModal ({
	onAdded,
	onCancel,
	talkId,
	...props
}: IProps) {

	const {
		data
	} = useGetPersonsQuery()

	const [mutate, { loading }] = useAddSpeakerToTalkMutation({
		onCompleted: (data) => {
			if (data &&
				data.addSpeakerToTalk) {
				onAdded(data.addSpeakerToTalk?.id)
			}
		},
		update: (cache, result) => {
			cache.modify({
				fields: {
					talk(existingTalk = {}) {
						const newTalksRef = cache.writeFragment({
							data: {
								...result.data?.addSpeakerToTalk,
							},
							variables: {
								id: talkId
							},
							fragment: gql`
								fragment NewTalk on talk {
									id,
									title,
									summary,
									talkers {
										id
										name
									}
								}
							`
						})
						return {
							...existingTalk,
							...newTalksRef,
						}
					}
				}
			})
		}
	})

	const formik = useFormik<Omit<MutationAddSpeakerToTalkArgs, 'talkId'>>({
		initialValues: {
			speakerId: -1
		},
		onSubmit: (values) => {
			mutate({
				variables: {
					speakerId: values.speakerId,
					talkId: talkId
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
					<Select
						autoFocus
						margin="dense"
						id={'speakerId'}
						name={'speakerId'}
						label='Talks'
						value={formik.values.speakerId}
						onChange={formik.handleChange}
					>
						{data?.persons?.map(person => (
							<MenuItem key={person.id} value={person.id}>{person.name}</MenuItem>
						))}
					</Select>
				</DialogContent>
				<DialogActions>
					<Button onClick={onCancelHandler}>Cancel</Button>
					<Button type='submit' disabled={loading}>{loading ? 'Loading...' : 'Add'}</Button>
				</DialogActions>
			</form>
		</Dialog>
	)
}