import { useQuery, gql, useLazyQuery, useMutation } from "@apollo/client";
import { useState } from "react";

const QUERY_ALL_USERS = gql`
  query getallusers {
    users {
      name
      id
      username
      nationality
      age
    }
  }
`;

const QUERY_ALL_MOVIES = gql`
  query getallmovies {
    movies {
      name
      id
      yearOfPublication
      isInTheaters
    }
  }
`;

const GET_MOVIE_BY_NAME = gql`
  query Movie($name: String!) {
    movie(name: $name) {
      name
      yearOfPublication
    }
  }
`;

const CREATE_USER_MUTATION = gql`
  mutation createUser($input: CreateUserInput!) {
    createUser(input: $input) {
      name
      id
    }
  }
`;

export default function Home() {
  const { data, loading, error, refetch } = useQuery(QUERY_ALL_USERS);
  const {
    data: MovieData,
    loading: MovieLoading,
    error: MovieError,
  } = useQuery(QUERY_ALL_MOVIES);
  const [movieSearched, setMovieSearched] = useState("");
  const [fetchMovie, { data: movieSearchedData, error: movieSearchError }] =
    useLazyQuery(GET_MOVIE_BY_NAME);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [age, setAge] = useState(0);
  const [nationality, setNationality] = useState("");

  const [createUser] = useMutation(CREATE_USER_MUTATION);

  return (
    <div>
      <div>
        <div>
          <input
            type="text"
            placeholder="Name..."
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Username..."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="number"
            placeholder="Age..."
            onChange={(event) => {
              setAge(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Nationality..."
            onChange={(event) => {
              setNationality(event.target.value.toUpperCase());
            }}
          />
          <button
            onClick={() =>
              createUser(
                {
                  variables: {
                    input: {
                      name,
                      age: Number(age),
                      username,
                      nationality,
                    },
                  },
                },
                refetch()
              )
            }
          >
            create user
          </button>
        </div>
      </div>

      {data &&
        data.users.map((user) => {
          return (
            <div>
              <p>{user.name}</p>
              <p>{user.username}</p>
              <p>{user.age}</p>
              <p>{user.id}</p>
              <p>{user.nationality}</p>
            </div>
          );
        })}
      <hr />
      {MovieData &&
        MovieData.movies.map((movie) => {
          return (
            <div>
              <p>{movie.name}</p>
              <p>{movie.isInTheaters}</p>
              <p>{movie.yearOfPublication}</p>
              <p>{movie.id}</p>
            </div>
          );
        })}
      <hr />
      <div>
        <input
          type="text"
          placeholder="Interstellar..."
          onChange={(event) => {
            setMovieSearched(event.target.value);
          }}
        />
        <button
          onClick={() => {
            fetchMovie({
              variables: {
                name: movieSearched,
              },
            });
          }}
        >
          Fetch Data
        </button>
        <div>
          {movieSearchedData && (
            <div>
              <h1>MovieName: {movieSearchedData.movie.name}</h1>
              <h1>
                Year Of Publication: {movieSearchedData.movie.yearOfPublication}
              </h1>{" "}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
