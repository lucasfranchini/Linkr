import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import styled from "styled-components";
import UserContext from "../../contexts/UserContext";

export default function FilteredPosts(){
    let local = useLocation().pathname;
    const {user} = useContext(UserContext);
    const {id,hashtag} = useParams();
    const [title,setTitle]=useState("");
    console.log(local)
    console.log(user)
    useEffect(()=>{
        if(local==="/my-posts"){
            setTitle("My Posts");
        }
        else if(local===`/user/${id}`){
            const promise = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/${id}`,{headers:{Authorization: `Bearer ${user.token}`}});
            promise.then(answer=>{
                console.log(answer)
                setTitle(`${answer.data.user.username}'s posts`)
            })
        }
        else if(local===`/hashtag/${hashtag}`){
            setTitle(`# ${hashtag}`)
        }
        else if(local==="/my-likes"){
            setTitle("My Likes");
        }
    },[local,id,hashtag,user.token]);
    
    return (
        <Body>
            <Title>
                {title}
            </Title>
        </Body>
    );
}
const Body =  styled.div`
    width: 940px;
    margin: 125px auto;
    @media(max-width:940px){
        width: 100%;
    }

`
const Title = styled.h1`
    font-family: 'Oswald', sans-serif;
    color: #fff;
    font-size: 43px;
    font-weight: 700;
    line-height: 64px;
    margin-bottom: 43px;
`