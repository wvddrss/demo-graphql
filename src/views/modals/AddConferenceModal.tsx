import { Button, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle, TextField } from "@mui/material";
import { useFormik } from "formik";
import { InputConference, useAddConferenceMutation } from '../../lib/generated/gql/graphql'
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


const labels: Record<keyof InputConference, string> = {
	name: 'Name',
	city: 'City'
}

export function AddConferenceModal ({
	onAdded,
	onCancel,
	...props
}: IProps) {
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
				label={labels[field as keyof InputConference]}
				type="text"
				fullWidth
				onChange={formik.handleChange}
				value={formik.values[field as keyof InputConference]}
				error={formik.touched[field as keyof InputConference] && Boolean(formik.errors[field as keyof InputConference])}
				helperText={formik.touched[field as keyof InputConference] && formik.errors[field as keyof InputConference]}
				variant="standard"
			/>
		))
	}

	return (
		<Dialog {...props} onClose={onCancel}>
			<DialogTitle>Add a new conference</DialogTitle>
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