import { useHistory, Link } from "react-router-dom";

import {SnippetImg, SpinnetContent, PostSnippet, PostContent, PostCreator, Container} from './styles/postStyle';
import {FaRegHeart} from 'react-icons/fa'
import ReactHashtag from 'react-hashtag';

export default function Post({post}) {
    const {id, text, link, linkTitle, linkDescription, linkImage, user, likes} = post;
    const history = useHistory();
    function goToUrl(tag) {
        const hashtag = tag.replace('#','')
        history.push(`/hashtag/${hashtag}`)
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
