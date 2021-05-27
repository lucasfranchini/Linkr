import axios from 'axios'

import { useState, useContext, useCallback} from "react";
import { useHistory, Link } from "react-router-dom";

import {SnippetImg, SpinnetContent, PostSnippet, PostContent, PostCreator, Container} from './styles/postStyle';
import {FaRegHeart,FaHeart} from 'react-icons/fa'
import styled from 'styled-components'
import ReactHashtag from 'react-hashtag';
import UserContext from "../../contexts/UserContext";
import { useEffect } from "react/cjs/react.development";

import ReactTooltip from 'react-tooltip';

export default function Post(props) {
    const {id, text, link, linkTitle, linkDescription, linkImage, user, likes} = props.props;
    const history = useHistory();
    const {user: myUser} = useContext(UserContext);
    const [iLike, setILike] = useState(false);
    const [postLikes, setpostLikes] = useState(likes);

    const verifyLike = useCallback((list) => { 
        let c=0;
        list.forEach((i)=>{
            if(i.userId === myUser.user.id){
            setILike(true);
            c++
            }
        })
        if (c===0){
            setILike(false);
        }
    }, [setILike,myUser.user.id])

    useEffect(()=>{
        verifyLike(postLikes)
    },[verifyLike,postLikes])
    
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
            setpostLikes(response.data.post.likes)
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
                        data-tip={"Hello<br />multiline<br />tooltip"}
                        data-iscapture="true"
                            >{postLikes ? postLikes.length : 0} Likes</p>
                        <ReactTooltip 
                        id="post-likes"
                        multiline={false}
                        />
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
                            <SnippetImg src={linkImage} alt={linkTitle}></SnippetImg>
                        </PostSnippet>
                    </PostContent>
                </div>
            </Container>
        );
};
const LikeButton = styled.div`
    color:${(props)=>(props.checked ? '#AC0000' : '#FFFFFF' )}
`