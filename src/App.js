import React, { useState, useEffect } from "react";
import "./styles.css";

const GITHUB_API_ROOT = "https://api.github.com";
const AVAILABLE_REPOS = ["facebook/react", "angular/angular", "vuejs/vue"];

async function fetchData() {
  const response = await fetch(`${GITHUB_API_ROOT}/repos/facebook/react`);
  // const JSONresponse = await response.json();
  // return JSONresponse;
  return response.json();
}

export default function App() {
  const [repoData, setRepoData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);

  const handleFetchClick = async () => {
    setLoading(true);
    try {
      const githubResponse = await fetchData();
      setRepoData(githubResponse);
    } catch {
      setError("There are something wrong, please try again later.");
    }
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    fetchData("vuejs/vue")
      .then((githubResponse) => setRepoData(githubResponse))
      .catch(() => {
        setError("There are somethings wrong, please try again later");
      })
      .finally(() => setLoading(false));
    // async function asyncFunc(){
    // const githubResponse = await fetchData{}
    // }
    //  console.log("use Effect");

    //  return () => {
    //     console.log("unmounted");
    //  };
  }, []);

  return (
    <div>
      <div>
        <button onClick={handleFetchClick}>Fetch Data</button>
      </div>
      {!isLoading && repoData && (
        <div>
          <h3> name: {repoData.full_name}</h3>
          <span> star: {repoData.stargazers_count}</span>
        </div>
      )}
    </div>
  );
}
