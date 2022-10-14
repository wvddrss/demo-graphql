import { Card, CardContent, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useGetCommentsQuery, useGetNewCommentsSubscription } from "../lib/generated/gql/graphql";
import BaseView from "./BaseView";

export default function CommentsPage () {
	const {
		data
	} = useGetCommentsQuery({
		
	})

	const {
		data: newComments
	} = useGetNewCommentsSubscription()

	let content

	console.log({ newComments })

	if (!data ||
		!data.comments ||
		data.comments.pageInfo.numberOfElements < 1) {
		content = <Typography variant='h5' color='GrayText'>No comments yet...</Typography>
	} else {
		content = (
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>
							Comment
						</TableCell>
						<TableCell>
							Posted on
						</TableCell>
						<TableCell>
							Author
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{newComments?.comments?.content?.map(comment => {
						console.log('comment', comment?.createdOn)
						if (comment) {
							return (
								<TableRow key={comment.id}>
									<TableCell>
										{comment?.comment}
									</TableCell>
									<TableCell>
										{comment?.createdOn.toString()}
									</TableCell>
									<TableCell>
										{comment?.author}
									</TableCell>
								</TableRow>
							)
						} else {
							return null
						}
					})}
					{data.comments.content?.map(comment => {
						console.log('comment', comment?.createdOn)
						if (comment) {
							return (
								<TableRow key={comment.id}>
									<TableCell>
										{comment?.comment}
									</TableCell>
									<TableCell>
										{comment?.createdOn.toString()}
									</TableCell>
									<TableCell>
										{comment?.author}
									</TableCell>
								</TableRow>
							)
						} else {
							return null
						}
					})}
				</TableBody>
			</Table>
		)
	}
	return (
		<BaseView title="Comments">
			<Card>
				<CardContent>
					{content}
				</CardContent>
			</Card>
		</BaseView>
	)
}