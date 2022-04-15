import React, { useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';

const Register = () => {
  const [createUserWithEmailAndPassword, user] =
    useCreateUserWithEmailAndPassword(auth);

  const nameRef = useRef('');
  const emailRef = useRef('');
  const passwordRef = useRef('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    createUserWithEmailAndPassword(email, password);
  };

  const navigateLogin = (event) => {
    navigate('/login');
  };

  if (user) {
    navigate('/home');
  }

  return (
    <div className='container w-50 mx-auto'>
      <h2 className='text-primary text-center mt-2'>Please Register</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className='mb-3' controlId='formBasicName'>
          <Form.Label>Your Name</Form.Label>
          <Form.Control
            ref={nameRef}
            type='text'
            placeholder='Enter Your Name'
            autoComplete='name'
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            ref={emailRef}
            type='email'
            placeholder='Enter email'
            autoComplete='email'
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            ref={passwordRef}
            type='password'
            placeholder='Password'
            autoComplete='current-password'
          />
        </Form.Group>
        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
      <p>
        Already have an account?{' '}
        <Link
          to='/login'
          onClick={navigateLogin}
          className='text-danger text-decoration-none'
        >
          Please Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
