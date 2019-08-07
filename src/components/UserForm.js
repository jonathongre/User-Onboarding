import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Field, withFormik, setNestedObjectValues } from 'formik';
import * as Yup from 'yup';

const UserForm = ({ values, errors, touched, status }) => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        if (status) {
            setUsers([...users, status])
        }
    }, [status]);

    return (
        <>
        <div>
            <Form>
                <label>
                    Full Name
                    {touched.name&& errors.name && <p>{errors.name}</p>}
                    <Field type='text' name='name' placeholder='Name' />
                </label>
                <label>
                    Email
                    {touched.email && errors.email && <p>{errors.email}</p>}
                    <Field type='email' name='email' placeholder='Email' />
                </label>
                <label>
                    Password
                    {touched.password && errors.password && <p>{errors.password}</p>}
                    <Field type='password' name='password' placeholder='Password' />
                    </label>
                <label>
                    <Field type='checkbox' name='tos' checked={values.tos} />
                    Accept Terms of Service
                </label>
                <button type='submit'>Submit</button>
            </Form>
        </div>

        <div>
            <h1>Users</h1>
            {users
                ? users.map(user => (
                    <p key={user.id}>
                    Name: {user.name}
                    </p>
                ))
            : null}
        </div>
        </>
    )
}

const FormikUserForm = withFormik({
    mapPropsToValues({ name, email, password, tos, users }) {
        return {
            name: name || '',
            email: email || '',
            password: password || '',
            tos: tos || false,
            users: users || ''
        };
    },

    validationSchema: Yup.object().shape({
        name: Yup.string()
        .min(6, 'First and last name required')
        .required('Name is required'),
        email: Yup.string()
        .email('Email not valid')
        .required('Email is required'),
        password: Yup.string()
        .min(8, 'Password must be 8 character or longer')
        .required('Password is required')
    }),

    handleSubmit(values, { resetForm, setStatus })  {
        axios
        .post('https://reqres.in/api/users', {
            name: values.name,
            email: values.email,
            password: values.password,
            tos: values.tos
        })
        .then(response  => { 
            console.log(response.data)
            setStatus(response.data)
        })
        .catch(error => {
            console.log(error);
        });
        resetForm();
    }

})(UserForm)

export default FormikUserForm