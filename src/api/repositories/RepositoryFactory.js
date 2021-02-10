import MovieRepository from "./MovieRepository";

const repositories = {
	movie: MovieRepository,
};

export const RepositoryFactory = {
	get: (name) => repositories[name],
};
