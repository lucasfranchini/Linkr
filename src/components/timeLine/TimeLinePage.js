import axios from "axios";
import { useState, useContext, useEffect } from "react";
import UserContext from '../../contexts/UserContext';
import PostContext from '../../contexts/PostContext';

import Post from "./Post";
import PageTitle from "./PageTitle";
import CreatePost from "../post/CreatePost";

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
                                    <Post key={p.id.toString()} props={p} userInfo={user} />
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
                <TrendingTopics>
                    <TrendingTitle>
                        <h1>trending</h1>
                    </TrendingTitle>
                    <TrendingList>
                        <h1># javascript</h1>
                        <h1># react</h1>
                        <h1># react-native</h1>
                        <h1># material</h1>
                        <h1># web-dev</h1>
                        <h1># mobile</h1>
                        <h1># css</h1>
                        <h1># html</h1>
                        <h1># node</h1>
                        <h1># sql</h1>
                    </TrendingList>
                </TrendingTopics>
            </Page>
        );
    }
};

const Page = styled.div`
    display: flex;
    max-width: 940px;
    margin: 0px auto;
`;

const Container = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    margin:0px;
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
const TrendingTopics = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 301px;
    height: 406px;
    margin-top: 232px;
    margin-left: 25px;
    background: #484848;
    border-radius: 16px;
`;

const TrendingTitle = styled.div`
    height: 61px;
    background: #171717;
    border-radius: 16px 16px 0px 0px;
    h1 {
        margin-top: 9px;
        margin-left: 16px;
        color: #FFFFFF;
        font-family: Oswald;
        font-weight: bold;
        font-size: 27px;
        line-height: 40px;
    }
`;

const TrendingList = styled.div`
    height: 344px;
    background: #171717;
    border-radius: 0px 0px 16px 16px;
    padding-top: 22px;
    padding-left: 16px;
    padding-bottom: 30px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    h1 {
        color: #FFFFFF;
        font-family: Lato;
        font-weight: bold;
        font-size: 19px;
        line-height: 23px;        
    }
`;