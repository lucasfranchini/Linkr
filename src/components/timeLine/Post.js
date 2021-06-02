import axios from "axios";
import React, { useState, useContext, useEffect, useCallback} from "react";
import { Link } from "react-router-dom";

import {PostCreator, Container, Card, Filler, CommentsContainer} from './styles/postStyle';
import {FaRegHeart,FaHeart} from 'react-icons/fa';
import {AiOutlineComment} from 'react-icons/ai';
import {IoPaperPlaneOutline} from 'react-icons/io5'

import styled from 'styled-components'
import UserContext from "../../contexts/UserContext";

import { MuiThemeProvider } from '@material-ui/core/styles';
import {ToolTipComponent} from './styles/ToolTipComponent';
import Tooltip from '@material-ui/core/Tooltip';
import buildText from './functions/buildText';

import PostContent from './PostContent';
import Comment from './Comment';

export default function Post(props) {
    const {id, user, likes, commentCount} = props.post;
    const {user: myUser} = useContext(UserContext);
    const [iLike, setILike] = useState(false);
    const [postLikes, setPostLikes] = useState(likes);
    const [inComments, setInComments] = useState(false);
    const [commentsData, setCommentsData] = useState([]);
    const [toolTipText, setToolTipText] = useState('this post is not liked yet');
    const [sendingComments, setSendingComments] = useState(false);
    const [commentText, setCommentText] = useState('');
    const [followers, setFollowers] = useState([]);

    const config = {
        headers: {
            Authorization: `Bearer ${myUser.token}`
        }
    };

    const getFollowers = useCallback(()=>{
        const request = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/follows',config)
        request.then((response)=>{
            setFollowers(response.data.users)
        })
    },[setFollowers])
     
    useEffect(()=>{
        setPostLikes(likes);
        getFollowers();
    },[likes,setPostLikes, getFollowers]);

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
        createToolTipText(postLikes);
        verifyLike(postLikes);
    },[verifyLike,postLikes,createToolTipText]);

    function toggleLike(id) {
        const url = iLike
        ? `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${id}/dislike`
        : `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${id}/like`;

        const request = axios.post(url,{}, config);
        request.then((response)=>{
            setPostLikes(response.data.post.likes);
            verifyLike(response.data.post.likes);
        });
    }
    function loadComments(postId){
        const url = `https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${postId}/comments`;
        const request = axios.get(url,config)
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
        const request = axios.post(url, body, config);
        request.then((response)=>{
            setSendingComments(false);
            setCommentText('');
            getFollowers();
            loadComments(postId);
        });
    }
   
        return (
            <Container key={id.toString()}>
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
const Spreader = styled.div`
    margin:15px 0;
    width:100%;
    border: 0.5px solid #353535;
    border-radius: 1px;
    color:#353535;;
    transform: rotate(-0.1deg);
`
const InputComment = styled.div`
    display:flex;
    align-items:center;
    justify-content:space-between;
    width:100%;
    form{
        margin-left: 14px;
        position: relative;
        width:100%;
    }
    input{
        background: #252525;
        border: none;
        outline: none;
        border-radius: 8px;
        line-height: 17px;
        text-indent: 15px;
        color:#F3F3F3;
        min-height:39px;
        width:100%;
    }
    input::placeholder{
        font-family: Lato;
        font-size: 14px;
        font-style: italic;
        font-weight: 400;
        line-height: 17px;
        letter-spacing: 0.05em;
        text-align: left;
        text-indent: 15px;
    }
    img {
        height: 39px;
        width: 39px;
        border-radius:50%;
    }
    svg{
        height: 15px;
        width: 15px;
        position:absolute;
        color:#F3F3F3;
        right: 12.5px;
        bottom: 12.5px;
    }
`
