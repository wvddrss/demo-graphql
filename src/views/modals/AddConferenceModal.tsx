import { Button, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useAddConferenceMutation } from '../../lib/generated/gql/graphql'
import * as yup from 'yup'
import { gql } from '@apollo/client'

interface IProps extends DialogProps {
	onAdded: (id: string) => void
	onCancel: () => void
}

const validationSchema = yup.object({
	name: yup.string().required('Name is required'),
	city: yup.string().required('City is required'),
})

export function AddConferenceModal ({
	onAdded,
	onCancel,
	...props
}: IProps) {
	const formik = useFormik({
		initialValues: {
			name: 'Conference name',
			city: 'Bissegem'
		},
		validationSchema,
		onSubmit: (values) => {
			mutate({
				variables: values
			})
		}
	})
	const [mutate, {
		loading
	}] = useAddConferenceMutation({
		onCompleted: (data) => {
			if (data &&
				data.addConference) {
				onAdded(data.addConference?.id)
			}
		},
		update: (cache, result) => {
			cache.modify({
				fields: {
					conferences(existingConferences = []) {
						const newConferenceRef = cache.writeFragment({
							data: {
								...result.data?.addConference,
								...formik.values,
							},
							fragment: gql`
								fragment NewConference on conference {
									name,
									city
								}
							`
						})
						return [...existingConferences, newConferenceRef]
					}
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
			<DialogTitle>Add a new conference</DialogTitle>
			<form onSubmit={formik.handleSubmit}>
				<DialogContent>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						name="name"
						label="Name"
						type="text"
						fullWidth
						onChange={formik.handleChange}
						value={formik.values.name}
						error={formik.touched.name && Boolean(formik.errors.name)}
						helperText={formik.touched.name && formik.errors.name}
						variant="standard"
					/>
					<TextField
						autoFocus
						margin="dense"
						id="city"
						name="city"
						label="City"
						type="text"
						fullWidth
						value={formik.values.city}
						onChange={formik.handleChange}
						error={formik.touched.city && Boolean(formik.errors.city)}
						helperText={formik.touched.city && formik.errors.city}
						variant="standard"
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={onCancelHandler}>Cancel</Button>
					<Button type='submit' disabled={loading}>{loading ? 'Loading...' : 'Add'}</Button>
				</DialogActions>
			</form>
		</Dialog>
	)
} 