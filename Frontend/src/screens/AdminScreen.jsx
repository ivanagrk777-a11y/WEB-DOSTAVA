import { Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AdminScreen = () => {
  return (
    <>
      <h1 className='mb-4'>Admin Panel</h1>

      <Row>
        <Col md={4}>
          <Card className='mb-3'>
            <Card.Body>
              <Card.Title>Hrana</Card.Title>
              <Card.Text>Dodavanje, izmjena i brisanje jela.</Card.Text>
              <Link to='/admin/products'>Upravljaj hranom</Link>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className='mb-3'>
            <Card.Body>
              <Card.Title>Narudžbe</Card.Title>
              <Card.Text>Pregled svih narudžbi korisnika.</Card.Text>
              <Link to='/admin/orders'>Pregled narudžbi</Link>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className='mb-3'>
            <Card.Body>
              <Card.Title>Korisnici</Card.Title>
              <Card.Text>Pregled registrovanih korisnika.</Card.Text>
              <Link to='/admin/users'>Pregled korisnika</Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default AdminScreen;