import React, { useState, useContext, useRef, useEffect} from "react";
import PostContext from '../../contexts/PostContext';
import { useHistory, Link } from "react-router-dom";
import axios from "axios";

import DeletePost from "../post/DeletePost";
import { IoMdTrash } from "react-icons/io";

import {SnippetImg, SpinnetContent, PostSnippet, PostContent, PostCreator, Container, EditButton, Form} from './styles/postStyle';
import {FaRegHeart} from 'react-icons/fa'
import ReactHashtag from 'react-hashtag';


export default function Post(props) {
    const {id, text, link, linkTitle, linkDescription, linkImage, user, likes} = props.props;
    const { postsData, setPostsData } = useContext(PostContext);
    const userInfo = props.userInfo;
    const history = useHistory();
    const [isInEditMode, setIsInEditMode] = useState(false);
    const [newPostText, setNewPostText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [postText, setPostText] = useState(text);
    const [checker, setChecker] = useState(0);
    const buttonRef = useRef();
    const inputRef = useRef();


    useEffect(() => {
        if (isInEditMode) {
          inputRef.current.focus();
        }
      }, [isInEditMode]);

    function goToUrl(tag) {
        const hashtag = tag.replace('#','')
        history.push(`/hashtag/${hashtag}`)
    }
    console.log(newPostText);
    function changeEditMode(text) {
        setIsInEditMode(!isInEditMode);
        if(checker === 0) {
            setNewPostText(text);
        }
        console.log("mudou");
    }
    function editPost(e, text) {
        if(e.which === 27) {
            setIsInEditMode(!isInEditMode);
        }
        if(e.which === 13) {
            console.log("Submitado!");
            setIsLoading(true);
            const body = {
                text: newPostText
            }
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`
                }
            };
            const request = axios.put(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${id}`, body, config);
            request.then((response) => {
                let newPost = response.data.post;
                let newArray = postsData;
                let oldText = text;
                let postIndex = newArray.findIndex(el => (el.text === oldText));
                newArray.splice([postIndex], 1, newPost);

                console.log(newPost);

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
        <Container key={id.toString()}>
            <div>
                <PostCreator key={user.id.toString()}>
                    <Link to={`/user/${user.id}`}><img src={user.avatar} alt={user.username}></img></Link>
                    <FaRegHeart/>
                    <p>{likes ? likes.length : 0} Likes</p>
                </PostCreator>
                <PostContent>
                    {user.id === userInfo.user.id ? <EditButton ref={buttonRef} onClick={() => changeEditMode(text)}><IoMdTrash /></EditButton> : () => {return(<></>)}}
                    {user.id === userInfo.user.id ? <DeletePost postId={id} userToken={userInfo.token} /> : () => {return(<></>)}}
                    <Link to={`/user/${user.id}`}><h3>{user.username}</h3></Link>
                    <p>
                        {isInEditMode ? (
                            <Form onKeyDown={(e) => editPost(e, text)}>
                                <textarea ref={inputRef} disabled={isLoading} onChange={(e) => setNewPostText(e.target.value)} type="text" value={newPostText}></textarea>
                            </Form>
                        ) : 
                        <ReactHashtag onHashtagClick={(val) => goToUrl(val)}>
                            {postText}
                        </ReactHashtag>
                        }
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
                        <SnippetImg src={linkImage}></SnippetImg>
                    </PostSnippet>
                </PostContent>
            </div>
        </Container>
    );
};
