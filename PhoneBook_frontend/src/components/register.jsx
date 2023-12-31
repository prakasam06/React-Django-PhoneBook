import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { LoginFormModal } from "./login";

import { useState } from "react";




export function RegisterFormModal(props) {

  const [LoginmodalShow, setLoginModalShow] = useState(false);

  const openLoginmodal = () => {
    const closebuttn = document.querySelector(".btn-close");  
    closebuttn.click();
    setLoginModalShow(true);
  };

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
        <Form>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" placeholder="Enter name" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" placeholder="last name.." />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="username.." />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="@.com" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button >Submit</Button>
        <Button onClick={()=> openLoginmodal()}>Login</Button>
      </Modal.Footer>
    </Modal>
       <LoginFormModal
      show={LoginmodalShow}
      onHide={() => setLoginModalShow(false)}
    />
  </>
  );
}
