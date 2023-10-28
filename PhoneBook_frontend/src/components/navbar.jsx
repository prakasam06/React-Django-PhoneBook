import React from "react";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";


export const Navbar = () => {
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
          console.log('not authenticated')
          setIsLoaded(true);
        } else if (response.status == 200) {
          console.log('authenticated')
          setIsAunthenticated(true);
          setUser(parseRes);
          setIsLoaded(true);
        } else {
          alert("unkown error occured");
        }
      } catch (err) {
        console.log('error occured and not authenticated')
        console.log(err);
        setIsError(true);
        setIsLoaded(true);
        setErrorMessage(err.message);
      }
    };
    getUser();
  }, []);

  const AuthOptons = () => {
    const [AuthformShow, setAuthformShow] = useState(false);

    return (
      <>
        <li className="nav-item">
          <a
            className="nav-link active text-light"
            onClick={() => setAuthformShow(true)}
            href="#"
          >
            Login
          </a>
        </li>
        <FormModal
        show={AuthformShow}
        onHide={() => setAuthformShow(false)}
        />
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
            PhoneBook
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


const FormModal = (props) => {

const [isLogin, setisLogin] = useState(true);

const submitForm = () =>{
console.log()
}


  return (
  
    <>
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Register</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        
       {isLogin ?   
            <Form>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="username.." />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Button onClick={()=>submitForm()}>Submit</Button>
            </Form>
:
  <Form>
     <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="username.." />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" placeholder="Enter name" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" placeholder="last name.." />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="@.com" />
          </Form.Group>
          <Button onClick={()=>submitForm()}>Submit</Button>
        </Form>
}
      </Modal.Body>
      <Modal.Footer>
        
        {isLogin ? 
        <>
        <p>if you are a new user</p>
        <Button onClick={()=> setisLogin(false)}>Register</Button>
        </>
        : 
        <>
        <p>already an user</p>
        <Button onClick={()=> setisLogin(true)}>Login</Button>
        </>
}
      </Modal.Footer>
    </Modal>

  </>
  );
}