import { Table, Button, Row, Col } from 'react-bootstrap';
import { FaTrash, FaEdit, FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import {
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
} from '../slices/productsApiSlice';

import Loader from '../components/Loader';
import Message from '../components/Message';

const ProductListScreen = () => {
  const navigate = useNavigate();

  const { data: products, isLoading, error, refetch } = useGetProductsQuery();

  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation();

  const [deleteProduct, { isLoading: loadingDelete }] =
    useDeleteProductMutation();

  const createProductHandler = async () => {
    if (window.confirm('Da li želiš dodati novo jelo?')) {
      try {
        const createdProduct = await createProduct().unwrap();
        refetch();
        toast.success('Novo jelo je dodato');
        navigate(`/admin/product/${createdProduct._id}/edit`);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const deleteHandler = async (id) => {
    if (window.confirm('Da li želiš obrisati ovo jelo?')) {
      try {
        await deleteProduct(id).unwrap();
        refetch();
        toast.success('Jelo je obrisano');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Upravljanje hranom</h1>
        </Col>

        <Col className='text-end'>
          <Button className='my-3' onClick={createProductHandler}>
            <FaPlus /> Dodaj jelo
          </Button>
        </Col>
      </Row>

      {loadingCreate && <Loader />}
      {loadingDelete && <Loader />}

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>Greška pri učitavanju hrane</Message>
      ) : (
        <Table striped hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAZIV</th>
              <th>CIJENA</th>
              <th>KATEGORIJA</th>
              <th>STANJE</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.price} RSD</td>
                <td>{product.category}</td>
                <td>{product.countInStock}</td>
                <td>
                  <Button
                    variant='light'
                    className='btn-sm mx-2'
                    onClick={() =>
                      navigate(`/admin/product/${product._id}/edit`)
                    }
                  >
                    <FaEdit />
                  </Button>

                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(product._id)}
                  >
                    <FaTrash style={{ color: 'white' }} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default ProductListScreen;