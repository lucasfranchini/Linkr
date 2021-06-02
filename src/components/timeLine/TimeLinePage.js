import axios from "axios";
import { useState, useContext, useEffect, useCallback } from "react";
import UserContext from '../../contexts/UserContext';
import PostContext from '../../contexts/PostContext';
import useInterval from './functions/useInterval';

import Post from "./Post";
import PageTitle from "./PageTitle";
import CreatePost from "../post/CreatePost";
import TrendingTopics from "./TrendingTopics";
import UserSearchMobile from "./UserSearchMobile";

import styled from "styled-components";
import InfiniteScroll from 'react-infinite-scroll-component';

export default function TimeLinePage() {
    const { user: myUser } = useContext(UserContext);
    const { postsData, setPostsData } = useContext(PostContext);
    const [isLoaded, setIsLoaded] = useState(false);
    const [olderPost, setOlderPost] = useState('');
    const [newerPost, setNewerPost] = useState('');
    const [loadMore, setLoadMore] = useState(true);

    const loadPosts = useCallback((config) => {
        
        const request = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/following/posts`, config);
        request.then((response)=>{
            const data = response.data.posts;
            const older = response.data.posts[response.data.posts.length-1].id;
            setOlderPost(older);
            const newer = response.data.posts[0].id;
            setNewerPost(newer);
            console.log(data, data.length, 'posts + qtd')
            setPostsData([...data]);
            if (data.length > 0){
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
    },[setIsLoaded,setPostsData]);

    function fetchOlderPosts(postId) {
        const request = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/following/posts?olderThan=${postId}`, myUser.config);
        request.then((response)=>{
            const data = response.data.posts;
            const older = data[data.length-1].id;
            setOlderPost(older);
            setPostsData([...postsData,...data])
            if (postsData.length < 10){
                setLoadMore(false)
            }
        });
    };
    console.log(postsData)
    function fetchNewerPosts(postId) {
        if (myUser.config) {
            const request = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/following/posts?earlierThan=${postId}`, myUser.config);
            request.then((response)=>{
                const data = response.data.posts;
                if (data.length>0){
                    const newer = data[0].id;
                    if (newer !== newerPost){
                        setNewerPost(newer);
                        setPostsData([...data,...postsData]);
                    }
                }
            })
        }
    }

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
    
    useInterval(() => {fetchNewerPosts(newerPost)}, 15000);

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
                            <InfiniteScroll
                                dataLength={postsData.length}
                                next={()=>fetchOlderPosts(olderPost)}
                                hasMore={loadMore}
                                loader={<PageTitle>Loading...</PageTitle>}
                                scrollThreshold="300px">
                                <>
                                    {postsData.map((p) => <Post reloadPosts={loadPosts} key={p.repostId||p.id} post={p} userInfo={myUser} />)}
                                </>
                            </InfiniteScroll>
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