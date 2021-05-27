import styled from "styled-components";

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
    margin-bottom:25px;
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
export {Container, Form, Button}