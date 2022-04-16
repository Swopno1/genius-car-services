import React, { useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import {
  useCreateUserWithEmailAndPassword,
  useUpdateProfile,
} from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import SocialLogin from '../SocialLogin/SocialLogin';
import Loading from '../../Shared/Loading/Loading';

const Register = () => {
  const [agree, setAgree] = useState(false);
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });

  const [updateProfile, updating, updateError] = useUpdateProfile(auth);

  const nameRef = useRef('');
  const emailRef = useRef('');
  const passwordRef = useRef('');
  const navigate = useNavigate();
  let errorElement = '';

  const handleSubmit = async (event) => {
    event.preventDefault();
    // const name = nameRef.current.value;
    const displayName = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    await createUserWithEmailAndPassword(email, password);
    await updateProfile({ displayName });
    navigate('/home');
  };

  if (error || updateError) {
    errorElement = (
      <p className='text-danger'>
        Error: {error?.message}
        {updateError?.message}
      </p>
    );
  }
  if (loading || updating) {
    errorElement = <Loading></Loading>;
  }

  const navigateLogin = (event) => {
    navigate('/login');
  };

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
