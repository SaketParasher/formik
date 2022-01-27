import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField'; 
import Button from '@mui/material/Button';

import * as yup from 'yup';

import { useFormik } from 'formik';

// A custom validate object must return an object which keys are symmetrical to our values/initialValues
const validate = values => {
    const errors = {};
    if(values.firstName.length === 0){
        errors.firstName = 'FirstName is Required!';
    }else if(values.firstName.length > 15){
        errors.firstName = 'Must be 15 characters or less';
    }
    if (values.lastName.length === 0) {
        errors.lastName = 'Last Name is Required';
      } else if (values.lastName.length > 20) {
        errors.lastName = 'Must be 20 characters or less';
      }
    
      if (values.email.length === 0) {
        errors.email = 'Email is Required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }
    
      return errors;
}



const FormWrapper = () => {

    const formik = useFormik({
        initialValues:{
            firstName:'',
            lastName:'',
            email:''
        },
        //validate,
        validationSchema: yup.object({
          firstName:yup.string().max(15,'Must be 15 characters or less').required('First Name is Required!!'),
          lastName:yup.string().max(15,'Must be 15 characters or less').required('Last Name is Required!!'),
          email:yup.string().email('Invalid Email Address').required('Email is Required!')
        }),
        onSubmit: values => {
            alert(JSON.stringify(values,null,2))
        }
    })

  return (
    <Box component='form' onSubmit={formik.handleSubmit} className='form-wrapper'>
        <Card variant="outlined" className='form-card'>
            <h4>SIGNUP FORM</h4>
            <hr/>
            <TextField fullWidth id="firstName" name='firstName' label='First Name'
                       helperText={formik.touched.firstName ? formik.errors.firstName : ''}  className='form-field'
                       onChange={formik.handleChange} value={formik.values.firstName} color='secondary'
                       onBlur={formik.handleBlur}
                       error={formik.touched.firstName && !!formik.errors.firstName }/>
            <TextField fullWidth id="lastName" name='lastName' label='Last Name' helperText={formik.touched.lastName ? formik.errors.lastName : ''}
                       onChange={formik.handleChange} value={formik.values.lastName} color='secondary'
                       onBlur={formik.handleBlur}
                       error={formik.touched.lastName && !!formik.errors.lastName} className='form-field'/>
            <TextField fullWidth id="email" name='email' label='Email' helperText={formik.touched.email ? formik.errors.email : ''}
                       onChange={formik.handleChange} value={formik.values.email} color='secondary'
                       onBlur={formik.handleBlur}
                       error={formik.touched.email && !!formik.errors.email} className='form-field'/>
            <Button variant='contained' color='secondary' type='submit'>SUBMIT</Button>            
        </Card>
    </Box>
  )
};

export default FormWrapper;
