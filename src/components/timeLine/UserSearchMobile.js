import styled from "styled-components";
import { useEffect, useState, useContext } from "react";
import UserContext from '../../contexts/UserContext';
import { AiOutlineSearch } from "react-icons/ai";
import {DebounceInput} from 'react-debounce-input';
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function UserSearch() {
    const [searchText, setSearchText] = useState("");
    const {user: myUser} = useContext(UserContext);
    const [searchResults, setSearchResults] = useState([]);
    const [showableResults, setShowableResults] = useState([]);
    const history = useHistory();

    useEffect(()=>{
        if(searchText.length >= 3) {
            const config = { headers: { Authorization: `Bearer ${myUser.token}` } }
            const request = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/users/search?username=${searchText}`, config);

            request.then((response) => {
                setSearchResults(response.data.users);
            })
        } else {
            setShowableResults([]);
        }
    },[searchText])

    useEffect(()=>{
        organizeResults();
    },[searchResults])

    function organizeResults() {
        let followers = searchResults.filter(r => {return r.isFollowingLoggedUser})
        let unfollowers = searchResults.filter(r => {return !r.isFollowingLoggedUser})
        for(let i=followers.length; i>0; i--){unfollowers.splice(0, 0, followers[followers.length - 1]);}
        setShowableResults([...unfollowers]);
    }

    function goToUser(userId) {
        history.push(`/user/${userId}`);
        setSearchText("");
        setSearchResults([]);
        setShowableResults([]);
        window.location.reload();
    }

    return(
        <SearchResults>
            <Search>
                <SearchBox>
                    <DebounceInput
                        minLength={3}
                        debounceTimeout={300}
                        onChange={(e)=> {setSearchText(e.target.value)}}
                        placeholder="Search for people and friends"
                        value={searchText}
                    ></DebounceInput>
                    <AiOutlineSearch/>
                </SearchBox>
            </Search>
            {showableResults.length >= 1 ?
                showableResults.map(r => 
                    <Result onClick={() => {goToUser(r.id)}}>
                        <img alt="" src={r.avatar}></img>
                        <h1>{r.username}</h1>
                        {r.isFollowingLoggedUser ?
                            <h2> • following</h2> :
                            <></>
                        }
                    </Result>
                ) :
                <></>
            }
        </SearchResults>
    )
}

const SearchResults = styled.div`
    display: none;
    width: 563px;
    background: #E7E7E7;
    border: none;
    border-radius: 8px;
    top: 13.5px;
    left: calc(50vw - 281.5px);
    z-index: 3;
    @media(max-width: 850px){
        width: 50vw;
    }
    @media(max-width: 611px){
        display: block;
        margin-top: 80px;
        width: calc(100vw - 20px);
        margin-left: 10px;
        margin-right: 10px;
        z-index: 2;
    }
`;

const Search = styled.div`
    display: none;
    width: 563px;
    height: 45px;
    background: #FFFFFF;
    padding-left: 17px;
    padding-right: 13px;
    padding-top: 10px;
    padding-bottom: 12px;
    border-radius: 8px;
    input {
        width: 500px;
        height: 23px;
        color: #000000;
        font-family: Lato;
        font-size: 19px;
        line-height: 23px;
        margin: 0;
        padding: 0;
        border: none;
        ::placeholder {
            color: #C6C6C6;
        }
    }
    input:focus {
        outline: none !important;
    }
    svg {
        font-size: 21px;
        color: #C6C6C6;
    }
    @media(max-width: 850px){
        width: 50vw;
    }
    @media(max-width: 611px){
        display: block;
        width: 100%;
    }
`;

const SearchBox = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;

const Result = styled.div`
    display: flex;
    align-items: center;
    padding-left: 17px;
    padding-top: 3px;
    padding-bottom: 3px;
    margin-top: 8px;
    margin-bottom: 8px;
    cursor: pointer;
    h1, h2 {
        font-family: Lato;
        font-size: 19px;
        line-height: 23px;
        font-weight: 400;
    }
    h1 {
        color: #515151;
        margin-left: 12px;
        margin-right: 8px;
    }
    h2 {
        color: #C5C5C5;
    }
    img {
        width: 39px;
        height: 39px;
        border-radius: 20px;
    }
    :hover {
        background: #EFEFEF;
    }
`;