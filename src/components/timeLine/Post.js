import { useState, useContext} from "react";
import PostContext from '../../contexts/PostContext';
import { useHistory, Link } from "react-router-dom";

import {SnippetImg, SpinnetContent, PostSnippet, PostContent, PostCreator, Container} from './styles/postStyle';
import {FaRegHeart} from 'react-icons/fa'
import ReactHashtag from 'react-hashtag';

export default function Post(props) {
    const {id, text, link, linkTitle, linkDescription, linkImage, user, likes} = props.props;
    console.log(props.props)
    const history = useHistory();
    function goToUrl(tag) {
        const hashtag = tag.replace('#','')
        history.push(`/hashtag/${hashtag}`)
    }
    function toggleLike(e,id) {
        console.log(id)
    }
        return (
            <Container key={id.toString()}>
                <div>
                    <PostCreator >
                        <Link to={`/user/${user.id}`}><img src={user.avatar} alt={user.username}/></Link>
                        <FaRegHeart onClick={(e)=>toggleLike(e,id)}/>
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
                            <SnippetImg src={linkImage} alt={linkTitle}></SnippetImg>
                        </PostSnippet>
                    </PostContent>
                </div>
            </Container>
        );
};
