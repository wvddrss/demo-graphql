import { Card, CardContent, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect } from "react";
import { useGetCommentsQuery, GetNewCommentsDocument, GetCommentsQuery, GetNewCommentsSubscription } from "../lib/generated/gql/graphql";
import BaseView from "./BaseView";

export default function CommentsPage () {
	const {
		data,
		subscribeToMore
	} = useGetCommentsQuery()
	
	useEffect(() => {
		subscribeToMore <GetNewCommentsSubscription>({
			document: GetNewCommentsDocument,
			updateQuery: (prev, { subscriptionData }) => {
				if (!prev || !prev.comments || !prev.comments.content) return prev;
				const newCommentItem = subscriptionData.data.comments;
				let newContent = [...prev.comments.content]
				if (prev.comments.pageInfo.pageSize === prev.comments.pageInfo.numberOfElements) {
					newContent.splice(newContent.length, 1)
				}
				newContent.unshift(newCommentItem)
				const mergedWithOldData = {
					...prev,
					comments: {
						...prev.comments,
						content: newContent
					},
				} as GetCommentsQuery
				return mergedWithOldData as GetCommentsQuery;
			}
		})
	}, [subscribeToMore])

	let content

	const formatDate = (date: string | undefined | null) => {
		if (!date) {
			return null
		}
		return new Date(date.split('[')[0]).toLocaleTimeString()
	}

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
							Talk
						</TableCell>
						<TableCell>
							Author
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{data.comments.content?.map(comment => {
						console.log('comment', comment?.createdOn)
						if (comment) {
							return (
								<TableRow key={comment.id}>
									<TableCell>
										{comment?.comment}
									</TableCell>
									<TableCell>
										{formatDate(comment?.createdOn)}
									</TableCell>
									<TableCell>
										{comment?.talk.title.toString()}
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