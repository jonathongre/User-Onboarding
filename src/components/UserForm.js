import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Field, withFormik } from 'formik';
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
                
                <h1>Character Selection</h1>
                <div className='inputs'>
                <div className='login-info'>
                    <h2>User Login</h2>
                    <label>
                        Full Name
                        {touched.name&& errors.name && <p className='error'>{errors.name}</p>}
                        <Field className='field-input' type='text' name='name' placeholder='Name' />
                    </label>
                    <label>
                        Email
                        {touched.email && errors.email && <p className='error'>{errors.email}</p>}
                        <Field className='field-input' type='email' name='email' placeholder='Email' />
                    </label>
                    <label>
                        Password
                        {touched.password && errors.password && <p className='error'>{errors.password}</p>}
                        <Field className='field-input' type='password' name='password' placeholder='Password' />
                    </label>
                </div>
                
                <div className='charcter-selection'>
                    <h2>Character</h2>
                    <label>
                        Character Name
                        {touched.name&& errors.charname && <p className='error'>{errors.charname}</p>}
                        <Field className='field-input' type='text' name='charname' placeholder='Charcter Name' />
                    </label>
                    <label>
                    Charcter Race
                    <Field className='dropdown' component="select" name="race">
                            
                            <option>Choose Race</option>
                            <option value="Human">Human</option>
                            <option value="Elf">Elf</option>
                            <option value="Dwarf">Dwarf</option>
                    </Field>
                    </label>
                    <label>
                    Charcter Class
                    <Field className='dropdown' component="select" name="charclass">
                            
                            <option>Choose Class</option>
                            <option value="Warrior">Warrior - Tank/Damage</option>
                            <option value="Paladin">Paladin - Tank/Damage/Healer</option>
                            <option value="Mage">Mage - Damage</option>
                            <option value="Priest">Priest - Damage/Healer</option>
                            <option value="Archer">Archer - Damage</option>
                            <option value="Rouge">Rouge - Damage</option>
                    </Field>
                    </label>
                </div>
                </div>
                <div className='submit'>
                <label>
                    <Field type='checkbox' name='tos' checked={values.tos} />
                    Accept Terms of Service
                </label>
                <button type='submit'>Submit</button>
                </div>
            </Form>
        </div>

        <div className='users'>
            <h1>Players</h1>
            <div className='char-card'>
            {users
                ? users.map(user => (
                    
                    <div className='user-info' key={user.id}>
                    <h4>User Name: {user.name}</h4>
                    <hr />
                    <h5>Charcter Name: {user.charname}</h5>
                    <h5>Race: {user.race}</h5>
                    <h5>Class: {user.charclass}</h5>
                    </div>
                    
                ))
            : null}
            </div>
        </div>
        </>
    )
}

const FormikUserForm = withFormik({
    mapPropsToValues({ name, email, password, tos, users, race, charname, charclass }) {
        return {
            name: name || '',
            email: email || '',
            password: password || '',
            tos: tos || false,
            charname: charname || '',
            race: race || '',
            charclass: charclass || '',
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
        .required('Password is required'),
        charname: Yup.string()
        .min(4, 'Name must be at least 4 characters')
        .required('Name is required'),
        race: Yup.string()
        .required('Please select a race'),
        charclass: Yup.string()
        .required('Please select a class')
    }),

    handleSubmit(values, { resetForm, setStatus })  {
        axios
        .post('https://reqres.in/api/users', {
            name: values.name,
            email: values.email,
            password: values.password,
            tos: values.tos,
            charname: values.charname,
            charclass: values.charclass,
            race: values.race,
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