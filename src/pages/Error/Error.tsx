import React from "react";
import { Link } from "react-router-dom";
import './Error.scss';

export const Error: React.FC = React.memo(
  () => {
    return (
      <div id="error-page" className="error">
        <div className="error__wrapper">
          <h1 className="error__title">Oops!</h1>

          <p>Sorry, an unexpected error has occurred.</p>

          <p>
            <i>Page not found</i>
          </p>

          <span className="error__link">
            <Link to="/">Go back to home page.</Link>
          </span>
        </div>
      </div>
    );
  }
);