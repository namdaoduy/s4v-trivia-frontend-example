import React from "react";
import { Navbar, Container, Dropdown } from "react-bootstrap";
import { useStoreActions } from "easy-peasy";

function Header() {
  const logout = useStoreActions((actions) => actions.auth.logout);

  const onLogoutClick = () => {
    logout();
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand>Trivia Game</Navbar.Brand>
        <Dropdown align="end">
          <Dropdown.Toggle variant="link">
            <i class="bi bi-gear-fill fs-5"></i>
          </Dropdown.Toggle>

          <Dropdown.Menu className="shadow">
            <Dropdown.Item onClick={onLogoutClick}>
              <i class="bi bi-power fs-6 me-2"></i>
              <span>Đăng xuất</span>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Container>
    </Navbar>
  );
}

export default Header;
