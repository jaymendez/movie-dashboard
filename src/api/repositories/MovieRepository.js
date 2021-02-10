import Repository from "./Repository";

const resource = "/movies";

const getMovies = async ({options}) => {
	let query = `${resource}`;
	if (options.limit) {
		query = `${query}?limit=${options.limit}`;
	}
	const data = await Repository.get(query);
	return data;
};

const getTopMovies = async ({options}) => {
	let query = `${resource}/top`;
	if (options.year) {
		query = `${query}?year=${options.year}`;
	}
	if (options.limit) {
		query = `${query}&limit=${options.limit}`;
	}
	const data = await Repository.get(query);
	return data;
};

export default {
	getMovies,
	getTopMovies
};
