import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const UserForm = ({
    addUser,
    selectedUser,
    updateUser,
    toggleModalForm,
    deselectUser
}) => {

    const { register, handleSubmit, formState: { errors }, reset } = useForm()

    useEffect(() => {
        if (selectedUser) {
            reset({
                email: selectedUser.email,
                password: selectedUser.password,
                first_name: selectedUser.first_name,
                last_name: selectedUser.last_name,
                birthday: selectedUser.birthday
            })
        }
        else {
            reset({
                    email: '',
                    password: '',
                    first_name: '',
                    last_name: '',
                    birthday: ''
                })
        }
    }, [selectedUser])


    const onSubmit = (user) => {

        if (selectedUser) {
            updateUser(user)
            toggleModalForm()
        }
        else {
            addUser(user)
            reset()
            toggleModalForm()
        }
    }

    const cancelSubmit = ()=>{
        toggleModalForm()
        deselectUser()
        // reset(defaultValues)
    }


    return (
        <div className='overlay'>
            <form onSubmit={handleSubmit(onSubmit)} className='user-form'>
                <div className='form-header'>
                    <h2>
                        {selectedUser ? 'Edit User' : 'New User'}
                    </h2>
                    <button
                        type='button'
                        className='close-button'
                        onClick={()=>cancelSubmit()}
                    >
                        <i className="fa-solid fa-xmark fa-2xl"></i>
                    </button>
                </div>
                <label htmlFor='email'>E-Mail</label>
                <input
                    type={'email'}
                    id="email"
                    name='email'
                    {...register("email", {
                        required: { value: true, message: 'E-mail is required' }
                    })}
                />
                <p>{errors.email?.message}</p>
                <label htmlFor='password'>Password</label>
                <input
                    type={'password'}
                    id="password"
                    name='password'
                    {...register("password", {
                        required: { value: true, message: 'Password is required' }
                    })}
                />
                <p>
                    {errors.password?.message}
                </p>
                <label htmlFor='firstName'>First Name</label>
                <input
                    type={'text'}
                    id="firstName"
                    name='first_name'
                    {...register("first_name", {
                        required: { value: true, message: 'First Name is required' }
                    })}
                />
                <p>
                    {errors.first_name?.message}
                </p>
                <label htmlFor='lastName'>Last Name</label>
                <input
                    type={'text'}
                    id="LastName"
                    name='last_name'
                    {...register("last_name", {
                        required: { value: true, message: 'Last Name is required' }
                    })}
                />
                <p>
                    {errors.last_name?.message}
                </p>
                <label htmlFor='birthday'>Birthday</label>
                <input
                    type={'date'}
                    id="birthday"
                    name='birthday'
                    {...register("birthday", {
                        required: { value: true, message: 'Birthday is required' }
                    })}
                />
                <p>
                    {errors.birthday?.message}
                </p>
                <button className='submit-button'>
                    {selectedUser ? 'Save Changes' : 'Add New User'}
                </button>
            </form>
        </div>

    );
};

export default UserForm;