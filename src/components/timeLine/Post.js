import { useState, useContext, useEffect } from "react";
import PostContext from '../../contexts/UserContext';

import {FaRegHeart} from 'react-icons/fa'
import styled from "styled-components";
import ReactHashtag from 'react-hashtag';

const userObj =
{
    "token": "token-gerado",
    "user": {
        "id": 1,
        "email": "teste@teste.com",
        "username": "teste",
        "avatar": "https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/1/avatar"
    }
};
const postObj = {
    posts: [
        {
        id: 2,
        text: "Never Gonna Give You Up #rickroll",
        link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        linkTitle: "Rick Astley - Never Gonna Give You Up (Video)",
        linkDescription: "Rick Astley's official music video for “Never Gonna Give You Up” Listen to Rick Astley: https://RickAstley.lnk.to/_listenYDSubscribe to the official Rick Ast...",
        linkImage: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
        user: {
            id: 1,
            username: "teste",
            avatar: "https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/1/avatar"
            },
        likes: [
                {
                id: 1,
                userId: 1,
                postId: 2,
                createdAt: "2021-05-24T18:55:37.544Z",
                updatedAt: "2021-05-24T18:55:37.544Z",
                "user.id": 1,
                "user.username": "teste"
                }
            ]
        }
    ]
};

export default function Post(props) {
    
    const { postsData, setPostsData } = useContext(PostContext);


    return (
        <>
            {postObj.posts.map(({id,
            text, 
            link, 
            linkTitle, 
            linkDescription, 
            linkImage, 
            user,
            likes 
            }) => {
                return (
                    <Container key={id.toString()}>
                        <PostCreator key={user.id.toString()}>
                            <img src={user.avatar}></img>
                            <FaRegHeart/>
                            <p>{14} Likes</p>
                        </PostCreator>
                        <PostContent>
                            <h3>{user.username}</h3>
                            <p>
                                <ReactHashtag onHashtagClick={val => alert(val)}>
                                    {text}
                                </ReactHashtag>
                            </p>
                            <PostSnippet>
                                <SpinnetContent>
                                    <span>
                                        {linkTitle}
                                    </span>
                                    <p>
                                        {linkDescription}
                                    </p>
                                    <a href={link}>
                                        {link}   
                                    </a>
                                </SpinnetContent>
                            <SnippetImg src={linkImage}></SnippetImg>
                            </PostSnippet>
                        </PostContent>
                    </Container>
                )
            })}
        </>
       
    );
};
const Container = styled.div`
    font-family: Lato;
    font-weight: 400;
    letter-spacing: 0em;
    color:#FFF;
    width: 612px;
    height: 276px;
    margin-bottom: 16px;
    padding: 16px 20px 20px 18px ;
    background: #171717;
    border-radius: 16px;
    display:flex;
    align-items: center;
    justify-content:center;
`
const PostCreator = styled.div`
    width: 612px;
    height: 100%;
    display:flex;
    flex-direction:column;
    align-items: center;
    justify-content:start;
    img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-bottom: 18px;
    }
    svg {
        height: 20px;
        width: 20px;
    }
    p {
        margin-top: 4px;
        font-size: 11px;
        line-height: 13px;
    }
`
const PostContent = styled.div`
    width: 504px;
    height: 236px;
    margin-left:20px;
    display:flex;
    flex-direction:column;
    align-items: flex-start;
    justify-content:space-between;
    h3 {
        font-size: 19px;
        line-height: 23px;
        color: #FFFFFF;
    }
    p{
        font-size: 17px;
        line-height: 20px;
        color: #B7B7B7;
    }
    span { //hashtag Style
        color:#FFF;
        font-weight: 700;
    }
`
const PostSnippet = styled.div`
    padding-left: 20px;
    width: 502px;
    height: 154px;
    border: 1px solid #4D4D4D;
    border-radius: 11px;
    display:flex;
    align-items: center;
    justify-content:space-between;
`
const SpinnetContent = styled.article`
    margin:24px 28px 23px 0;
    display:flex;
    flex-direction:column;
    align-items:flex-start;
    justify-content:space-between;
    span{
        font-size: 16px;
        line-height: 19px;
        color: #CECECE;
    }
    p{
        font-size: 11px;
        line-height: 13px;
        color: #9B9595;
        margin:6px 0 14px;
    }
    a{
        font-size: 11px;
        line-height: 13px;
        margin:0;
        color: #CECECE;
    }
`
const SnippetImg = styled.img`
    height:154px;
    width: 154px;
    border-radius: 0px 12px 13px 0px;
`