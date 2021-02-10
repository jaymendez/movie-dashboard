import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Box, Divider, Grid, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import MovieCard from '../MovieCard';
import { RepositoryFactory } from '../../api/repositories/RepositoryFactory';
import MomentUtils from '@date-io/moment';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import moment from "moment"

const Movie = RepositoryFactory.get("movie");

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		height: 140,
		width: 100,
	},
	control: {
		padding: theme.spacing(2),
	},
}));

const MoviesContainer = ({ }) => {
	const [movies, setMovies] = useState([]);
	const [selectedDate, handleDateChange] = useState(new Date("2015"));


	const classes = useStyles();

	const renderMovies = () => {
		return movies.length ? movies.map(el => <Grid data-testid="movie-card" xs={4} style={{ margin: "20px 0px" }}><MovieCard movie={el} /></Grid>) : renderSkeleton()
	};

	const renderSkeleton = () => {
		return (
			<>
				{[...Array(9).keys()].map(el => (
					<Grid xs={4} style={{ margin: "20px 0px" }}>
					<Box width={345} marginRight={0.5} my={5}>
						<Skeleton data-testid="skeleton-loader" variant="rect" width={345} height={140} />
						<Box pt={0.5}>
							<Skeleton />
							<Skeleton width="60%" />
						</Box>
					</Box>
				</Grid>
				))}
			</>
		)
	};

	const getMovies = async () => {
		setMovies([]);
		const options = {
			year: moment(selectedDate).format("YYYY"),
			limit: 15
		}
		const { data, status } = await Movie.getTopMovies({ options });
		if (status === 200) {
			setMovies(data);
		}
	}


	useEffect(() => {
		getMovies();
	}, []);

	useEffect(() => {
		getMovies();
	}, [selectedDate]);

	return (
		<>
			<Typography variant="h4" component="h1" style={{display: "inline-block", float: "left"}}>
				Top Movies
			</Typography>
			<MuiPickersUtilsProvider utils={MomentUtils}>
				<DatePicker
					inputVariant="outlined"
					views={["year"]}
					label="Year of release"
					value={selectedDate}
					onChange={handleDateChange}
					style={{ margin: 8, float: "right", paddingRight: 65 }}
				/>
			</MuiPickersUtilsProvider>
			<Grid container className={classes.root} spacing={1} justify="center" alignItems="center">
				{renderMovies()}
			</Grid>
		</>
	)


}

export default MoviesContainer
