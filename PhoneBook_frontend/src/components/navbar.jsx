import React from "react";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isAunthenticated, setIsAunthenticated] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/user", {
          method: "GET",
        });
        const parseRes = await response.json();
        if (response.status == 403) {
          setIsAunthenticated(false);
          setIsLoaded(true);
        } else if (response.status == 200) {
          setIsAunthenticated(true);
          setUser(parseRes);
          setIsLoaded(true);
        } else {
          alert("unkown error occured");
        }
      } catch (err) {
        console.log(err);
        setIsError(true);
        setIsLoaded(true);
        setErrorMessage(err.message);
      }
    };
    getUser();
  }, []);

  const login = () => {};
  const register = () => {};

  const AuthOptons = () => {
    return (
      <>
        <li className="nav-item">
          <a
            onClick={login}
            className="nav-link active text-light"
            aria-current="page"
            href="#"
          >
            Login
          </a>
        </li>
        <li className="nav-item text-light">
          <a onClick={register} className="nav-link text-light" href="#">
            Register
          </a>
        </li>
      </>
    );
  };

  const AuthenticatedOptions = () => {
    return (
      <>
        <li className="nav-item">
          <a
            className="nav-link active text-light"
            aria-current="page"
            href="#"
          >
            UserName
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link active text-light"
            aria-current="page"
            href="#"
          >
            Logout
          </a>
        </li>
      </>
    );
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg bg-dark text-light"
        data-bs-theme="light"
      >
        <div className="container-fluid text-light">
          <a className="navbar-brand text-light" href="#">
            Navbar
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              {isAunthenticated ? <AuthenticatedOptions /> : <AuthOptons />}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};