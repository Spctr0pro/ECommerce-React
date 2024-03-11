import Container from "react-bootstrap/Container";

export const ItemListContainer = ({ texto }) => (
    <Container className="container">
        <h2>{texto}</h2>
    </Container>
);