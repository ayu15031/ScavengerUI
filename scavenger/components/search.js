import { useState } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import Document from "./document";

const QUERY = gql`
  query SearchQuery($query: String!) {
    get_docs(query: $query) {
      id
    }
  }
`;

const Search = () => {
  const [query, setquery] = useState("");

  const [result, setResult] = useState(null);
  const [executeSearch, { loading, error, data }] = useLazyQuery(QUERY, {
    onCompleted: (data) => {
      console.log(data);
      setResult(data.get_docs);
    },
  });

  //   if (loading) return "Loading...";

  //   if (error) return `Error! ${error.message}`;

  return (
    <>
      <input
        type="text"
        onChange={(e) => {
          //   e.preventDefault();
          setquery(e.target.value);
          executeSearch({
            variables: {
              query: query,
            },
          });
        }}
      />

      {result && result.map((res) => <Document key={res.id} res={res} />)}
    </>
  );
};

export default Search;
