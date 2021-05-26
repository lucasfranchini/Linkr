import { useState, useContext} from "react";
import { useHistory, Link } from "react-router-dom";
import PostContext from '../../contexts/PostContext';

import {FaRegHeart} from 'react-icons/fa'
import styled from "styled-components";
import ReactHashtag from 'react-hashtag';

export default function Post(props) {
    const {id, text, link, linkTitle, linkDescription, linkImage, user, likes} = props.props;
    const history = useHistory();
    function goToUrl(tag) {
        const hashtag = tag.replace('#','')
        history.push(`/hashtag/${hashtag}`)
    }
        return (
            <Container key={id.toString()}>
                <div>
                    <PostCreator key={user.id.toString()}>
                        <Link to={`/user/${user.id}`}><img src={user.avatar}></img></Link>
                        <FaRegHeart/>
                        <p>{likes ? likes.length : 0} Likes</p>
                    </PostCreator>
                    <PostContent>
                        {/* inserir Botoes editar/deletar Aqui */}
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
                            <SnippetImg src={linkImage}></SnippetImg>
                        </PostSnippet>
                    </PostContent>
                </div>
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
    padding: 16px 20px 20px 18px;
    background: #171717;
    border-radius: 16px;
    >div{
        display:flex;
        align-items: flex-start;
        justify-content:center;
    }
    @media(max-width: 611px) {
        padding: 15px 18px 8px 15px;
        width:100%;
        border-radius:0px;
        height: 232px;
        height:auto;
    }
`
const PostCreator = styled.div`
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
    @media(max-width: 611px) {
        img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-bottom: 18px;
        }
        svg {
            height: 18px;
            width: 18px;
        }
        p {
            margin-top: 12px;
            font-size: 9px;
            line-height: 11px;
        }
    }
`
const PostContent = styled.div`
    position: relative;
    z-index: 2;
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
        margin:2px 0 8px 0;
    }
    p{
        margin:0 0 12px 0;
        font-size: 17px;
        line-height: 20px;
        color: #B7B7B7;
    }
    span { //hashtag Style
        color:#FFF;
        font-weight: 700;
    }
    @media(max-width: 611px) {
        height:auto;
        width: 100%;
        h3 {
        font-size: 17px;
        line-height: 20px;
        }
        p{
            font-size: 15px;
            line-height: 18px;
        }
        span { //hashtag Style
            color:#FFF;
            font-weight: 700;
        }
    }
`
const PostSnippet = styled.div`
    position: relative;
    z-index:2;
    padding-left: 20px;
    width: 502px;
    height: 154px;
    border: 1px solid #4D4D4D;
    border-radius: 11px;
    display:flex;
    align-items: center;
    justify-content:space-between;
    @media(max-width: 611px) {
        width: 100%;
        padding:0;
        min-height: 115px;
        height: auto;
        justify-content:center;
        justify-content:flex-start;
    }
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
    @media(max-width: 611px) {
        margin:0;
        padding:7px 11px 8px 12px;
        width: calc(100% - 115px);
        span{
            font-size: 11px;
            line-height: 13px;
        }
        p{
            font-size: 9px;
            line-height: 11px;
            margin:6px 0 14px;
        }
        a{
            font-size: 9px;
            line-height: 11px;
            margin:0;
        }
    }
`
const SnippetImg = styled.img`
    position:absolute;
    right:0px;
    top:0px;
    height:154px;
    width: 154px;
    border-radius: 0px 12px 13px 0px;
    @media(max-width: 611px) {
        height: 100%;
        width:115px;
    }
`