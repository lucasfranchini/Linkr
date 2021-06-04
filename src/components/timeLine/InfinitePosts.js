import axios from "axios";
import { useState, useContext, useCallback, useEffect } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';

import Post from "./Post";
import PageTitle from "./PageTitle";
import useInterval from './functions/useInterval';
import UserContext from '../../contexts/UserContext';
import PostContext from '../../contexts/PostContext';

export default function InfinitePosts({oldPost, newPost, axiosUrlPath}) {
    const { user: myUser } = useContext(UserContext);
    const { postsData, setPostsData } = useContext(PostContext);
    const [loadMore, setLoadMore] = useState(true);
    const [olderPost, setOlderPost] = useState(oldPost);
    const [newerPost, setNewerPost] = useState(newPost);
    const [offsetAmount, setOffsetAmount] = useState(10);

    useEffect(()=>{
        setOlderPost(oldPost)
        setNewerPost(newPost)
        setOffsetAmount(10)
    },[oldPost,newPost])

    function fetchOlderPosts(postId) {
        if (postId && axiosUrlPath){
            if (axiosUrlPath === `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/following/posts`){
                const request = axios.get(`${axiosUrlPath}?olderThan=${postId}`, myUser.config)
                request.then((response)=>{
                    const data = response.data.posts;
                    if (data.length < 10){
                        setLoadMore(false)
                    }
                    if (data.length > 0){
                        const older = data[data.length-1].id;
                        setOlderPost(older);
                        setPostsData([...postsData,...data])
                    }
                });
            } else {
                const request = axios.get(`${axiosUrlPath}?offset=${offsetAmount}`, myUser.config);
                request.then((response)=>{
                    const data = response.data.posts;
                    if (data.length < 10){
                        setLoadMore(false)
                    }
                    if (data.length > 0){
                        const older = data[data.length-1].id;
                        setOffsetAmount(offsetAmount+10)
                        setOlderPost(older);
                        setPostsData([...postsData,...data])
                    }
                });
            }
        }
    };

    const fetchNewerPosts = useCallback((postId)=>{
        if (postId && myUser.config && axiosUrlPath) {
            if (axiosUrlPath === `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/following/posts`){
                const request = axios.get(`${axiosUrlPath}?earlierThan=${postId.id}`, myUser.config)
                request.then((response)=>{
                    const data = response.data.posts;
                    if (data.length>0){
                        const newer = {id: data[0].id, repostId:data[0].repostId};
                        if (newer !== newerPost){
                            setNewerPost(newer);
                            setPostsData([...data,...postsData]);
                        }
                    }
                })
            }
        }
    },[setNewerPost, myUser.config, newerPost, postsData, setPostsData, axiosUrlPath])

    useInterval(() => {
        newerPost && fetchNewerPosts(newerPost)
    }, 15000);
    return (
        <InfiniteScroll
            dataLength={postsData.length}
            next={()=>fetchOlderPosts(olderPost)}
            hasMore={loadMore}
            loader={<PageTitle>Loading...</PageTitle>}
            scrollThreshold="300px">
            <>
                {postsData.map((p) => <Post key={p.repostId||p.id} post={p} userInfo={myUser} />)}
            </>
        </InfiniteScroll>
    );    
}