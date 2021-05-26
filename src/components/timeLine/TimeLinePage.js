import axios from "axios";
import { useState, useContext, useEffect } from "react";
import UserContext from '../../contexts/UserContext';
import PostContext from '../../contexts/UserContext';

import Post from "./Post"

import styled from "styled-components";

export default function TimeLinePage() {
    const { user } = useContext(UserContext);
    const { postsData, setPostsData } = useContext(PostContext);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(()=>{
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        };
        const request = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts', config)
        request.then((response)=>{
            const data = response.data.posts
            setPostsData([...data])
            if (data.length > 0){
                setIsLoaded(true);
            }
        })
    },[user.token])

    if(user){
        return (
            <Container>
                {isLoaded ? 
                    postsData.map((p) => {
                        return (
                            <Post key={p.id.toString()} props={p} />
                        )
                    }) :
                    <span>Carregando...</span>
                }
            </Container>
        );
    } else{
        <span>Log in again.</span>
    }
};

const Container = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    width: 614px;
       
`