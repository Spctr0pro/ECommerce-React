import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';

import { CardWidget } from './CardWidget';

export const NavBar = () => {
    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark" className='container-fluid margin'>
                <Container>
                    <Navbar.Brand to="/" as={NavLink}>Tú Tienda Tecnologica</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link to="/category/Televisores" as={NavLink}>Televisores</Nav.Link>
                        <Nav.Link to="/category/Celulares" as={NavLink}>Celulares</Nav.Link>
                        <Nav.Link to="/category/Notebooks" as={NavLink}>Notebook</Nav.Link>
                    </Nav>
                    <CardWidget />
                </Container>
            </Navbar>
                        
        </>
    )
};
