import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { uniqueId } from 'lodash';
import FormLayout from './FormLayout';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(1, 'Must have a character')
    .max(50, 'Must be shorter than 50')
    .required('Must enter a name'),
  email: Yup.string()
    .email('Must be a valid email address')
    .required('Email is required'),
  age: Yup.number('Must be an integer')
    .min(18, 'Must be in range of 18 and 65')
    .max(65, 'Must be in range of 18 and 65')
    .required(),
  password: Yup.string()
    .min(8, 'Must be longer than 8')
    .max(40, 'Must be shorter than 40')
    .matches(/[0-9]/, 'Must have at least one digit')
    .matches(/[A-Z]/, 'Must have at least one uppercase character')
    .matches(/^[a-zA-Z0-9]{8,}$/, 'Must have only letters and digits')
    .required('Password is required'),
  confirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Must be the same password')
    .required('Confirmation is required'),
  website: Yup.string().url('Mustbe a valid url'),
  acceptTerms: Yup.bool().oneOf([true], 'Field must be checked'),
  skills: Yup.array()
    .of(Yup.string())
    .min(1, 'Must have at least one skill')
    .required(),
});

const FormikForm = () => {
  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        age: 0,
        password: '',
        confirmation: '',
        website: '',
        acceptTerms: false,
        skills: [{ id: uniqueId(), name: '' }],
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting, resetForm, setFieldError, setFieldValue }) => {
        setSubmitting(true);
        axios
          .post('http://localhost:8000/login', { user: { ...values } })
          .then(res => setFieldValue('success', res.data), resetForm())
          .catch(err => setFieldError('success', err.message))
          .finally(() => setSubmitting(false));
      }}
    >
      {object => <FormLayout {...object} />}
    </Formik>
  );
};

export default FormikForm;
