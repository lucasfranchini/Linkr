import styled from "styled-components";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import PostContext from "../../contexts/PostContext";

export default function TrendingTopics(props) {
    const history = useHistory();
    const [trendingTopics, setTrendingTopics] = useState([]);
    const token = props.user.token;
    const { setPostsData } = useContext(PostContext);
    

    useEffect(() => {
        const headers = { headers: { Authorization: `Bearer ${token}` } };
        const request = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/hashtags/trending", headers);

        request.then((res) => {
            setTrendingTopics(res.data.hashtags);
        })
    }, [token]);

    function goToHashtag(hashtagName) {
        setPostsData(null);
        history.push(`/hashtag/${hashtagName}`);
    }

    return(
        <Container>
            <TrendingTitle>
                <h1>trending</h1>
            </TrendingTitle>
            <TrendingList>
                {trendingTopics.map((t,i) => (
                    <h1 key={i} onClick={() => {goToHashtag(t.name)}}># {t.name}</h1>
                ))}
            </TrendingList>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 301px;
    height: 406px;
    margin-top: 232px;
    margin-left: 25px;
    background: #484848;
    border-radius: 16px;
    @media(max-width: 941px) {
        display: none;
    }
`;

const TrendingTitle = styled.div`
    height: 61px;
    background: #171717;
    border-radius: 16px 16px 0px 0px;
    h1 {
        margin-top: 9px;
        margin-left: 16px;
        color: #FFFFFF;
        font-family: Oswald;
        font-weight: bold;
        font-size: 27px;
        line-height: 40px;
    }
`;

const TrendingList = styled.div`
    height: 344px;
    background: #171717;
    border-radius: 0px 0px 16px 16px;
    padding-top: 22px;
    padding-left: 16px;
    padding-bottom: 30px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    h1 {
        color: #FFFFFF;
        font-family: Lato;
        font-weight: bold;
        font-size: 19px;
        line-height: 23px;  
        cursor: pointer;      
    }
`;