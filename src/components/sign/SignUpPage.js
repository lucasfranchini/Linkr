import axios from "axios";
import { useState } from "react";
import {Link, useHistory} from 'react-router-dom';

import Cover from './Cover';
import validateEmail from '../validate/validateEmail';
import validateURL from '../validate/validateURL';

import styled from "styled-components";

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
                    history.push("/");
                } else {
                    console.log(response);
                }
                setIsLoading(false);
            });
            request.catch((error)=> {
                if(error.response.status === 403) {
                    alert('This e-mail is already in use, please proceed to log in page or use a different e-mail address');
                } else {
                    console.log(error.response);
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
        <Container>
            <Cover />
            <Form onSubmit={signUp}>
                <input onChange={(e)=>setEmail(e.target.value)} value={email} type="text" placeholder="e-mail" ></input>
                <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" placeholder="password"></input>
                <input onChange={(e)=>setUserName(e.target.value)} value={username} type="text" placeholder="username"></input>
                <input onChange={(e)=>setPictureUrl(e.target.value)} value={pictureUrl} type="text" placeholder="picture url"></input>
                <Button isloading={isLoading} type="submit">Sign Up</Button>
                <Link to='/'><p>Switch back to log in</p></Link>
            </Form>
        </Container>
    );
}

const Container = styled.div`
    width:100%;
    height:100vh;
    display:flex;
    background:#333;
    @media(max-width: 600px) {
        display:flex;
        flex-direction:column;
        align-items: center;
        height:auto;
        bottom:0px;
    }
`
const Button = styled.button`
    width: 100%;
    height: 65px;
    background: #1877F2;
    border-radius: 6px;
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;
    letter-spacing: inherit;
    color: #FFF;
    border: none;
    cursor: ${props=> props.isloading ? "not-allowed" : "pointer"};
    opacity: ${props=> props.isloading ? 0.7 : 1};
    :hover{
        background-color:#18a9f2;
    }
`
const Form = styled.form`
    font-family: Oswald;
    font-size: 27px;
    font-weight: 700;
    line-height: 40px;
    letter-spacing: 0em;
    padding:0 5% 10%;
    width:70%;
    display:flex;
    align-items:center;
    justify-content:center;
    flex-direction:column;

    p:hover,button:hover{
        filter: contrast(140%);
    }
    p:active,button:active{
        filter: contrast(80%);
    }
    input {    
        font-family: inherit;
        font-size: inherit;
        font-weight: inherit;
        line-height: inherit;
        letter-spacing: inherit;
        margin-bottom:16px;
        width: 100%;
        height: 65px;
        background: #FFFFFF;
        border-radius: 6px;
        text-indent: 12px;
        outline:none;
    }
    input::placeholder{
        line-height: 40px;
        text-indent: 12px;
        color:#9F9F9F;
    }
    input:focus{
        box-shadow: inset 8px 0px 0px #52B6FF;
    }
    p{
        font-family: Lato;
        font-size: 20px;
        font-weight: 400;
        line-height: 24px;
        letter-spacing: 0em;
        text-decoration: underline;
        text-underline-offset: 0.1em;
        margin-top:25px;
        color: #FFFFFF;
    }
    @media(max-width: 600px) {
        width:100%;
        font-size: 22px;
        line-height: 33px;
        input,button,input::placeholder {
            height: 55px;
            font-size: 22px;
            line-height: 33px;
        }
        p{
            margin-top: 26px;
            font-size: 17px;
            line-height: 20px;
        }
    }
`