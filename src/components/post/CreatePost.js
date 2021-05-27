import axios from "axios";
import styled from 'styled-components';
import { useState, useContext } from "react";

import UserContext from '../../contexts/UserContext';
import PostContext from '../../contexts/PostContext';

export default function CreatePost({reloadPosts}) {
    const { user } = useContext(UserContext);
    const { postsData, setPostsData } = useContext(PostContext);

    const [isLoading, setIsLoading] = useState(false);
    const [text, setText] = useState("");
    const [link, setLink] = useState("");

    function postIt(e) {
        e.preventDefault();
        setIsLoading(true);
        const body = {text, link};
        const config = { headers: { Authorization: `Bearer ${user.token}` } };

        const request = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts', body, config);

        request.then((response)=> {
            setIsLoading(false);
            setText("");
            setLink("");
            setPostsData([...postsData, response.data.post]);
            reloadPosts();
        })
        request.catch((error)=> {
            setIsLoading(false);
            alert('Houve um erro ao publicar seu link');
        })
    }
    return(
        <Conteiner>
            <img src={user.user.avatar} alt=""></img>
            <Title>O que você tem para favoritar hoje?</Title>
            <Form onSubmit={postIt}>
                <input
                    onChange={(e)=>setLink(e.target.value)}
                    value={link}
                    type="url"
                    pattern="https://.*"
                    required
                    placeholder="https://..."
                    disabled={isLoading ? (true) : (false)}
                ></input>
                <textarea
                    onChange={(e)=>setText(e.target.value)}
                    value={text}
                    placeholder="Muito irado esse link falando de #javascript"
                    disabled={isLoading ? (true) : (false)}
                ></textarea>
                <Button
                    isloading={isLoading}
                    type="submit"
                    disabled={isLoading ? (true) : (false)}
                >{isLoading ? "Publishing" : "Publicar"}</Button>
            </Form>
        </Conteiner>
    );
}

const Conteiner = styled.div`
    position: relative;
    height: 209px;
    width: 611px;
    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 16px;
    margin-bottom: 29px;
    padding-top: 21px;
    padding-bottom: 16px;
    padding-left: 86px;
    padding-right: 22px;
    img {
        position: absolute;
        top: 16px;
        left: 18px;
        width: 50px;
        height: 50px;
        border-radius: 25px;
    }
    @media(max-width: 611px) {
        width: 100vw;
        border-radius: 0px;
        padding-left: 15px;
        padding-right: 16px;
        img {
            display: none;
        }
    }
    @media(max-width: 331px) {
        height: 233px;
    }
`;

const Title = styled.div`
    font-family: Lato;
    font-weight: 300;
    font-size: 20px;
    line-height: 24px;
    color: #707070;
    @media(max-width: 611px) {
        text-align: center;
    }
`;

const Form = styled.form`
    width: 503px;
    height: 152px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    input, textarea {
        width: inherit;
        padding: 10px;
        color: #000000;
        margin-top: 10px;
        background: #EFEFEF;
        border: none;
        border-radius: 5px;
        color: #949494;
        font-family: Lato;
        font-weight: 300;
    }
    input {
        height: 30px;
    }
    textarea {
        height: 66px;
        resize: none;
    }
    @media(max-width: 611px) {
        width: calc(100vw - 37px);
    }
`;

const Button = styled.button`
    width: 112px;
    height: 31px;
    margin-top: 5px;
    background: ${props=> props.isloading ? "#18A9F2" : "#1877F2"};
    border: none;
    border-radius: 5px;
    text-align: center;
    color: #FFFFFF;
    font-family: Lato;
    font-size: 14px;
    line-height: 17px;
    cursor: ${props=> props.isloading ? "not-allowed" : "pointer"};
    opacity: ${props=> props.isloading ? 0.7 : 1};
    :hover{
        background-color:#18a9f2;
    }
`;