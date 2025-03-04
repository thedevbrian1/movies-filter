import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("movies", "routes/movies/movies.tsx"),
  route("movies/:id", "routes/movies/movie.tsx"),
] satisfies RouteConfig;
