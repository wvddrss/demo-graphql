import { ChevronLeft } from '@mui/icons-material';
import { AppBar as MuiAppBar, AppBarProps, Box, Container, Grid, IconButton, styled, Toolbar, Typography } from '@mui/material';
import SideBar from '../components/SideBar';

const AppBar = styled(MuiAppBar)<AppBarProps>(({ theme }) => ({
	zIndex: theme.zIndex.drawer + 1,
}))

interface IProps {
	title?: string
	children: JSX.Element
	back?: boolean
	onBackClick?: () => void
}

export default function BaseView ({
	title,
	children,
	back,
	onBackClick,
}: IProps) {
	return (
		<>
			<SideBar />
			<AppBar position="absolute">
				<Toolbar
					sx={{
						pr: '24px', // keep right padding when drawer closed
					}}
				>
					{
						back &&
						<IconButton
							edge="start"
							color="inherit"
							aria-label="open drawer"
							onClick={onBackClick}
						>
							<ChevronLeft />
						</IconButton>
					}
					<Typography
						component="h1"
						variant="h6"
						color="inherit"
						noWrap
						sx={{ flexGrow: 1 }}
					>
						{title}
					</Typography>
				</Toolbar>
			</AppBar>
			<Box
				component="main"
				sx={{
					backgroundColor: (theme) =>
						theme.palette.mode === 'light'
							? theme.palette.grey[100]
							: theme.palette.grey[900],
					flexGrow: 1,
					height: '100vh',
					overflow: 'auto',
				}}
			>
				<Toolbar />
					<Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
						<Grid container spacing={3}>
							{/* Chart */}
							<Grid item xs={12} md={12} lg={12}>
								{children}
							</Grid>
						</Grid>
					</Container>
			</Box>
		</>
	)
}