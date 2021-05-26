import axios from "axios";
import { useState, useContext, useEffect } from "react";
import UserContext from '../../contexts/UserContext';
import PostContext from '../../contexts/UserContext';

import Post from "./Post";
import PageTitle from "./PageTitle";

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
            const data = response.data.posts;
            setPostsData([...data])
            if (data.length > 0){
                setIsLoaded(1);
            } else if (data.length === 0){
                setIsLoaded(2)
            }
        }) 
        request.catch((error)=>{
            if (error.response) {
                setIsLoaded(3)
            }
        })
    },[user.token])

    if(user){
        return (
            <Container>    
                <PageTitle title="timeline"/>
                {/* Inserir componente para criar novos posts Aqui */}
                <PostsContainer>
                    {isLoaded === 1 ? 
                        postsData.map((p) => {
                            return (
                                <Post key={p.id.toString()} props={p} />
                            )
                        }) : 
                        (isLoaded === 2) ?
                        <PageTitle title="No post has been found yet! :("/> :
                        (isLoaded ===3) ? 
                        <PageTitle title="An unexpected error has occurred. Please, reload the page and try again!"/> :
                        <PageTitle title="Loading..."/>
                    }
                </PostsContainer>
            </Container>
        );
    }
};
const Container = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    margin:0 auto;
    width: 614px;
`
const PostsContainer = styled.div`
    display:flex;
    flex-direction:column;
    align-items:flex-start;
    justify-content:center;
    width: 100%;
`
