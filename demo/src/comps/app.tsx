import { Container, Double, Heading } from "./styled";

export function App() {
  return (
    <Container className="my-8">
      <Heading size="lg">Hello world!</Heading>
      <Double number={5} alert />
    </Container>
  );
}
