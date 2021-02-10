import React from "react";
import { render, cleanup } from "@testing-library/react";
import { Route, MemoryRouter } from "react-router-dom";
import MoviesContainer from "../index";

const renderWithRouterMatch = (ui, { path = "/", route = "/" } = {}) => {
	return render(
		<MemoryRouter initialEntries={[route]}>
			<Route path={path}>{ui}</Route>
		</MemoryRouter>,
	);
};

describe("Test case for Movies Container", () => {
	it("Check loading state", async () => {
		const { getAllByTestId } = renderWithRouterMatch(
			<MoviesContainer />,
			{ route: "/movies/top", path: "/movies/top" },
		);
		const text = await getAllByTestId("skeleton-loader");
		expect(text).toBeTruthy();
	});
});