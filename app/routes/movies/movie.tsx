import { data, isRouteErrorResponse, Link, useNavigate } from "react-router";
import type { Route } from "./+types/movie";
import { ArrowLeft, RotateCcw, Star } from "lucide-react";
import { Button } from "~/components/ui/button";

export function headers({ loaderHeaders }: Route.HeadersArgs) {
  return {
    "Cache-Control": loaderHeaders.get("Cache-Control"),
  };
}

export async function loader({ params }: Route.LoaderArgs) {
  let id = Number(params.id);
  let res = await fetch(`https://api.themoviedb.org/3/movie/${id}`, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_READ_API_KEY}`,
    },
  });

  let movie = await res.json();

  return data(movie, {
    headers: {
      "Cache-Control": "max-age=3600, public",
    },
  });
}

export default function Movie({ loaderData }: Route.ComponentProps) {
  let navigate = useNavigate();

  return (
    <main className="px-6 pb-8 max-w-6xl mx-auto mt-20 movie-detail">
      {/* <Link
        to="/movies"
        prefetch="intent"
        preventScrollReset
        className="flex gap-2 items-center"
        viewTransition
      >
        <ArrowLeft /> Back to movies
      </Link> */}
      <Button
        className={`flex gap-2 active:scale-[.97] group focus-visible:border-none focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-rose-700 transition-all ease-in-out duration-300 items-center`}
        variant="outline"
        onClick={() => navigate(-1)}
        // onMouseEnter={(e) => {
        //   document.startViewTransition(() => {
        //     flushSync(() => setIsHovered(true));
        //   });
        // }}
        // onMouseLeave={(e) => {
        //   document.startViewTransition(() => {
        //     flushSync(() => setIsHovered(false));
        //   });
        // }}
      >
        <span className=" duration-300">
          <ArrowLeft />
        </span>{" "}
        Back to movies
      </Button>
      <div className="flex flex-col lg:flex-row gap-8 mt-8">
        <div className="lg:order-2">
          <h1 className="font-heading text-5xl lg:text-7xl">
            {loaderData.title}
          </h1>
          <span
            id="rating"
            className="flex gap-2 items-center mt-4 text-amber-300"
          >
            <Star /> {loaderData.vote_average.toFixed(2)}
          </span>
          <p className="mt-4 text-gray-300">{loaderData.overview}</p>
        </div>
        <img
          src={`https://image.tmdb.org/t/p/w500${loaderData.poster_path}`}
          alt={`Poster for ${loaderData.title}`}
          className="lg:order-1 w-full aspect-[3/4] object-cover rounded-lg"
        />
      </div>
    </main>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  if (isRouteErrorResponse(error)) {
    console.error(error);
    return (
      <div className="w-full h-screen grid place-items-center">
        <div>
          <h1 className="font-heading text-5xl lg:text-7xl xl:text-8xl text-slate-500 text-center">
            {error.status} {error.statusText}
          </h1>
          <p className="mt-4 text-center text-red-500">{error.data}</p>
          <Link
            to="."
            className="bg-white hover:bg-gray-300 active:scale-[.97] transition ease-in-out duration-300 mt-4 px-4 py-2 rounded-lg text-black flex justify-self-center gap-2 items-center max-w-fit"
          >
            <RotateCcw /> <span className="font-semibold">Try again</span>
          </Link>
        </div>
      </div>
    );
  } else if (error instanceof Error) {
    console.error(error);
    return (
      <div className="w-full h-screen grid place-items-center">
        <div>
          <h1 className="font-bold text-5xl lg:text-7xl xl:text-8xl text-slate-500 text-center">
            Error
          </h1>
          <p className="mt-4 text-center text-red-500">{error.message}</p>
          <Link
            to="."
            className="bg-white hover:bg-gray-300 active:scale-[.97] transition ease-in-out duration-300 mt-4 px-4 py-2 rounded-lg text-black flex justify-self-center gap-2 items-center max-w-fit"
          >
            <RotateCcw /> Try again
          </Link>
        </div>
      </div>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}
