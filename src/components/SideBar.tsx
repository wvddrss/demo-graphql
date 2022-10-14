import { Drawer, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { mainRoutes } from '../routes/AllRoutes'
import { useNavigate } from "react-router-dom";

export default function SideBar () {
	const navigate = useNavigate()
	return (
		<Drawer variant="permanent">
			<List component="nav" style={{paddingTop: 90}}>
				{mainRoutes.map(route => (
					<ListItemButton key={route.key} onClick={() => navigate(route.path)}>
						<ListItemIcon sx={{
							minWidth: 32,
						}}>
							{route.icon}
						</ListItemIcon>
						<ListItemText primary={route.label} />
					</ListItemButton>
				))}
			</List>
		</Drawer>
	)
}