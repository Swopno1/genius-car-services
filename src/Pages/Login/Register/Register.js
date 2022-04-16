import React, { useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import SocialLogin from '../SocialLogin/SocialLogin';

const Register = () => {
  const [agree, setAgree] = useState(false);
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const nameRef = useRef('');
  const emailRef = useRef('');
  const passwordRef = useRef('');
  const navigate = useNavigate();
  let errorElement = '';

  const handleSubmit = (event) => {
    event.preventDefault();
    // const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    createUserWithEmailAndPassword(email, password);
  };

  if (error) {
    errorElement = <p className='text-danger'>Error: {error?.message}</p>;
  }
  if (loading) {
    errorElement = <p>Loading...</p>;
  }

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
          <Form.Control
            ref={nameRef}
            type='text'
            placeholder='Enter Your Name'
            autoComplete='name'
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Form.Control
            ref={emailRef}
            type='email'
            placeholder='Enter email'
            autoComplete='email'
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicPassword'>
          <Form.Control
            ref={passwordRef}
            type='password'
            placeholder='Password'
            autoComplete='current-password'
          />
        </Form.Group>
        <Form.Group
          className={agree ? 'mb-3 text-primary' : 'mb-3 text-danger'}
          controlId='formBasicCheckbox'
        >
          <Form.Check
            onClick={() => setAgree(!agree)}
            type='checkbox'
            label='Accept Terms & Conditions!'
          />
        </Form.Group>
        <Button
          disabled={!agree}
          variant='primary primary w-50 mx-auto d-block mb-2'
          type='submit'
        >
          Register
        </Button>
      </Form>
      {errorElement}
      <p>
        Already have an account?{' '}
        <Link
          to='/login'
          onClick={navigateLogin}
          className='text-primary text-decoration-none'
        >
          Please Login
        </Link>
      </p>
      <SocialLogin></SocialLogin>
    </div>
  );
};

export default Register;
