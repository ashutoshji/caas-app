import React, { useState } from 'react';
import { Navbar, Nav, NavDropdown } from '@govtechsg/sgds-react/Nav';
import Logo from './logo';

export const NavbarContainer = () => {
  const [active, setActive] = useState('home');
  const clickNavbarItem = (eventKey) => {
    setActive(eventKey);
  };
  return (
    <Navbar>
      <Navbar.Brand href="#">
        <Logo></Logo>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto" navbarScroll activeKey={active}>
          <Nav.Item>
            <Nav.Link
              href="#"
              eventKey="home"
              onClick={() => clickNavbarItem('home')}
            >
              Apply
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              href="#"
              eventKey="link"
              onClick={() => clickNavbarItem('link')}
            >
              Retrieve
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              href="#"
              eventKey="About"
              onClick={() => clickNavbarItem('About')}
            >
              About
            </Nav.Link>
            </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};