import axios from "axios";
import { useState } from "react";
import {Link, useHistory} from 'react-router-dom';

import Cover from './Cover';
import validateEmail from '../validate/validateEmail';
import validateURL from '../validate/validateURL';
import styled from "styled-components";
import {Container, Form, Button} from './styles/LogInAndSignUpStyle';

export default function SignUpPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUserName] = useState('');
    const [pictureUrl, setPictureUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();

    function signUp(e) {
        e.preventDefault();
        if (username && password && validateEmail(email) && validateURL(pictureUrl)){
            setIsLoading(true);
            const body = {
                email,
                password,
                username,
                pictureUrl
            };
            const request = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/sign-up', body);
            request.then((response)=> {
                if (response.status === 200){
                    setIsLoading(false);
                    history.push("/");
                } else {
                    alert(response.status);
                }
            });
            request.catch((error)=> {
                if(error.response.status === 403) {
                    alert('This e-mail is already in use, please proceed to log in page or use a different e-mail address');
                } else {
                    alert(error.response.status);
                }
                setIsLoading(false);
            })
        }
        if (!validateEmail(email)){
            alert("Please, provide your e-mail");
            return;
        }
        if (!password){
            alert("Please, enter a password");
            return;
        }
        if (!username){
            alert("Please, tell us your username");
            return;
        }
        if (!validateURL(pictureUrl)){
            alert("Please, provide a valid picture URL");
            return;
        }
    }
    return(
        <SignUpContainer>
            <Cover />
            <Form onSubmit={signUp}>
                <input onChange={(e)=>setEmail(e.target.value)} value={email} type="text" placeholder="e-mail" ></input>
                <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" placeholder="password"></input>
                <input onChange={(e)=>setUserName(e.target.value)} value={username} type="text" placeholder="username"></input>
                <input onChange={(e)=>setPictureUrl(e.target.value)} value={pictureUrl} type="text" placeholder="picture url"></input>
                <Button isloading={isLoading} type="submit">Sign Up</Button>
                <Link to='/'><p>Switch back to log in</p></Link>
            </Form>
        </SignUpContainer>
    );
}
const SignUpContainer = styled(Container)`
    @media(max-width: 600px) {
        p{
            margin:0 0 36px 0;
        }
    }
`