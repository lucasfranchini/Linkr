import axios from "axios";
import { useState, useContext } from "react";
import {Link, useHistory} from 'react-router-dom';

import Cover from './Cover';
import UserContext from '../../contexts/UserContext';
import ValidateEmail from '../../components/validate/ValidateEmail';

import styled from "styled-components";

export default function LogInPage() {
    const { setUser, setIsLoading, isLoading } = useContext(UserContext);
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function login(e) {
        e.preventDefault();
        if (ValidateEmail(email) && password){
            setIsLoading('true');
            const body = {email, password};
            const request = axios.post('', body);
            request.then((response)=> {
                setIsLoading('false');
                setUser({...response.data});
                history.push('/timeline');
            })
            request.catch((error)=> {
                setIsLoading('false');
                console.log(error);
                alert('Wrong e-mail or password, please try again');
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
            <Button isloading={isLoading} type="submit">Log In</Button>
            <Link to='/signup'><p>First time? Create an account!</p></Link>
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
    cursor: ${props=> props.isloading === "true" ? "not-allowed" : "pointer"};
    opacity: ${props=> props.isloading === "true" ? 0.7 : 1};
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
    padding:0 5% 0;
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