import type { Route } from "./+types/home";
import { redirect } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Movies filter" },
    {
      name: "description",
      content: "Find your favourite movies and tv shows!",
    },
  ];
}

export async function loader() {
  return redirect("/movies");
}
