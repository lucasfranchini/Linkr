import axios from "axios";
import { useState, useContext, useEffect } from "react";
import UserContext from '../../contexts/UserContext';
import PostContext from '../../contexts/UserContext';

import Post from "./Post"

import styled from "styled-components";

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
    "posts": [
        {
            "id": 2,
            "text": "Never Gonna Give You Up #rickroll",
            "link": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            "linkTitle": "Rick Astley - Never Gonna Give You Up (Video)",
            "linkDescription": "Rick Astley's official music video for “Never Gonna Give You Up” Listen to Rick Astley: https://RickAstley.lnk.to/_listenYDSubscribe to the official Rick Ast...",
            "linkImage": "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
            "user": {
                "id": 1,
                "username": "teste",
                "avatar": "https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/1/avatar"
            },
            "likes": [
                {
                    "id": 1,
                    "userId": 1,
                    "postId": 2,
                    "createdAt": "2021-05-24T18:55:37.544Z",
                    "updatedAt": "2021-05-24T18:55:37.544Z",
                    "user.id": 1,
                    "user.username": "teste"
                }
            ]
        }
    ]
};

export default function TimeLinePage() {
    const { postsData, setPostsData } = useContext(PostContext);
    const { user } = useContext(UserContext);

    return (
        <Container>
            <Post/>
        </Container>
    );
};
const Container = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    width: 614px;
       
`