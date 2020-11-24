import React, { useState } from 'react'
import { CSSTransition } from 'react-transition-group';
import { auth } from '../../../../firebase';
import { FormInputButton, FormInputText } from '../../../inputs/input-text/inputs.styles'
import { DropdownContainer, DropDownMenuPage } from '../../../misc/containers.styles';

const Login = () => {
      const [loginVisible, setLoginVisible] = useState(false);

      const [height, setHeight] = useState(200);
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('')
      const inputStyles = {height: '50px', width: '70%', margin: '2%'};
      const loginUser = async e => {
            e.preventDefault()
            auth.signInWithEmailAndPassword(email, password)
            .then(user => {
                  console.log(user)
            }).catch(error => {
                  console.log(error)
            })
            
      }

      return (
            <DropdownContainer height={height} onClick={(e) => e.stopPropagation()} onAnimationEnd={() => setLoginVisible(true)} >

            <CSSTransition
                  classNames='menu'
                  in={loginVisible}
                  timeout={500}
                  unmountOnExit
                  onEntering={e => setHeight(e.clientHeight)}

            >
                  <DropDownMenuPage>
                        <h2 style={{ margin: '2%'}}>Log In</h2>
                        <form 
                              style={{
                                    width: '100%', 
                                    height: '80%', 
                                    display: 'flex', 
                                    flexDirection: 'column', 
                                    alignItems: 'center', 
                                    justifyContent: 'space-evenly'
                              }}
                              onSubmit={e => loginUser(e)}
                        >
                        <label>Email</label>
                        <FormInputText style={inputStyles} type='email' value={email} onChange={e => setEmail(e.target.value)}/>
                        <label>Password</label>
                        <FormInputText style={inputStyles} type='password' value={password} onChange={e => setPassword(e.target.value)}/>
                        <FormInputButton style={inputStyles} >Log In</FormInputButton>
                        </form>
                  </DropDownMenuPage>
            </CSSTransition>
            </DropdownContainer>
      )
}

export default Login
