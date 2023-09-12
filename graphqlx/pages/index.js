import { useQuery, gql } from "@apollo/client";

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

export default function Home() {
  const { data, loading, error } = useQuery(QUERY_ALL_USERS);

  return (
    <div>
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
    </div>
  );
}
