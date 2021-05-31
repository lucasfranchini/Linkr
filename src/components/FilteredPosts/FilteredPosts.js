import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Redirect, useLocation, useParams } from "react-router";
import {Button,Content,Posts,Title,Body} from "./FilteredPostStyles";
import PostContext from "../../contexts/PostContext";
import UserContext from "../../contexts/UserContext";
import Post from "../timeLine/Post";
import TrendingTopics from "../timeLine/TrendingTopics";

export default function FilteredPosts({url,newTitle}){
    let local = useLocation().pathname;
    const {user} = useContext(UserContext);
    const {id,hashtag} = useParams();
    const [title,setTitle]=useState("");
    const { postsData, setPostsData } = useContext(PostContext);
    const [pageUser,setPageUser] = useState({});
    const [follow,setFollow] =useState(false)
    const [followeUsers,setFollowedUsers] = useState([]);
    
    
    useEffect(()=>{
        const headers = {headers:{Authorization: `Bearer ${user.token}`}}
        if(local==="/my-posts" || local==="/my-likes"){
            setTitle(newTitle);
            const promise = axios.get(url,headers);
            promise.then(answer=>{
                setPostsData(answer.data.posts)
            })
        }
        else if(local===`/user/${id}`){
            const promise = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/${id}`,headers);
            const wish = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/follows',headers)
            wish.then(answer=>{
                setFollowedUsers(answer.data);
            });
            promise.then(answer=>{
                setTitle(`${answer.data.user.username}'s posts`);
                setPageUser(answer.data.user);
                const promise = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/${id}/posts`,headers);
                promise.then(answer=>{
                    setPostsData(answer.data.posts)
                });
            });
        }
        else if(local===`/hashtag/${hashtag}`){
            setTitle(`# ${hashtag}`)
            const promise = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/hashtags/${hashtag}/posts`,headers);
            promise.then(answer=>{
                setPostsData(answer.data.posts)
            })
        }
    },[local,id,hashtag,user.token,newTitle,setPostsData,url]);
    return (
        <Body>
            {parseInt(id)===user.user.id && <Redirect to="/my-posts"/>}
            <Title>
                <div>
                    {local===`/user/${id}`&& <img src={pageUser.avatar}/>}
                    {title}
                </div>
                <Button>{follow ? "Unfollow" : "Follow"}</Button>
            </Title>
            <Content>
                <Posts>
                    {postsData!==null && postsData.map(p=><Post key={p.id} post={p} userInfo={user} />)}
                </Posts>
                <TrendingTopics user={user}/>
            </Content>
        </Body>
    );
}