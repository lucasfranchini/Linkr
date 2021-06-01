import React, { useState, useContext, useRef, useEffect, useCallback} from "react";
import PostContext from '../../contexts/PostContext';
import { useHistory, Link } from "react-router-dom";
import axios from "axios";

import DeletePost from "../post/DeletePost";

import {SnippetImg, SpinnetContent, PostSnippet, PostContent, PostCreator, Container, EditButton, Form, PageLink} from './styles/postStyle';
import {FaRegHeart,FaHeart} from 'react-icons/fa';
import {TiPencil} from 'react-icons/ti';
import styled from 'styled-components'
import ReactHashtag from 'react-hashtag';
import UserContext from "../../contexts/UserContext";

import { MuiThemeProvider } from '@material-ui/core/styles';
import {ToolTipComponent} from './styles/ToolTipComponent';
import Tooltip from '@material-ui/core/Tooltip';
import buildText from './functions/buildText';

import Preview from "../Preview/Preview";

export default function Post(props) {
    const {id, text, link, linkTitle, linkDescription, linkImage, user, likes} = props.post;
    const history = useHistory();
    const {user: myUser} = useContext(UserContext);
    const [iLike, setILike] = useState(false);
    const [postLikes, setPostLikes] = useState(likes);
    const [toolTipText, setToolTipText] = useState('this post is not liked yet');
    const { postsData, setPostsData } = useContext(PostContext);
    const [isInEditMode, setIsInEditMode] = useState(false);
    const [newPostText, setNewPostText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [postText, setPostText] = useState(text);
    const [checker, setChecker] = useState(0);
    const [preview,setPreview] = useState(false);
    const buttonRef = useRef();
    const inputRef = useRef();

    useEffect(()=>{
        setPostLikes(likes);
    },[likes,setPostLikes]);

    const createToolTipText = useCallback((list) => {
        setToolTipText(buildText(list,myUser));
    },[setToolTipText,myUser]);

    const verifyLike = useCallback((list) => { 
        let c=0;
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
    }, [setILike,myUser.user.id]);

    useEffect(()=>{
        if (isInEditMode) {
            inputRef.current.focus();
          }
        createToolTipText(postLikes);
        verifyLike(postLikes);
    },[verifyLike,postLikes,createToolTipText,isInEditMode,postsData]);
    
    function goToUrl(tag) {
        const hashtag = tag.replace('#','');
        history.push(`/hashtag/${hashtag}`);
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
        const request = axios.post(url,{}, config);
        request.then((response)=>{
            setPostLikes(response.data.post.likes);
            verifyLike(response.data.post.likes);
        });
    }
        return (
            <Container key={id.toString()}>
                <div>
                    <PostCreator >
                        <Link to={`/user/${user.id}`}><img src={user.avatar} alt={user.username}/></Link>
                        <LikeButton checked={iLike} onClick={()=>toggleLike(id)}>
                            {iLike ? <FaHeart /> :<FaRegHeart/>}
                        </LikeButton>
                        <MuiThemeProvider theme={ToolTipComponent}>
                            <Tooltip title={toolTipText} arrow={true} enterTouchDelay={200}>
                                <p>
                                    {postLikes ? postLikes.length : 0} Likes
                                </p>
                            </Tooltip>
                        </MuiThemeProvider>
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
                                    {postText}
                                </ReactHashtag>
                            </p>
                        }
                        </>
                        <PostSnippet onClick={()=>setPreview(true)}>
                            <SpinnetContent>
                                <span>
                                    {linkTitle}
                                </span>
                                <p>
                                    {linkDescription}
                                </p>
                                <PageLink>
                                    {link}
                                </PageLink>
                            </SpinnetContent>
                            <SnippetImg src={linkImage} alt={linkTitle}></SnippetImg>
                        </PostSnippet>
                        <Preview preview={preview} link={link} setPreview={setPreview}/>
                    </PostContent>
                </div>
            </Container>
        );
};
const LikeButton = styled.div`
    color: ${(props)=>(props.checked ? '#AC0000' : '#FFFFFF' )};
`