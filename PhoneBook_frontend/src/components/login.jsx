import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { RegisterFormModal } from "./register";
import { useState, useEffect } from "react";
import CloseButton from "react-bootstrap/esm/CloseButton";

export function LoginFormModal(props) {
  const [RegistermodalShow, setRegisterModalShow] = useState(false);

  const openRegistermodal = () => {
    const closebuttn = document.querySelector(".btn-close");
    closebuttn.click();
    setRegisterModalShow(true);
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
          <Modal.Title id="contained-modal-title-vcenter">Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="username.." />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button>Login</Button>

          <Button className="" onClick={openRegistermodal} href="#">
            Register
          </Button>
        </Modal.Footer>
      </Modal>
      <RegisterFormModal
        show={RegistermodalShow}
        onHide={() => setRegisterModalShow(false)}
      />
    </>
  );
}
