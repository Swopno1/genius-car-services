import React, { useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import SocialLogin from '../SocialLogin/SocialLogin';

const Login = () => {
  const emailRef = useRef('');
  const passwordRef = useRef('');
  const navigate = useNavigate();
  const location = useLocation('');

  let from = location.state?.from?.pathname || '/';
  let errorElement = '';

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  if (error) {
    errorElement = <p className='text-danger'>Error: {error?.message}</p>;
  }
  if (loading) {
    errorElement = <p>Loading...</p>;
  }
  if (user) {
    navigate(from, { replace: true });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    signInWithEmailAndPassword(email, password);
  };

  const navigateRegister = (event) => {
    navigate('/register');
  };

  return (
    <div className='container w-50 mx-auto'>
      <h2 className='text-primary text-center mt-2'>Please Log In</h2>
      <Form onSubmit={handleSubmit}>
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
        <Button variant='primary w-50 mx-auto d-block mb-2' type='submit'>
          Log In
        </Button>
      </Form>
      {errorElement}
      <p>
        New to Genius Car?{' '}
        <Link
          to='/register'
          onClick={navigateRegister}
          className='text-danger text-decoration-none'
        >
          Please Register
        </Link>
      </p>

      <SocialLogin></SocialLogin>
    </div>
  );
};

export default Login;
