import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { auth } from '../../firebase';
import { setUser } from '../../redux/auth-redux/auth.actions';
import { FormInputButton, FormInputText } from '../inputs/input-text/inputs.styles';

const SignupForm = () => {
      const [username, setUsername] = useState('');
      const [password, setPassword] = useState('');
      const [email, setEmail] = useState('');
      const dispatch = useDispatch();
      const inputStyles = {height: '50px', width: '70%', margin: '2%'};
      const formStyles = {width: '100%', height: '80%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly'}

      const handleSumbit = (e) => {
            e.preventDefault();
            auth.createUserWithEmailAndPassword(email, password)
            .then(result => {
                  return result.user.updateProfile({
                        displayName: username
                  }).then(result => dispatch(setUser({...result, displayName: username})))
                  .catch(error => console.log(error))
            })
            .catch(error => console.log(error));
      }

      return (
            <React.Fragment>
                  <h2 style={{ margin: '2%'}}> Sign Up </h2>

                  <form style={formStyles} onSubmit={e => handleSumbit(e)} >
                        <label style={{margin: '1%'}} htmlFor='username'> Username </label>

                        <FormInputText style={inputStyles} id="username" value={username} type="text" onChange={e => setUsername(e.target.value)}/>

                        <label style={{margin: '1%'}} htmlFor="email"> Email </label>

                        <FormInputText style={inputStyles} id='email' type="email" value={email} onChange={e => setEmail(e.target.value)}/>

                        <label style={{margin: '1%'}} htmlFor='password'> Password </label>

                        <FormInputText type='password' style={inputStyles} id="password" value={password} onChange={e => setPassword(e.target.value)}/>

                        <FormInputButton style={inputStyles}>Log In</FormInputButton>
                  </form>
            </React.Fragment>
      )
}

export default SignupForm
