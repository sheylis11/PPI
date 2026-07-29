import React from 'react'
import { Navbar, Container, Nav, Button } from 'react-bootstrap'
import '../styles/header.css'
import logo from '../assets/logo.png'

// Header component: Navbar fixed, logo left, menu center, help button right
export default function Header({ onHelpClick, onRequestLogin }) {
  return (
    <Navbar expand="lg" className="metro-navbar shadow-sm" fixed="top">
      <Container>
        <Navbar.Brand href="#" className="d-flex align-items-center">
          <img src={logo} alt="logo" className="logo me-3" />
          <div>
            <div className="brand-title">Animamos nuestro metro</div>
            <div className="brand-sub">Tu viaje también importa.</div>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <div className="mx-auto nav-center-text text-center">
            <div className="nav-main-title">Bienvenido a animemos nuestro metro</div>
            <div className="nav-phrase">No estás solo. Hablemos, creamos, escuchemos, sanemos juntos</div>
          </div>
          <div className="d-flex align-items-center">
            <Button className="btn-help" onClick={onHelpClick}>
              <i className="bi bi-life-preserver me-2"></i>Pide ayuda
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
