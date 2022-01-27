import React from 'react';
import { Formik, Form, useField } from 'formik';
import * as yup from 'yup';

import  TextField  from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { FormGroup } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';

const MyTextInput = ({...props}) => {
    // useField returns [formik.getFieldProps(), formik.getFieldMeta()] which we can spread on input.
    // we can use field meta to show an error message if the field is invalid and it has been touched

    const [field,meta] = useField(props);
    return (
        <TextField  {...field} {...props} color="secondary" fullWidth className='form-field'
                    error={meta.touched && !!meta.error} helperText={meta.touched ? meta.error : null} />
    )
}

const MyRadioInput = ({label,...props}) => {
    const [field,meta] = useField({...props,type:'radio'});

    return (
        <FormControl color='secondary' className='form-field' sx={{width:'100%'}} error={meta.touched && meta.error ? true : false}>
            <FormLabel>{label}</FormLabel>
            <RadioGroup row {...field} {...props}/>
            {meta.touched && meta.error && <FormHelperText>{meta.error}</FormHelperText>}
        </FormControl>
    )
}

const MyCheckbox = ({...props}) => {
    const [field,meta] = useField({...props,type:'checkbox'});

    return (
            <FormControl fullWidth error={meta.touched && meta.error ? true : false}>
                <FormControlLabel control={<Checkbox />} {...field} {...props} />
                {meta.touched && meta.error && <FormHelperText>{meta.error}</FormHelperText>}
            </FormControl>   
    )
}

const MySelect = ({label,...props}) => {
    const [field,meta] = useField(props);

    return (
        <FormControl color='secondary' fullWidth className='form-field' error={meta.touched && meta.error ? true : false}>
            <InputLabel id="demo-simple-select-error-label">{label}</InputLabel>
            <Select id="demo-simple-select-error-label" {...field} {...props}/>
            {meta.touched && meta.error && <FormHelperText>{meta.error}</FormHelperText>}
        </FormControl>
    )
}



const Signup = () => {
  return (
      <Box className='form-wrapper'>
          <Card className='form-card' variant='outlined'>
            <h4>SIGNUP FORM</h4>
            <hr/>
            <Formik initialValues={{
                firstName:'',
                lastName:'',
                email:'',
                gender:'',
                acceptedTerms:false, // added for checkbox
                jobType:'' // added for select
            }}
            validationSchema={yup.object({
                firstName:yup.string().max(15,'First Name must be 15 chars or less').required('First Name is required'),
                lastName:yup.string().max(15,'Last Name must be 15 chars or less').required('Last Name is required'),
                gender:yup.string().oneOf(['male','female','others'],'Invalid Gender').required('Gender is required'),
                email:yup.string().email('Invalid Email Address').required('Email is Required'),
                acceptedTerms:yup.boolean().required('Accept terms & conditions').oneOf([true],'You must accept terms & conditions'),
                jobType:yup.string().oneOf(['Designer','Developer','Product','Others'],'Invalid Job Type').required('Job Type is required')

            })}
            onSubmit={(values,{setSubmitting}) => {
                alert(JSON.stringify(values,null,2));
                setTimeout(() => {
                    alert(JSON.stringify(values,null,2));
                    setSubmitting(false)
                },400)
            }}
            >
                <Form>
                    <MyTextInput  label='First Name' name='firstName' type='text' placeholder='First Name'/>
                    <MyTextInput  label='Last Name' name='lastName' type='text' placeholder='Last Name'/>
                    <MyTextInput  label='Email' name='email' type='email' placeholder='Email'/>

                    <MyRadioInput label="Gender" name="gender">
                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                        <FormControlLabel value="others" control={<Radio />} label="Others" />
                    </MyRadioInput>

                    <MySelect label="Job Type" name="jobType">
                        <MenuItem value="">None</MenuItem>
                        <MenuItem value="Designer">Designer</MenuItem>
                        <MenuItem value="Developer">Developer</MenuItem>
                        <MenuItem value="Product">Product</MenuItem>
                        <MenuItem value="Others">Others</MenuItem>
                    </MySelect>

                    <MyCheckbox name="acceptedTerms" label="I accept the terms and conditions." />
                    <Button type='submit' color='secondary' variant='contained'>SUBMIT</Button>
                </Form>
            </Formik>
          </Card>
      </Box>
  )
};

export default Signup;
