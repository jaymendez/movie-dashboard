import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Breadcrumbs, Grid, Link } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
}));

const Header = () => {
	const classes = useStyles();

	return (
		<>
			<AppBar position="static" style={{ backgroundColor: "#1d1d1d", marginBottom: 35 }}>
				<Toolbar>
					<Grid container spacing={4}>
					<Grid item xs={2} />
						<Grid item xs={1}>
							<Link color="inherit" href="/movies/top"  style={{textDecoration: "none"}} >
								Popular Movies
							</Link>
						</Grid>
						<Grid item xs={1}>
							<Link color="inherit" href="/movies"  style={{textDecoration: "none"}} >
								Search Movies
							</Link>
						</Grid>
					</Grid>
				</Toolbar>
			</AppBar>
		</>
	)
}

export default Header
