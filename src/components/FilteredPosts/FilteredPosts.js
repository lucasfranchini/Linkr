import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import styled from "styled-components";
import PostContext from "../../contexts/PostContext";
import UserContext from "../../contexts/UserContext";
import Post from "../timeLine/Post";
import TrendingTopics from "../timeLine/TrendingTopics";

export default function FilteredPosts({url,newTitle}){
    let local = useLocation().pathname;
    const {user} = useContext(UserContext);
    const {id,hashtag} = useParams();
    const [title,setTitle]=useState("");
    const { postsData, setPostsData } = useContext(PostContext);
    
    
    useEffect(()=>{
        const headers = {headers:{Authorization: `Bearer ${user.token}`}}
        if(local==="/my-posts" || local==="/my-likes"){
            setTitle(newTitle);
            const promise = axios.get(url,headers);
            promise.then(answer=>{
                setPostsData(answer.data.posts)
            })
        }
        else if(local===`/user/${id}`){
            const promise = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/${id}`,headers);
            promise.then(answer=>{
                setTitle(`${answer.data.user.username}'s posts`)
                const promise = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/${id}/posts`,headers);
                promise.then(answer=>{
                    setPostsData(answer.data.posts)
                })
            });
        }
        else if(local===`/hashtag/${hashtag}`){
            setTitle(`# ${hashtag}`)
            const promise = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/hashtags/${hashtag}/posts`,headers);
            promise.then(answer=>{
                setPostsData(answer.data.posts)
            })
        }
    },[local,id,hashtag,user.token,newTitle,setPostsData,url]);
    
    return (
        <Body>
            <Title>
                {title}
            </Title>
            <Content>
                <Posts>
                    {postsData.map(p=><Post key={p.id} post={p} userInfo={user} />)}
                </Posts>
                <TrendingTopics user={user}/>
            </Content>
        </Body>
    );
}
const Body =  styled.div`
    width: 940px;
    margin: 125px auto;
    @media(max-width:940px){
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

`
const Title = styled.h1`
    font-family: 'Oswald', sans-serif;
    color: #fff;
    font-size: 43px;
    font-weight: 700;
    line-height: 64px;
    margin-bottom: 43px;
    @media(max-width:940px){
        width: 612px;
    }
    @media(max-width:612px){
        width: 100%;
        padding-left: 15px;
    }
`
const Posts =  styled.div`
    display:flex;
    flex-direction:column;
    align-items:flex-start;
    justify-content:center;
    
`
const Content = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    >div{
        margin:0;    
    }
`