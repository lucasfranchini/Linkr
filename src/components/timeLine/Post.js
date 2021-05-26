import { useState, useContext, useEffect } from "react";
import PostContext from '../../contexts/PostContext';

import {FaRegHeart} from 'react-icons/fa'
import styled from "styled-components";
import ReactHashtag from 'react-hashtag';

export default function Post(props) {
    const {id, text, link, linkTitle, linkDescription, linkImage, user, likes} = props.props;

        return (
            <Container key={id.toString()}>
                <PostCreator key={user.id.toString()}>
                    <img src={user.avatar}></img>
                    <FaRegHeart/>
                    <p>{likes ? likes.length : 0} Likes</p>
                </PostCreator>
                <PostContent>
                    <h3>{user.username}</h3>
                    <p>
                        <ReactHashtag onHashtagClick={val => alert(val)}>
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
                            <a href={link}>
                                {link}   
                            </a>
                        </SpinnetContent>
                        <SnippetImg src={linkImage}></SnippetImg>
                    </PostSnippet>
                </PostContent>
            </Container>
        );
};
const Container = styled.div`
    font-family: Lato;
    font-weight: 400;
    letter-spacing: 0em;
    color:#FFF;
    width: 612px;
    height: 276px;
    margin-bottom: 16px;
    padding: 16px 20px 20px 18px ;
    background: #171717;
    border-radius: 16px;
    display:flex;
    align-items: center;
    justify-content:center;
`
const PostCreator = styled.div`
    width: 612px;
    height: 100%;
    display:flex;
    flex-direction:column;
    align-items: center;
    justify-content:start;
    img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-bottom: 18px;
    }
    svg {
        height: 20px;
        width: 20px;
    }
    p {
        margin-top: 4px;
        font-size: 11px;
        line-height: 13px;
    }
`
const PostContent = styled.div`
    width: 504px;
    height: 236px;
    margin-left:20px;
    display:flex;
    flex-direction:column;
    align-items: flex-start;
    justify-content:space-between;
    word-break:break-all;
    h3 {
        font-size: 19px;
        line-height: 23px;
        color: #FFFFFF;
        margin-left:0px;
    }
    p{
        margin-left:0px;
        font-size: 17px;
        line-height: 20px;
        color: #B7B7B7;
    }
    span { //hashtag Style
        color:#FFF;
        font-weight: 700;
    }
`
const PostSnippet = styled.div`
    position: relative;
    padding-left: 20px;
    width: 502px;
    height: 154px;
    border: 1px solid #4D4D4D;
    border-radius: 11px;
    display:flex;
    align-items: center;
    justify-content:space-between;
`
const SpinnetContent = styled.article`
    margin:24px 28px 23px 0;
    width: 304px;
    display:flex;
    flex-direction:column;
    align-items:flex-start;
    justify-content:space-between;
    span{
        text-align: left;
        margin-left:0;
        font-size: 16px;
        line-height: 19px;
        color: #CECECE;
    }
    p{
        font-size: 11px;
        line-height: 13px;
        color: #9B9595;
        margin:6px 0 14px;
    }
    a{
        font-size: 11px;
        line-height: 13px;
        margin:0;
        color: #CECECE;
    }
`
const SnippetImg = styled.img`
    position:absolute;
    right:0px;
    top:0px;
    height:154px;
    width: 154px;
    border-radius: 0px 12px 13px 0px;
`