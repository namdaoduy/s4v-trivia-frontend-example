import React, { useState } from "react";
import {
  Container,
  Card,
  Row,
  Col,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import { useStoreActions } from "easy-peasy";

import request from "utils/request";

function LoginPage() {
  const [validated, setValidated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);

  const loginSuccess = useStoreActions((actions) => actions.auth.loginSuccess);

  const onUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    setSubmitting(true);

    setServerError(null);

    const form = event.currentTarget;

    const isValid = form.checkValidity();
    setValidated(true);

    if (isValid) {
      try {
        const response = await request.post("/auth/login", {
          username,
          password,
        });
        loginSuccess(response.access_token);
      } catch (error) {
        if (error && error.data && error.data.error_message) {
          setServerError(error.data.error_message);
        }
      }
    }

    setSubmitting(false);
  };

  return (
    <Container className="py-4">
      <Row>
        <Col xs={12} md={{ span: 6, offset: 3 }}>
          <Card>
            <Card.Body>
              <Card.Title>Đăng nhập</Card.Title>

              <Form
                className="mt-3"
                noValidate
                validated={validated}
                onSubmit={handleSubmit}
              >
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Tên đăng nhập</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="username"
                    placeholder="Nhập tên đăng nhập..."
                    value={username}
                    onChange={onUsernameChange}
                    readOnly={submitting}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Mật khẩu</Form.Label>
                  <Form.Control
                    required
                    type="password"
                    name="password"
                    placeholder="Nhập mật khẩu..."
                    value={password}
                    onChange={onPasswordChange}
                    readOnly={submitting}
                  />
                </Form.Group>

                {serverError && <Alert variant="danger">{serverError}</Alert>}
                <Button variant="primary" type="submit" disabled={submitting}>
                  {submitting ? "Vui lòng đợi..." : "Đăng nhập"}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;
