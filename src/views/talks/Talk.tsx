import { Button, Divider, Modal, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { useGetTalkQuery } from "../../lib/generated/gql/graphql";
import AddCommentModal from "../modals/AddCommentModal";

interface IProps {
	id: string
}

export default function Talk ({
	id
}: IProps) {
	const [open, setOpen] = useState<boolean>(false)
	const {
		data
	} = useGetTalkQuery({
		variables: {
			id,
		}
	})
	if (!data) {
		return null
	}
	const onAddComment = () => {
		setOpen(true)
	}
	return (
		<Paper
			sx={{
				p: 2,
				display: 'flex',
				flexDirection: 'column',
			}}
		>
			<Typography variant='h6'>
				{data && data.talk && data.talk.title}
			</Typography>
			<Typography variant='body1'>
				{data && data.talk && data.talk.summary}
			</Typography>
			<Divider />
			<Button onClick={onAddComment}>
				Add comment
			</Button>
			{data.talk.id && <AddCommentModal open={open} talkId={data.talk.id} onAdded={() => setOpen(false)} onCancel={() => setOpen(false)} />}
		</Paper>
	)
}