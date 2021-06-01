import axios from "axios";
import { useState, useContext, useEffect } from "react";
import {Link, useHistory} from 'react-router-dom';

import Cover from './Cover';
import UserContext from '../../contexts/UserContext';
import validateEmail from '../validate/validateEmail';

import {Container, Form, Button} from './styles/LogInAndSignUpStyle';

export default function LogInPage() {
    const { user,setUser } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(()=>{
        if(user!==null){
            history.push('/timeline');
        }
    },[user,history]);

    function login(e) {
        e.preventDefault();
        if (validateEmail(email) && password){
            setIsLoading(true);
            const body = {email, password};
            const request = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/sign-in', body);
            request.then((response)=> {
                setIsLoading(false);
                setUser({...response.data});
                localStorage.setItem('user',JSON.stringify(response.data));
                history.push('/timeline');
            })
            request.catch((error)=> {
                setIsLoading(false);
                if(error.response.status === 504){
                    alert('We will be up and running once our friends fix theirs Infinite Loops. It might take a while!')
                }else if(error.response.status === 403){
                    alert('Wrong e-mail or password, please try again');
                }
            })
        } else {
            alert('Please enter your e-mail and password');
        }
    }
    return (
    <Container>
        <Cover />
        <Form onSubmit={login}>
            <input onChange={(e)=>setEmail(e.target.value)} value={email} type="text" placeholder="e-mail" ></input>
            <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" placeholder="password"></input>
            <Button isloading={isLoading} disabled={isLoading} type="submit">Log In</Button>
            <Link to='/signup'><p>First time? Create an account!</p></Link>
        </Form>
    </Container>
    );
}