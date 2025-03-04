import {
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import tailwindStyles from "./styles/app.css?url";
import subscribeStyles from "./styles/subscribe.css?url";
import { RotateCcw } from "lucide-react";

export const links: Route.LinksFunction = () => [
  {
    rel: "stylesheet",
    href: tailwindStyles,
  },
  {
    rel: "stylesheet",
    href: subscribeStyles,
  },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Orelega+One&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="font-body">
        {children}
        <footer className="my-8">
          <p className="text-center text-gray-500">
            Demo by{" "}
            <a
              href="https://brianmwangi.co.ke"
              target="_blank"
              rel="noreferrer noopener"
              className="text-amber-700 hover:underline transition duration-300 ease-in-out"
            >
              Brian Mwangi
            </a>{" "}
          </p>
        </footer>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
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
