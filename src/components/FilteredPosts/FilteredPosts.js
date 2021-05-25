import { useContext, useEffect } from "react";
import { useLocation, useParams } from "react-router";
import styled from "styled-components";
import UserContext from "../../contexts/UserContext";

export default function FilteredPosts(){
    let local = useLocation().pathname;
    const {user} = useContext(UserContext);
    const {id,hashtag} = useParams();
    console.log(local)
    console.log(id)
    console.log(hashtag)
    console.log(user)
    console.log(local===`/user/${id}`)
    useEffect(()=>{
        if(local==="/my-posts")
        {

        }
        else if(local==="/user/:id"){

        }
        else if(local==="/hashtag/:hashtag"){

        }
        else if(local==="/my-likes"){

        }
    },[local,]);
    
    
    return (
        <Body>

        </Body>
    );
}
const Body =  styled.div`
`