import { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
} from '../slices/productsApiSlice';

import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';

const ProductEditScreen = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId);

  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation();

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [product]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await updateProduct({
        productId,
        name,
        price,
        image,
        category,
        countInStock,
        description,
      }).unwrap();

      toast.success('Jelo je izmijenjeno');
      navigate('/admin/products');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <FormContainer>
        <h1>Izmjena jela</h1>

        {loadingUpdate && <Loader />}

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>Greška pri učitavanju jela</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name' className='my-2'>
              <Form.Label>Naziv</Form.Label>
              <Form.Control
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='price' className='my-2'>
              <Form.Label>Cijena</Form.Label>
              <Form.Control
                type='number'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='image' className='my-2'>
              <Form.Label>Slika</Form.Label>
              <Form.Control
                type='text'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='category' className='my-2'>
              <Form.Label>Kategorija</Form.Label>
              <Form.Control
                type='text'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='countInStock' className='my-2'>
              <Form.Label>Stanje</Form.Label>
              <Form.Control
                type='number'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='description' className='my-2'>
              <Form.Label>Opis</Form.Label>
              <Form.Control
                as='textarea'
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Button type='submit' variant='primary' className='my-3'>
              Sačuvaj izmjene
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;