import axios from "axios";
import React, { useState, useContext, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';

import RePost from "../post/RePost";
import {ImLoop} from 'react-icons/im';

import {PostCreator, Container, RepostInfo, RepostIcon, RepostedByWho} from './styles/postStyle';
import {FaRegHeart,FaHeart} from 'react-icons/fa';

import UserContext from "../../contexts/UserContext";

import { MuiThemeProvider } from '@material-ui/core/styles';
import { ToolTipComponent } from './styles/ToolTipComponent';
import Tooltip from '@material-ui/core/Tooltip';
import buildText from './functions/buildText';

import PostContent from './PostContent';

export default function Post(props) {
    const { id, user, likes, repostCount } = props.post;
    const { user: myUser } = useContext(UserContext);
    const [iLike, setILike] = useState(false);
    const [postLikes, setPostLikes] = useState(likes);
    const [toolTipText, setToolTipText] = useState('this post is not liked yet');

    useEffect(() => {
        setPostLikes(likes);
    }, [likes, setPostLikes]);

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

        const config = {
            headers: {
                Authorization: `Bearer ${myUser.token}`
            }
        };
        const request = axios.post(url, {}, config);
        request.then((response) => {
            setPostLikes(response.data.post.likes);
            verifyLike(response.data.post.likes);
        });
    }
        return (
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
                            {user.id !== myUser.user.id ? 
                                <RePost postId={id} userToken={myUser.token} /> :
                                <RepostIcon>
                                    <ImLoop/>
                                </RepostIcon>
                            }
                            <p>{repostCount}<span> </span>Re-posts</p>
                        </PostCreator>
                        <PostContent props ={props} />
                    </div>
                </Container>
            </RepostInfo>
        );
};
const LikeButton = styled.div`
    color: ${(props) => (props.checked ? '#AC0000' : '#FFFFFF')};
`