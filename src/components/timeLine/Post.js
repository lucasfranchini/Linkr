import axios from 'axios'

import { useState, useContext, useCallback} from "react";
import { useHistory, Link } from "react-router-dom";

import DeletePost from "../post/DeletePost";

import {SnippetImg, SpinnetContent, PostSnippet, PostContent, PostCreator, Container} from './styles/postStyle';
import {FaRegHeart,FaHeart} from 'react-icons/fa'
import styled from 'styled-components'
import ReactHashtag from 'react-hashtag';
import UserContext from "../../contexts/UserContext";
import { useEffect } from "react/cjs/react.development";

import ReactTooltip from 'react-tooltip';

export default function Post(props) {
    const {id, text, link, linkTitle, linkDescription, linkImage, user, likes} = props.post;
    const history = useHistory();
    const {user: myUser} = useContext(UserContext);
    const [iLike, setILike] = useState(false);
    const [postLikes, setPostLikes] = useState(likes);
    const [toolTipText, setToolTipText] = useState('this post is not liked yet')
    
    const createTipText = useCallback((list) => {
        const userList = []
        let text = "";
        if (list && list.length !== 0){
            list.forEach((u)=> {
                if(u.userId === myUser.user.id){
                    userList.push('You')
                }else{
                    userList.push(u['user.username']||u.username)
                }
            })
        }
        if (userList.length === 0){
            text = 'Do you like this post?' 
        } else if (userList.length === 1 && !userList.includes('You')){
            text = `${userList[0]}`
        } else if (userList.length === 2 && !userList.includes('You')){
            text = `${userList[0]} and ${userList[1]}`
        } else if (userList.length > 2 && !userList.includes('You')){
            text = `${userList[0]} and ${userList[1]} other ${userList.length-2} people`
        } else if (userList.length === 1 && userList.includes('You')){
            text = `You`
        } else if (userList.length === 2 && userList.includes('You')){
            text = `You and ${userList[1]}`
        } else if (userList.length > 2 && userList.includes('You')){
            text = `You, ${userList[1]} and other ${userList.length-2} people`
        }
        setToolTipText(text);
    },[setToolTipText,myUser.user.id])

    const verifyLike = useCallback((list) => { 
        let c=0;
        if(list && list.length === 0){
            setILike(false);
        }
        if(list && list.length !== 0){
            list.forEach((i)=>{
                if(i.userId === myUser.user.id){
                setILike(true);
                c++
                }
            })
            if (c===0){
                setILike(false);
            }
        }
    }, [setILike,myUser.user.id])

    useEffect(()=>{
        createTipText(postLikes)
        verifyLike(postLikes)
    },[verifyLike,postLikes,createTipText])
    
    function goToUrl(tag) {
        const hashtag = tag.replace('#','')
        history.push(`/hashtag/${hashtag}`)
    }

    function toggleLike(id) {
        const url = iLike
        ? `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${id}/dislike`
        : `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${id}/like`;

        const config = {
            headers: {
                Authorization: `Bearer ${myUser.token}`
            }
        };
        const request = axios.post(url,{}, config)
        request.then((response)=>{
            setPostLikes(response.data.post.likes)
            verifyLike(response.data.post.likes)
        })
    }
        return (
            <Container key={id.toString()}>
                <div>
                    <PostCreator >
                        <Link to={`/user/${user.id}`}><img src={user.avatar} alt={user.username}/></Link>
                        <LikeButton checked={iLike} onClick={()=>toggleLike(id)}>
                            {iLike ? <FaHeart /> :<FaRegHeart/>}
                        </LikeButton>
                        <p 
                        data-for="post-likes"
                        data-tip={toolTipText}
                        data-iscapture="true"
                            >{postLikes ? postLikes.length : 0} Likes</p>
                        <ToolTipComponent 
                        className='customeTheme'
                        id="post-likes"
                        effect="solid"
                        multiline={false}
                        />
                    </PostCreator>
                    <PostContent>
                        {user.id === myUser.user.id ? <DeletePost postId={id} userToken={myUser.token} /> : () => {return(<></>)}}
                        <Link to={`/user/${user.id}`}><h3>{user.username}</h3></Link>
                        <p>
                            <ReactHashtag onHashtagClick={(val) => goToUrl(val)}>
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
                                <a href={link} target="_blank" rel="noopener noreferrer">
                                    {link}   
                                </a>
                            </SpinnetContent>
                            <SnippetImg src={linkImage} alt={linkTitle}></SnippetImg>
                        </PostSnippet>
                    </PostContent>
                </div>
            </Container>
        );
};
const LikeButton = styled.div`
    color: ${(props)=>(props.checked ? '#AC0000' : '#FFFFFF' )};
`
const ToolTipComponent = styled(ReactTooltip)`
    &.customeTheme{
        background: rgba(255, 255, 255, 0.9 ) !important;
        border-radius: 3px !important;
        color: #505050 !important;
        &.place-bottom {
            font-family: Lato !important;
            font-size: 11px;
            font-weight: 700;
            line-height: 13px;
            letter-spacing: 0em;
            &:after {
            border-bottom-color: rgba(255, 255, 255, 0.9) !important;
            border-bottom-style: solid !important;
            border-bottom-width: 6px !important;
            }
        }
    }
    @media(max-width: 611px) {
        &.place-right {
            &:after {
            border-right-color: rgba(255, 255, 255, 0.9) !important;
            border-right-style: solid !important;
            border-right-width: 6px !important;
            }
        }
    }
`