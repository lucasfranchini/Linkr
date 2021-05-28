import React, { useState, useContext, useRef, useEffect, useCallback} from "react";
import PostContext from '../../contexts/PostContext';
import { useHistory, Link } from "react-router-dom";
import axios from "axios";

import DeletePost from "../post/DeletePost";

import {SnippetImg, SpinnetContent, PostSnippet, PostContent, PostCreator, Container, EditButton, Form} from './styles/postStyle';
import {FaRegHeart,FaHeart} from 'react-icons/fa';
import {TiPencil} from 'react-icons/ti';
import styled from 'styled-components'
import ReactHashtag from 'react-hashtag';
import UserContext from "../../contexts/UserContext";

import ReactTooltip from 'react-tooltip';

export default function Post(props) {
    const {id, text, link, linkTitle, linkDescription, linkImage, user, likes} = props.post;
    const history = useHistory();
    const {user: myUser} = useContext(UserContext);
    const [iLike, setILike] = useState(false);
    const [postLikes, setPostLikes] = useState(likes);
    const [toolTipText, setToolTipText] = useState('this post is not liked yet')
    const { postsData, setPostsData } = useContext(PostContext);
    const [isInEditMode, setIsInEditMode] = useState(false);
    const [newPostText, setNewPostText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [postText, setPostText] = useState(text);
    const [checker, setChecker] = useState(0);
    const buttonRef = useRef();
    const inputRef = useRef();
    useEffect(()=>{
        setPostLikes(likes)
    },[likes,setPostLikes])
    console.log(postLikes)

    const createTipText = useCallback((list) => {
        const userList = []
        let filteredList = []
        let text = "";
        if (list && list.length !== 0){
            list.forEach((u)=> {
                if(u.userId === myUser.user.id){
                    userList.push('You')
                }else{
                    userList.push(u['user.username']||u.username)
                }
            })
            filteredList = userList.filter((u)=> u !== 'You');
        }
        if (userList.length === 0){
            text = 'Do you like this post?' 
        } else if (userList.length === 1 && !userList.includes('You')){
            text = `${filteredList[0]}`
        } else if (userList.length === 2 && !userList.includes('You')){
            text = `${filteredList[0]} and ${filteredList[1]}`
        } else if (userList.length > 2 && !userList.includes('You')){
            text = `${filteredList[0]} and ${filteredList[1]} other ${userList.length-2} people`
        } else if (userList.length === 1 && userList.includes('You')){
            text = `You`
        } else if (userList.length === 2 && userList.includes('You')){
            text = `You and ${filteredList[0]}`
        } else if (userList.length > 2 && userList.includes('You')){
            text = `You, ${filteredList[0]} and other ${userList.length-2} people`
        }
        setToolTipText(text);
    },[setToolTipText,myUser.user.id])

    const verifyLike = useCallback((list) => { 
        let c=0;
        console.log(list)
        if(list && list.length === 0){
            setILike(false);
        }
        if(list && list.length !== 0){
            list.forEach((i)=>{
                
                if((i.userId || i.id) === myUser.user.id ){
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
        if (isInEditMode) {
            inputRef.current.focus();
          }
        createTipText(postLikes)
        verifyLike(postLikes)
    },[verifyLike,postLikes,createTipText,isInEditMode,postsData])
    
    function goToUrl(tag) {
        const hashtag = tag.replace('#','')
        history.push(`/hashtag/${hashtag}`)
    }

    function changeEditMode(text) {
        setIsInEditMode(!isInEditMode);
        if(checker === 0) {
            setNewPostText(text);
        }
    }

    function editPost(e, text) {
        if(e.which === 27) {
            setIsInEditMode(!isInEditMode);
        }
        if(e.which === 13) {
            setIsLoading(true);
            const body = {
                text: newPostText
            }
            const config = {
                headers: {
                    Authorization: `Bearer ${myUser.token}`
                }
            };
            const request = axios.put(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${id}`, body, config);
            request.then((response) => {
                let newPost = response.data.post;
                let newArray = postsData;
                let oldText = text;
                let postIndex = newArray.findIndex(el => (el.text === oldText));
                newArray.splice([postIndex], 1, newPost);
                setPostText(newPost.text);
                setPostsData(newArray);
                setIsLoading(false);
                setIsInEditMode(!isInEditMode);
                setChecker(1);
            })
            request.catch((error) => {
                setIsLoading(false);
                alert("Algo deu errado! Tente novamente.");
            })
        }
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
            console.log(postLikes,"useeffec1t")
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
                        multiline={false}
                        place="right"
                        effect="solid"
                        />
                    </PostCreator>
                    <PostContent>
                        {user.id === myUser.user.id ? <EditButton ref={buttonRef} onClick={() => changeEditMode(text)}><TiPencil /></EditButton> : () => {return(<></>)}}
                        {user.id === myUser.user.id ? <DeletePost postId={id} userToken={myUser.token} /> : () => {return(<></>)}}
                        <Link to={`/user/${user.id}`}><h3>{user.username}</h3></Link>
                        <>
                        {isInEditMode ? (
                            <Form onKeyDown={(e) => editPost(e, text)}>
                                <textarea ref={inputRef} disabled={isLoading} onChange={(e) => setNewPostText(e.target.value)} type="text" value={newPostText}></textarea>
                            </Form>
                        ) : 
                            <p>
                                <ReactHashtag onHashtagClick={(val) => goToUrl(val)}>
                                    {text}
                                    {postText}
                                </ReactHashtag>
                            </p>
                        }
                        </>
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
        &.place-right {
            font-family: Lato !important;
            font-size: 11px !important;
            font-weight: 700 !important;
            line-height: 13px !important;
            letter-spacing: 0em !important;
            &:after {
                border-right-color: rgba(255, 255, 255, 0.9) !important;
                border-right-style: solid !important;
                border-right-width: 6px !important;
            }
        } 
    }
`