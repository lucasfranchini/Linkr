import axios from 'axios';
import styled from 'styled-components';
import {SnippetImg, SpinnetContent, PostSnippet, PostContentStyle, EditButton, Form, PageLink, Author,IoLocation} from './styles/postStyle';

import {Link, useHistory} from 'react-router-dom';

import React, { useState, useContext, useRef, useEffect} from "react";
import UserContext from "../../contexts/UserContext";
import PostContext from '../../contexts/PostContext';

import {TiPencil} from 'react-icons/ti';
import ReactHashtag from 'react-hashtag';

import Preview from "../Preview/Preview";
import DeletePost from "../post/DeletePost";
import OpenMap from '../OpenMap/OpenMap';
import VideoPlayer from "../post/VideoPlayer";

export default function PostContent({props}) {
    const [preview,setPreview] = useState(false);
    const {user: myUser} = useContext(UserContext);
    const {id, text, link, linkTitle, linkDescription, linkImage, user,geolocation} = props.post;
    const history = useHistory();

    const { postsData, setPostsData } = useContext(PostContext);
    const [isInEditMode, setIsInEditMode] = useState(false);
    const [newPostText, setNewPostText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [postText, setPostText] = useState(text);
    const [checker, setChecker] = useState(0);
    const [toggleMap,setToggleMap] = useState(false);
    const buttonRef = useRef();
    const inputRef = useRef();

    function isVideo(link) {
        let str1 = new RegExp('youtube.com/watch');
        let str2 = new RegExp('youtu.be');
        if (str1.test(link) || str2.test(link)) {
            return(true);
        } else {
            return(false);
        }
    }

    function goToUrl(tag) {
        const hashtag = tag.replace('#','');
        history.push(`/hashtag/${hashtag}`);
    }
    useEffect(()=>{
        if (isInEditMode) {
            inputRef.current.focus();
          }
    },[isInEditMode,postsData]);


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
            const request = axios.put(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${id}`, body, myUser.config);
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
    return (
        <Container>
            {user.id === myUser.user.id ? <EditButton ref={buttonRef} onClick={() => changeEditMode(text)}><TiPencil /></EditButton> : () => {return(<></>)}}
            {user.id === myUser.user.id ? <DeletePost postId={id} userToken={myUser.token} /> : () => {return(<></>)}}
            <Author>
                <Link to={`/user/${user.id}`}><h3>{user.username}</h3></Link>
                {geolocation !== undefined && <IoLocation onClick={()=>setToggleMap(true)}/>}
            </Author>
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
            {isVideo(link) ? (
                <VideoPlayer link={link} />
            ) : (
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
            )}
            <Preview preview={preview} link={link} setPreview={setPreview}/>
            {geolocation !== undefined && <OpenMap toggleMap={toggleMap} setToggleMap={setToggleMap} geolocation={geolocation} name={user.username}/>}
        </Container>
    );
}
const Container = styled(PostContentStyle)``;