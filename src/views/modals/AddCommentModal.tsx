import { TextField, Dialog, DialogTitle, DialogContent, DialogActions, Button, DialogProps } from "@mui/material"
import { useFormik } from "formik"
import { InputComment, useAddCommentMutation } from "../../lib/generated/gql/graphql"

interface IProps extends DialogProps {
	onAdded: (id: string) => void
	onCancel: () => void
	talkId: string
}

type InputCommentWithoutTalkId = Omit<InputComment, 'talkId'>

const labels: Record<keyof InputCommentWithoutTalkId, string> = {
	comment: 'Comment',
	author: 'Author',
}

export default function AddTalkModal ({
	onAdded,
	onCancel,
	talkId,
	...props
}: IProps) {

	const [mutate, { loading }] = useAddCommentMutation({
		onCompleted: (data) => {
			if (data &&
				data.addComment) {
				onAdded(data.addComment?.id)
			}
		},
		// will be replaced by sockets
	})

	const formik = useFormik<InputCommentWithoutTalkId>({
		initialValues: {
			comment: 'OMG! Geweldig',
			author: 'Me',
		},
		onSubmit: (values) => {
			mutate({
				variables: {
					comment: {
						...values,
						talkId,
					}
				}
			})
		}
	})

	const onCancelHandler = () => {
		formik.resetForm()
		onCancel()
	}

	const generateTextFields = () => {
		return Object.keys(labels).map(field => (
			<TextField
				key={field}
				autoFocus
				margin="dense"
				id={field}
				name={field}
				label={labels[field as keyof InputCommentWithoutTalkId]}
				type="text"
				fullWidth
				onChange={formik.handleChange}
				value={formik.values[field as keyof InputCommentWithoutTalkId]}
				error={formik.touched[field as keyof InputCommentWithoutTalkId] && Boolean(formik.errors[field as keyof InputCommentWithoutTalkId])}
				helperText={formik.touched[field as keyof InputCommentWithoutTalkId] && formik.errors[field as keyof InputCommentWithoutTalkId]}
				variant="standard"
			/>
		))
	}

	return (
		<Dialog {...props} onClose={onCancel}>
			<DialogTitle>Add a new talk</DialogTitle>
			<form onSubmit={formik.handleSubmit}>
				<DialogContent>
					{generateTextFields()}
				</DialogContent>
				<DialogActions>
					<Button onClick={onCancelHandler}>Cancel</Button>
					<Button type='submit' disabled={loading}>{loading ? 'Loading...' : 'Add'}</Button>
				</DialogActions>
			</form>
		</Dialog>
	)
}