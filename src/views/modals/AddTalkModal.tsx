import { gql } from "@apollo/client"
import { TextField, Dialog, DialogTitle, DialogContent, DialogActions, Button, DialogProps } from "@mui/material"
import { useFormik } from "formik"
import { InputTalk, useAddTalkMutation } from "../../lib/generated/gql/graphql"

interface IProps extends DialogProps {
	onAdded: (id: string) => void
	onCancel: () => void
}

const labels: Record<keyof InputTalk, string> = {
	title: 'Title',
	summary: 'Summary'
}

export default function AddTalkModal ({
	onAdded,
	onCancel,
	...props
}: IProps) {

	const [mutate, { loading }] = useAddTalkMutation({
		onCompleted: (data) => {
			if (data &&
				data.addTalk) {
				onAdded(data.addTalk?.id)
			}
		},
		update: (cache, result) => {
			cache.modify({
				fields: {
					talks(existingTalks = []) {
						const newTalkRef = cache.writeFragment({
							data: {
								...result.data?.addTalk,
								...formik.values,
							},
							fragment: gql`
								fragment NewTalk on talk {
									title,
									summary,
								}
							`
						})
						return [...existingTalks, newTalkRef]
					}
				}
			})
		}
	})

	const formik = useFormik<InputTalk>({
		initialValues: {
			title: 'Title of talk',
			summary: 'Lorem ipsum ;)....',
		},
		onSubmit: (values) => {
			mutate({
				variables: {
					talkInput: values
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
				label={labels[field as keyof InputTalk]}
				type="text"
				fullWidth
				onChange={formik.handleChange}
				value={formik.values[field as keyof InputTalk]}
				error={formik.touched[field as keyof InputTalk] && Boolean(formik.errors[field as keyof InputTalk])}
				helperText={formik.touched[field as keyof InputTalk] && formik.errors[field as keyof InputTalk]}
				variant="standard"
			/>
		))
	}

	return (
		<Dialog {...props} onClose={onCancel}>
			<DialogTitle>Add a new person</DialogTitle>
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