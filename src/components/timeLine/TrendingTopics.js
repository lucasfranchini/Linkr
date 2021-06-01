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
    const [hashtag, setHashtag] = useState("");
    

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
        setHashtag("");
    }

    function searchHashtag(e, hashtag) {
        if(e.which === 13) {
            goToHashtag(hashtag);
        }
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
                <HashtagSearch>
                <h1>#</h1>
                <SearchBox onChange={(e) => {setHashtag(e.target.value)}} value={hashtag} placeholder="type a hashtage" onKeyDown={(e) => searchHashtag(e, hashtag)}></SearchBox>
            </HashtagSearch>
            </TrendingList>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 301px;
    height: 441px;
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
    height: 379px;
    background: #171717;
    border-radius: 0px 0px 16px 16px;
    padding-top: 22px;
    padding-left: 16px;
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

const HashtagSearch = styled.div`
    height: 35px;
    width: 269px;
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    background: #252525;
    border-radius: 8px;
    color: #FFFFFF;
    font-family: Lato;
    font-weight: bold;
    font-size: 19px;
    line-height: 23px;
    h1 {
        margin-left: 13px;
        margin-right: 11px;
    }
    input:focus {
        outline: none !important;
    }
`;

const SearchBox = styled.input`
    background: none;
    border: none;
    font-family: Lato;
    font-style: italic;
    font-weight: normal;
    font-size: 16px;
    line-height: 19px;
    letter-spacing: 0.05em;
    color: #575757;
`;