import { Button, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle, TextField } from "@mui/material";
import { useFormik } from "formik";
import { InputPerson, useAddPersonMutation } from '../../lib/generated/gql/graphql'
import { gql } from '@apollo/client'

interface IProps extends DialogProps {
	onAdded: (id: string) => void
	onCancel: () => void
}

const labels: Record<keyof InputPerson, string> = {
	name: 'Name',
	githubAccount: 'Github account',
	blog: 'Blog',
}

export default function AddPersonModal ({
	onAdded,
	onCancel,
	...props
}: IProps) {
	const [mutate, {
		loading
	}] = useAddPersonMutation({
		onCompleted: (data) => {
			if (data &&
				data.addPerson) {
				onAdded(data.addPerson?.id)
			}
		},
		update: (cache, result) => {
			cache.modify({
				fields: {
					persons(existingPersons = []) {
						const newPersonRef = cache.writeFragment({
							data: {
								...result.data?.addPerson,
								...formik.values,
							},
							fragment: gql`
								fragment NewPerson on person {
									name,
									blog,
									githubAccount,
								}
							`
						})
						return [...existingPersons, newPersonRef]
					}
				}
			})
		}
	})

	const formik = useFormik<InputPerson>({
		initialValues: {
			name: 'Dirk',
			blog: 'http://blog.url',
			githubAccount: 'dirkske',
		},
		onSubmit: (values) => {
			mutate({
				variables: {
					person: values
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
				label={labels[field as keyof InputPerson]}
				type="text"
				fullWidth
				onChange={formik.handleChange}
				value={formik.values[field as keyof InputPerson]}
				error={formik.touched[field as keyof InputPerson] && Boolean(formik.errors[field as keyof InputPerson])}
				helperText={formik.touched[field as keyof InputPerson] && formik.errors[field as keyof InputPerson]}
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