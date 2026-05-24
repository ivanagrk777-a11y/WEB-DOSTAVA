import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';

import {
    Button,
    Row,
    Col,
    ListGroup,
    Image,
    Card,
} from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';

import Message from '../components/Message';
import CheckoutSteps from '../components/CheckoutSteps';
import Loader from '../components/Loader';

import { useCreateOrderMutation } from '../slices/orderApiSlice';

import { clearCartItems } from '../slices/cartSlice';

const PlaceOrderScreen = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart);

    const [createOrder, { isLoading, error }] =
        useCreateOrderMutation();

    useEffect(() => {

        if (!cart.shippingAddress.address) {

            navigate('/shipping');

        } else if (!cart.paymentMethod) {

            navigate('/payment');
        }

    }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

    const placeOrderHandler = async () => {

        try {

            await createOrder({
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: cart.itemsPrice,
                shippingPrice: cart.shippingPrice,
                taxPrice: cart.taxPrice,
                totalPrice: cart.totalPrice,
            }).unwrap();

            dispatch(clearCartItems());

            toast.success('Porudžbina uspješno kreirana');

            navigate('/');

        } catch (err) {

            toast.error('Greška pri kreiranju porudžbine');
        }
    };

    return (
        <>
            <CheckoutSteps step1 step2 step3 step4 />

            <Row>

                <Col md={8}>

                    <ListGroup variant='flush'>

                        <ListGroup.Item>

                            <h2>Podaci za dostavu</h2>

                            <p>
                                <strong>Adresa:</strong>{' '}
                                {cart.shippingAddress.address},{' '}
                                {cart.shippingAddress.city}{' '}
                                {cart.shippingAddress.postalCode},{' '}
                                {cart.shippingAddress.country}
                            </p>

                        </ListGroup.Item>

                        <ListGroup.Item>

                            <h2>Način plaćanja</h2>

                            <p>{cart.paymentMethod}</p>

                        </ListGroup.Item>

                        <ListGroup.Item>

                            <h2>Vaša porudžbina</h2>

                            {cart.cartItems.length === 0 ? (

                                <Message>
                                    Korpa je prazna
                                </Message>

                            ) : (

                                <ListGroup variant='flush'>

                                    {cart.cartItems.map((item, index) => (

                                        <ListGroup.Item key={index}>

                                            <Row>

                                                <Col md={1}>

                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        fluid
                                                        rounded
                                                    />

                                                </Col>

                                                <Col>

                                                    <Link
                                                        to={`/product/${item.product}`}
                                                    >
                                                        {item.name}
                                                    </Link>

                                                </Col>

                                                <Col md={4}>

                                                    {item.qty} x {item.price} RSD ={' '}
                                                    {item.qty * item.price} RSD

                                                </Col>

                                            </Row>

                                        </ListGroup.Item>

                                    ))}

                                </ListGroup>

                            )}

                        </ListGroup.Item>

                    </ListGroup>

                </Col>

                <Col md={4}>

                    <Card>

                        <ListGroup variant='flush'>

                            <ListGroup.Item>
                                <h2>Pregled porudžbine</h2>
                            </ListGroup.Item>

                            <ListGroup.Item>

                                <Row>
                                    <Col>Proizvodi</Col>
                                    <Col>{cart.itemsPrice} RSD</Col>
                                </Row>

                            </ListGroup.Item>

                            <ListGroup.Item>

                                <Row>
                                    <Col>Dostava</Col>
                                    <Col>{cart.shippingPrice} RSD</Col>
                                </Row>

                            </ListGroup.Item>

                            <ListGroup.Item>

                                <Row>
                                    <Col>Porez</Col>
                                    <Col>{cart.taxPrice} RSD</Col>
                                </Row>

                            </ListGroup.Item>

                            <ListGroup.Item>

                                <Row>
                                    <Col>Ukupno</Col>
                                    <Col>{cart.totalPrice} RSD</Col>
                                </Row>

                            </ListGroup.Item>

                            <ListGroup.Item>

                                {error && (
                                    <Message variant='danger'>
                                        Greška pri učitavanju
                                    </Message>
                                )}

                            </ListGroup.Item>

                            <ListGroup.Item>

                                <Button
                                    type='button'
                                    className='btn-block'
                                    disabled={cart.cartItems.length === 0}
                                    onClick={placeOrderHandler}
                                >
                                    Potvrdi porudžbinu
                                </Button>

                                {isLoading && <Loader />}

                            </ListGroup.Item>

                        </ListGroup>

                    </Card>

                </Col>

            </Row>
        </>
    );
};

export default PlaceOrderScreen;