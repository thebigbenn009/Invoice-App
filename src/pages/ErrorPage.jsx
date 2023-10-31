import React from "react";
import { Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  if (error.status === 404) {
    <div>
      <h3>Ooh</h3>
      <p>
        <p>We can't seem to find the page you are looking for</p>
      </p>
      <Link to="/">Back Home</Link>
    </div>;
  }
  return <div>ErrorPage</div>;
};

export default ErrorPage;
