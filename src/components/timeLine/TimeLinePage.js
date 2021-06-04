import axios from "axios";
import { useState, useContext, useEffect, useCallback } from "react";
import UserContext from '../../contexts/UserContext';
import PostContext from '../../contexts/PostContext';

import InfinitePosts from "./InfinitePosts";
import PageTitle from "./PageTitle";
import CreatePost from "../post/CreatePost";
import TrendingTopics from "./TrendingTopics";
import UserSearchMobile from "./UserSearchMobile";

import styled from "styled-components";

export default function TimeLinePage() {
    const { user: myUser } = useContext(UserContext);
    const { postsData, setPostsData } = useContext(PostContext);
    const [isLoaded, setIsLoaded] = useState(false);
    const [olderPost, setOlderPost] = useState('');
    const [newerPost, setNewerPost] = useState('');
    const axiosUrlPath = `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/following/posts`;
   
    function setupPostsId(data) {
        if (data && data.length>0){
            const older = data[data.length-1].id;
            setOlderPost(older);
            const newer = {id: data[0].id, repostId:data[0].repostId};
            setNewerPost(newer);
        }
    }

    const loadPosts = useCallback((config) => {
        const request = axios.get(axiosUrlPath, config);
        request.then((response)=>{
            const data = response.data.posts;
            setupPostsId(data);
            if (data.length > 0){
                setPostsData([...data]);
                setIsLoaded(1);
            } else if (data.length === 0){
                setIsLoaded(2);
            }
        }) 
        request.catch((error)=>{
            if (error.response) {
                setIsLoaded(3);
            }
        })
    },[setIsLoaded,setPostsData, axiosUrlPath]);

    useEffect(()=>{
        if(postsData!==null && postsData.find(p=>p.user.id!==myUser.user.id) === undefined){
            setIsLoaded(4)
        }
    },[postsData,setIsLoaded,myUser.user.id]);

    useEffect(()=>{
        if(myUser.config){
            loadPosts(myUser.config)
        }
    },[ myUser,setPostsData,loadPosts]);
    
    if(myUser){
        return (
            <Page >
                <Container>
                    <UserSearchMobile/>
                    <PageTitle title="timeline"/>
                    <CreatePost reloadPosts={loadPosts}/>
                    <PostsContainer>
                        {isLoaded === 1 
                            ?
                            <InfinitePosts
                                oldPost={olderPost}
                                newPost={newerPost}
                                isLoaded={isLoaded}
                                axiosUrlPath={axiosUrlPath}
                            />
                            : (isLoaded === 2) 
                            ? <PageTitle title="Nenhuma publicação encontrada"/>
                            : (isLoaded ===3) 
                            ? <PageTitle title="An unexpected error has occurred. Please, reload the page and try again!"/> 
                            : (isLoaded ===4)
                            ? <PageTitle title="Você não segue ninguém ainda, procure por perfis na busca"/> 
                            :<PageTitle title="Loading..."/>
                        }
                    </PostsContainer>
                </Container>
                <TrendingTopics user={myUser} />
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