import axios from "axios";
import { useState, useContext } from "react";
import {Link, useHistory} from 'react-router-dom';

import Cover from './Cover';
import UserContext from '../../contexts/UserContext';
import ValidateEmail from '../../components/validate/ValidateEmail';
import ValidateURL from '../../components/validate/ValidateURL';

import styled from "styled-components";

export default function SignUpPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const history = useHistory();
    const { setIsLoading, isLoading } = useContext(UserContext);

    function signUp(e) {
        e.preventDefault();
        if (name && password && ValidateEmail(email) && ValidateURL(image)){
            setIsLoading(true);
            const body = {
                email,
                name,
                image,
                password
            };
            const request = axios.post('', body);
            request.then((response)=> {
                if (response.status === '201'){
                    history.push("/");
                } else {
                    console.log(response);
                }
                setIsLoading(false);
            });
            request.catch((error)=> {
                if(error.response.status === '400') {
                    alert('This e-mail is already in use, please proceed to log in page or use a different e-mail');
                } else {
                    console.log(error.response);
                }
                setIsLoading(false);
            })
        }
        if (!ValidateEmail(email)){
            alert("Please, provide your e-mail");
            return;
        }
        if (!password){
            alert("Please, enter a password");
            return;
        }
        if (!name){
            alert("Please, tell us your username");
            return;
        }
        if (!ValidateURL(image)){
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
                <input onChange={(e)=>setName(e.target.value)} value={name} type="text" placeholder="username"></input>
                <input onChange={(e)=>setImage(e.target.value)} value={image} type="text" placeholder="picture url"></input>
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