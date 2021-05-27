import axios from "axios";
import { useState, useContext, useEffect } from "react";
import UserContext from '../../contexts/UserContext';
import PostContext from '../../contexts/PostContext';

import Post from "./Post";
import PageTitle from "./PageTitle";
import CreatePost from "../post/CreatePost";
import TrendingTopics from "./TrendingTopics";

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
    },[user.token, setPostsData])

    if(user){
        return (
            <Page >
                <Container>    
                    <PageTitle title="timeline"/>
                    <CreatePost/>
                    <PostsContainer>
                        {isLoaded === 1 ? 
                            postsData.map((p) => {
                                return (
                                    <Post key={p.id} post={p} userInfo={user} />
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
                <TrendingTopics user={user} />
            </Page>
        );
    }
};

const Page = styled.div`
    display: flex;
    justify-content: center;
    max-width: 940px;
    margin: 0px auto;
`;

const Container = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    margin: 0px auto;
    width: 614px;
    @media(max-width: 611px) {
        width:100%;
    }
`
const PostsContainer = styled.div`
    display:flex;
    flex-direction:column;
    align-items:flex-start;
    justify-content:center;
    width: 100%;
`