import axios from "axios";
import React, { useState, useContext, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

import {PostCreator, Container, Card,RepostInfo, RepostIcon, RepostedByWho} from './styles/postStyle';
import { Filler, CommentsContainer, Spreader, InputComment} from './styles/commentStyle';

import {FaRegHeart,FaHeart} from 'react-icons/fa';
import {AiOutlineComment} from 'react-icons/ai';
import {IoPaperPlaneOutline} from 'react-icons/io5'
import {ImLoop} from 'react-icons/im';

import styled from 'styled-components'
import UserContext from "../../contexts/UserContext";

import { MuiThemeProvider } from '@material-ui/core/styles';
import { ToolTipComponent } from './styles/ToolTipComponent';
import Tooltip from '@material-ui/core/Tooltip';
import buildText from './functions/buildText';

import RePost from "../post/RePost";
import PostContent from './PostContent';
import Comment from './Comment';

export default function Post(props) {
    console.log(props)
    const {id, user, likes, commentCount, repostCount} = props.post;
    const {user: myUser} = useContext(UserContext);
    const [iLike, setILike] = useState(false);
    const [postLikes, setPostLikes] = useState(likes);
    const [inComments, setInComments] = useState(false);
    const [commentsData, setCommentsData] = useState([]);
    const [toolTipText, setToolTipText] = useState('this post is not liked yet');
    const [sendingComments, setSendingComments] = useState(false);
    const [commentText, setCommentText] = useState('');
    const [followers, setFollowers] = useState([]);

    const getFollowers = useCallback((config)=>{
        const request = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/follows',config)
        request.then((response)=>{
            setFollowers(response.data.users)
        })
    },[setFollowers])
    
    useEffect(()=>{
        setPostLikes(likes);
        getFollowers(myUser.config);
    },[likes,setPostLikes, getFollowers,myUser.config]);

    const createToolTipText = useCallback((list) => {
        setToolTipText(buildText(list, myUser));
    }, [setToolTipText, myUser]);

    const verifyLike = useCallback((list) => {
        let c = 0;
        if (list && list.length === 0) {
            setILike(false);
        }
        if (list && list.length !== 0) {
            list.forEach((i) => {

                if ((i.userId || i.id) === myUser.user.id) {
                    setILike(true);
                    c++
                }
            })
            if (c === 0) {
                setILike(false);
            }
        }
    }, [setILike, myUser.user.id]);

    useEffect(() => {
        createToolTipText(postLikes);
        verifyLike(postLikes);
    }, [verifyLike, postLikes, createToolTipText]);

    function toggleLike(id) {
        const url = iLike
            ? `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${id}/dislike`
            : `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${id}/like`;

        const request = axios.post(url,{}, myUser.config);
        request.then((response)=>{
            setPostLikes(response.data.post.likes);
            verifyLike(response.data.post.likes);
        });
    }
    function loadComments(postId){
        const url = `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${postId}/comments`;
        const request = axios.get(url,myUser.config)
        request.then((response)=>{setCommentsData(response.data.comments)})
    }
    function toggleComments(postId) {
        setInComments(!inComments);
        if(!inComments){
            loadComments(postId);
        }
    }
    function postComment(e,postId) {
        e.preventDefault();
        setSendingComments(true);
        const body = {
            text: commentText
        };
        const url = `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${postId}/comment`;
        const request = axios.post(url, body, myUser.config);
        request.then((response)=>{
            setSendingComments(false);
            setCommentText('');
            getFollowers(myUser.config);
            loadComments(postId);
        });
    }
   
        return (
            <Container key={id.toString()}>
                <RepostInfo applyStyles={props.post.repostedBy !== undefined}>
                {props.post.repostedBy === undefined ?
                    (<></>) :
                    (<RepostedByWho>
                        <ImLoop />
                        <h3>Re-posted by 
                            <strong>{props.post.repostedBy.username === myUser.user.username ?
                                ("you") : 
                                (`${props.post.repostedBy.username}`)}
                            </strong>
                        </h3>
                    </RepostedByWho>)
                }
                    <Card>
                        <PostCreator >
                            <Link to={`/user/${user.id}`}>
                                <img src={user.avatar} alt={user.username}/>
                            </Link>
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
                            <CommentsButton onClick={()=>toggleComments(id)}>
                                <AiOutlineComment/>
                            </CommentsButton>
                                <p>
                                    {commentsData.length >0 ? commentsData.length : commentCount} Comments
                                </p>
                            {user.id !== myUser.user.id ? 
                                <RePost postId={id} userToken={myUser.token} /> :
                                <RepostIcon>
                                    <ImLoop/>
                                </RepostIcon>
                            }
                            <p>{repostCount}<span> </span>Re-posts</p>
                        </PostCreator>
                        <PostContent props ={props} />
                    </Card>
                    <Filler active={inComments}/>
                    <CommentsContainer active={inComments}>
                        {commentsData.length > 0
                        ? commentsData.map((c,i)=>{
                            return(
                                <>
                                    <Comment key={c.id} c={c} followers={followers} user={user}/>
                                    <Spreader key={i}/>
                                </>
                            );
                        })
                        : ""
                        }
                        <InputComment>
                            <img src={myUser.user.avatar} alt={user.username}/>
                            <form onSubmit={(e)=>postComment(e, id)}>
                                <input value={commentText} onChange={(e)=>setCommentText(e.target.value)} disabled={sendingComments} placeholder="write a comment..."/>
                                <IoPaperPlaneOutline onClick={(e)=>{postComment(e, id)}}/>
                            </form>
                        </InputComment>
                    </CommentsContainer>
                </RepostInfo>
            </Container>
        );
};
const LikeButton = styled.div`
    color: ${(props)=>(props.checked ? '#AC0000' : '#FFFFFF' )};
    cursor: pointer;
`
const CommentsButton = styled.div`
    color: '#FFFFFF';
    cursor: pointer;
`
