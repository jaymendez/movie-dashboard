import React, { useEffect, useState } from 'react'
import MaterialTable from 'material-table'
import MomentUtils from "@date-io/moment";
import { Accordion, AccordionDetails, AccordionSummary, Button, Checkbox, Chip, FormControl, Grid, InputLabel, ListItemText, makeStyles, MenuItem, Select, Typography } from '@material-ui/core';
import { RepositoryFactory } from '../../api/repositories/RepositoryFactory';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { StarRate } from '@material-ui/icons';
import "./index.css";
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import moment from "moment"

const Movie = RepositoryFactory.get("movie");

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 200,
	},
}));

const MovieTable = ({ }) => {
	const classes = useStyles();
	const [selectedDate, handleDateChange] = useState(new Date("2015"));
	const [movies, setMovies] = useState([]);
	const [genre, setGenre] = useState([]);
	const [options, setOptions] = useState([]);

	const getMovies = async () => {
		const options = {
			limit: 100,
		}
		const { data, status } = await Movie.getMovies({ options });
		if (status === 200) {
			const parse = data.map(el => {
				const { popularity, ...rest } = el;
				const genres = JSON.parse(el.genres);
				const g = genres.map(el => el.name);
				return {
					parsedGenres: g,
					popularity: parseInt(popularity, 10),
					rating: rest.vote_average * rest.vote_count,
					...rest
				}
			})
			setMovies(parse);
		}
	}

	const getGenres = () => {
		const genres = [];
		movies.map(el => {
			el.parsedGenres.map(e => {
				if (genres.indexOf(e) === -1) {
					genres.push(e);
				}
			})
		})
		setOptions(genres);
		console.log(genres);
	};

	const filterMovies = (movies) => {
		let filtered = movies;
		filtered = movies.filter(el => {
			// el.genre
			let pass = true;
			genre.map(g => {
				if (g) {
					if (el.parsedGenres.indexOf(g) === -1) {
						pass = false;
					}
				}
			})
			return pass === true;
		})
		console.log(filtered)
		filtered = filtered.filter(el => {
			return el.release_date.slice(0, 4) === moment(selectedDate).format("YYYY");
		})
		return filtered;
	}


	const handleChange = (e) => {
		setGenre(e.target.value);
	};

	useEffect(() => {
		getMovies();
	}, []);

	useEffect(() => {
		getGenres();
	}, [movies]);

	const columns = [
		{ title: 'Title', field: 'title' },
		{ title: 'Overview', field: 'overview' },
		{
			title: 'Genre', field: 'genres', render: ({ parsedGenres }) => {
				return <div className="chip-container">{parsedGenres.map(el => <Chip label={el} />)}</div>
			}
		},
		{ title: 'Release Date', field: 'release_date' },
		{
			title: 'Rating', field: 'vote_average', render: ({ vote_average }) => {
				return (<Grid container spacing={3}>
					<Grid item xs={1}>
						{vote_average}
					</Grid>
					<Grid item xs={1}>
						<StarRate />
					</Grid>
				</Grid>)
			}
		}
	];

	return (
		<>
			<Accordion style={{ margin: "20px 0px" }}>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
				>
					<Typography>Filter Movies</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<MuiPickersUtilsProvider utils={MomentUtils}>
						<DatePicker
							inputVariant="outlined"
							views={["year"]}
							label="Year of release"
							value={selectedDate}
							onChange={handleDateChange}
							style={{ margin: 8 }}
						/>
					</MuiPickersUtilsProvider>
					{/* <FormControl variant="outlined" className={classes.formControl}>
							<InputLabel id="demo-simple-select-outlined-label">Rating</InputLabel>
							<Select
								labelId="demo-simple-select-outlined-label"
								id="demo-simple-select-outlined"
								value={""}
								// onChange={}
								label="Rating"
							>
								<MenuItem value="">
									<em>None</em>
								</MenuItem>
								<MenuItem value={10}>Ten</MenuItem>
								<MenuItem value={20}>Twenty</MenuItem>
								<MenuItem value={30}>Thirty</MenuItem>
							</Select>
						</FormControl> */}
					<FormControl variant="outlined" className={classes.formControl}>
						<InputLabel id="demo-simple-select-outlined-label">Genre</InputLabel>
						<Select
							labelId="demo-simple-select-outlined-label"
							id="demo-simple-select-outlined"
							value={genre}
							onChange={handleChange}
							label="Genre"
							multiple
							renderValue={(selected) => selected.join(', ')}
						>
							{options.map(el => {
								return <MenuItem key={el} value={el}>
									<Checkbox checked={genre.indexOf(el) > -1} />
									<ListItemText primary={el} />
								</MenuItem>
							})}
						</Select>
					</FormControl>
					{/* <Button size="small" color="primary"  >
							Filter
						</Button> */}
				</AccordionDetails>
			</Accordion>
			<MaterialTable
				columns={columns}
				data={filterMovies(movies)}
				title="Movies"
			/>
		</>
	)
}

export default MovieTable
