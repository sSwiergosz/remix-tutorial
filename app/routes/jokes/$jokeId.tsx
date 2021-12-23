import type { LoaderFunction } from "remix";
import { Link, useLoaderData } from "remix";

import { db } from "~/utils/db.server";

type Joke = {
  id: string;
  name: string;
  content: string;
};

type LoaderData = { joke: Omit<Joke, "id"> | null };

export const loader: LoaderFunction = async ({ params }) => {
  const data: LoaderData = {
    joke: await db.joke.findUnique({
      where: { id: params.jokeId },
    }),
  };

  if (!data) throw new Error("Joke not found");

  return data;
};

export default function JokeRoute() {
  const data = useLoaderData<LoaderData>();

  return (
    <div>
      <p>Here's your hilarious joke:</p>
      <p>{data.joke?.content}</p>
      <Link to=".">{data.joke?.name} Permalink</Link>
    </div>
  );
}
