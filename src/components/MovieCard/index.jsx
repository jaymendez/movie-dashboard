import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
	root: {
		maxWidth: 345,
	},
	media: {
		height: 140,
	},
	overflow: {
		whiteSpace: "pre-wrap",
		overflow: "hidden",
		textOverflow: "ellipsis",
		height: 100,
		display: "block"
	}
});


const MovieCard = ({ movie }) => {
	console.log(movie)
	const classes = useStyles();
	return (
		<Card className={classes.root}>
			<CardActionArea>
				<CardMedia
					className={classes.media}
					image={`${window.location.origin}/film.png`}
					title="Contemplative Reptile"
				/>
				<CardContent style={{}}>
					<Typography gutterBottom variant="h5" component="h2">
						{movie.title}
          </Typography>
					<Typography variant="body2" color="textSecondary" component="p" className={classes.overflow}>
						{movie.overview}
          </Typography>
				</CardContent>
			</CardActionArea>
			<CardActions>
				{/* <Button size="small" color="primary">
					
        </Button> */}
				<Button size="small" color="primary" href={movie.homepage}>
					Watch now
        </Button>
			</CardActions>
		</Card>
	)
}

export default MovieCard;
