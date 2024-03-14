import Container from "react-bootstrap/Container";

export const ItemListContainer = ({ greeting }) => {
    return (
    <Container className="container">
        <h2>{greeting}</h2>
    </Container>
)};