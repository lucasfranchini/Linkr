import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Redirect, useLocation, useParams } from "react-router";
import {Button,Content,Posts,Title,Body} from "./FilteredPostStyles";
import PostContext from "../../contexts/PostContext";
import UserContext from "../../contexts/UserContext";
import InfinitePosts from "../timeLine/InfinitePosts";
import TrendingTopics from "../timeLine/TrendingTopics";
import toggleFollow from "./toggleFollow";

export default function FilteredPosts({url,newTitle}){
    let local = useLocation().pathname;
    const {user} = useContext(UserContext);
    const {id,hashtag} = useParams();
    const [title,setTitle]=useState("");
    const { postsData, setPostsData } = useContext(PostContext);
    const [pageUser,setPageUser] = useState({});
    const [follow,setFollow] =useState(false);  
    const [loading,setLoading] = useState(false);
    
    const [axiosUrlPath, setAxiosUrlPath] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [olderPost, setOlderPost] = useState('');
    const [newerPost, setNewerPost] = useState('');
    
    function setupPostsId(data) {
        if (data && data.length>0){
            const older = data[data.length-1].id;
            setOlderPost(older);
            const newer = {id: data[0].id, repostId:data[0].repostId};
            setNewerPost(newer);
        }
    }

    useEffect(()=>{
        const headers = {headers:{Authorization: `Bearer ${user.token}`}}
        if(local==="/my-posts" || local==="/my-likes"){
            setTitle(newTitle);
            const promise = axios.get(url,headers);
            setAxiosUrlPath(url);
            promise.then(answer=>{
                const data = answer.data.posts
                setupPostsId(data);
                setIsLoaded(1);
                setPostsData(answer.data.posts);
            })
        }
        else if(local===`/user/${id}`){
            const promise = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/${id}`,headers);
            const wish = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/follows',headers);
            wish.then(answer=>{
                if(answer.data.users.find(follow=>follow.id===parseInt(id)) !== undefined )setFollow(true);
            });
            promise.then(answer=>{
                if(parseInt(id)===user.user.id){
                    setTitle("My Posts")
                }
                else{
                    setTitle(`${answer.data.user.username}'s posts`);
                }
                
                setPageUser(answer.data.user);
                const promise = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/${id}/posts`,headers);
                setAxiosUrlPath(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/${id}/posts`);
                promise.then(answer=>{
                    const data = answer.data.posts
                    setupPostsId(data);;
                    setIsLoaded(1);
                    setPostsData(answer.data.posts)
                });
            });
        }
        else if(local===`/hashtag/${hashtag}`){
            setTitle(`# ${hashtag}`)
            const promise = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/hashtags/${hashtag}/posts`,headers);
            setAxiosUrlPath(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/hashtags/${hashtag}/posts`)
            promise.then(answer=>{
                const data = answer.data.posts
                setupPostsId(data);
                setIsLoaded(1);
                setPostsData(answer.data.posts)
            })
        }
    },[local,id,hashtag,user.token,newTitle,setPostsData,url,user.user.id]);

    return (
        <Body>
            {parseInt(id)===user.user.id && <Redirect to="/my-posts"/>}
            <Title>
                <div>
                    {local===`/user/${id}`&& <img src={pageUser.avatar} alt="avatar do usuario"/>}
                    {title}
                </div>
                {
                local===`/user/${id}` 
                && 
                <Button onClick={()=>toggleFollow(setFollow,follow,id,user,setLoading)} follow={follow} disabled={loading}> 
                {follow ? "Unfollow" : "Follow"}
                </Button>
                }
            </Title>
            <Content>
                <Posts>
                    {postsData!==null && (postsData.length === 0
                        ? <Title>Não existem posts nessa aba</Title>
                        : <InfinitePosts 
                        oldPost={olderPost}
                        newPost={newerPost}
                        isLoaded={isLoaded}
                        axiosUrlPath={axiosUrlPath}
                        />
                    )}
                </Posts>
                <TrendingTopics user={user}/>
            </Content>
        </Body>
    );
}