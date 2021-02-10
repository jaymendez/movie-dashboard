import './App.css';
import MovieTable from './components/MovieTable';
import { Switch, Route, } from "react-router-dom";
import MoviesContainer from './components/MoviesContainer';
import { Container } from '@material-ui/core';
import Layout from './components/Layout';


function App() {

	return (
		<div className="App">
		<Layout>
			<Container maxWidth="lg">
					<Switch>
						<Route exact path="/movies/top" >
							<MoviesContainer />
						</Route>
						<Route exact path="/movies" >
							<MovieTable />
						</Route>
					</Switch>
			</Container>
				</Layout>
		</div>
	);
}

export default App;
