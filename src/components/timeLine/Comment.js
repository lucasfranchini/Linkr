import styled from 'styled-components';
import {useState, useContext, useEffect, useCallback} from 'react';

import {Link} from 'react-router-dom';

import UserContext from "../../contexts/UserContext";

export default function Comment({c, followers, user: AuthorUser}) {
    const {text, user: commentUser} = c
    const {user: myUser} = useContext(UserContext);
    const [isFollowing, setIsFollowing] = useState(false);

    const checkFollowers = useCallback (()=>{
        if(followers && followers.length > 0) {
            followers.forEach((f)=>{
                if (f.id === commentUser.id && f.id !== myUser.user.id){
                    setIsFollowing(true);
                }
            })
        }
    },[followers,setIsFollowing,commentUser.id,myUser.user.id])

    useEffect(()=>{
        checkFollowers();
    },[checkFollowers]);

    return (
        <Container>
            <div>
                <Link onClick={()=>window.scrollTo(0,0)} to={`/user/${commentUser.id}`}>
                    <img src={commentUser.avatar} alt={commentUser.username} />
                </Link>
            </div>
            <div>
                <span>{commentUser.username}
                    {AuthorUser.id === commentUser.id
                    ? <span className='status'> • post’s author</span> 
                    : "" ||
                    isFollowing 
                    ? <span className='status'> • following</span> 
                    : ""}
                </span> 
                <p>
                    {text}
                </p>
            </div>
        </Container>
    );
}
const Container = styled.div`
    display:flex;
    align-items:center;
    justify-content:flex-start;
    width:100%;
    line-height: 17px;
    font-size: 14px;
    font-weight: 400;
    >div:nth-child(2){
        margin: 4px 0px 0px 16px;
    }
    img{
        height:39px;
        width: 39px;
        border-radius:50%;
    }
    span{
        font-weight: 700;
        color: #F3F3F3;
    }
    .status {
        color: #565656;
    }
    p {
        width:100%;
        text-align: left;
        color: #ACACAC;
    }
`
