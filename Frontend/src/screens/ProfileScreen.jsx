import { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { toast } from 'react-toastify';

const ProfileScreen = () => {
    const { userInfo } = useSelector((state) => state.auth);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        if (userInfo) {
            setName(userInfo.name);
            setEmail(userInfo.email);
        }
    }, [userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error('Lozinke se ne poklapaju');
        } else {
            toast.success('Profil uspješno ažuriran');
        }
    };

    return (
        <Row>
            <Col md={6}>
                <FormContainer>
                    <h1>Korisnički profil</h1>

                    <Form onSubmit={submitHandler}>
                        <Form.Group className='my-2' controlId='name'>
                            <Form.Label>Ime</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Unesite ime'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className='my-2' controlId='email'>
                            <Form.Label>Email adresa</Form.Label>
                            <Form.Control
                                type='email'
                                placeholder='Unesite email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className='my-2' controlId='password'>
                            <Form.Label>Nova lozinka</Form.Label>
                            <Form.Control
                                type='password'
                                placeholder='Unesite lozinku'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className='my-2' controlId='confirmPassword'>
                            <Form.Label>Potvrdite lozinku</Form.Label>
                            <Form.Control
                                type='password'
                                placeholder='Potvrdite lozinku'
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </Form.Group>

                        <Button type='submit' variant='primary' className='my-3'>
                            Ažuriraj profil
                        </Button>
                    </Form>
                </FormContainer>
            </Col>
        </Row>
    );
};

export default ProfileScreen;