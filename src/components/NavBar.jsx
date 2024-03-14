import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { CardWidget } from './CardWidget';

export const NavBar = () => {
    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark" className='container-fluid'>
                <Container>
                    <Navbar.Brand href="#home">Tú Tienda Tecnologica</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="#televisores">Televisores</Nav.Link>
                        <Nav.Link href="#celulares">Celulares</Nav.Link>
                        <Nav.Link href="#notebook">Notebook</Nav.Link>
                    </Nav>
                    <CardWidget />
                </Container>
            </Navbar>
                        
        </>
    )
};
