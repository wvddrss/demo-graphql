import { gql } from "@apollo/client"
import { TextField, Dialog, DialogTitle, DialogContent, DialogActions, Button, DialogProps } from "@mui/material"
import { useFormik } from "formik"
import { InputComment, useAddCommentMutation } from "../../lib/generated/gql/graphql"

interface IProps extends DialogProps {
	onAdded: (id: string) => void
	onCancel: () => void
	talkId: string
}

const labels: Record<keyof InputComment, string> = {
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

	const formik = useFormik<Omit<InputComment, 'talkId'>>({
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
				label={labels[field as keyof InputComment]}
				type="text"
				fullWidth
				onChange={formik.handleChange}
				value={formik.values[field as keyof InputComment]}
				error={formik.touched[field as keyof InputComment] && Boolean(formik.errors[field as keyof InputComment])}
				helperText={formik.touched[field as keyof InputComment] && formik.errors[field as keyof InputComment]}
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