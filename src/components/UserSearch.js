import styled from "styled-components";
import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";

export default function UserSearch() {
    const [user, setUser] = useState("");

    return(
        <SearchResults>
            <Search>
                <SearchBox>
                    <input placeholder="Search for people and friends"></input>
                    <AiOutlineSearch/>
                </SearchBox>
            </Search>
            <Result><h1>Lalala</h1><h2>- following</h2></Result>
            <Result><h1>Lalala</h1></Result>
            <Result><h1>Lalala</h1></Result>
        </SearchResults>
    )
}

const SearchResults = styled.div`
    width: 563px;
    background: #E7E7E7;
    border: none;
    border-radius: 8px;
    position: absolute;
    top: 13.5px;
    left: calc(50vw - 281.5px);
`;

const Search = styled.div`
    width: 563px;
    height: 45px;
    background: #FFFFFF;
    padding-left: 17px;
    padding-right: 13px;
    padding-top: 10px;
    padding-bottom: 12px;
    border-radius: 8px;
    input {
        width: 244px;
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
    svg {
        font-size: 21px;
        color: #C6C6C6;
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
    margin-left: 17px;
    margin-top: 8px;
    margin-bottom: 8px;
    h1, h2 {
        font-family: Lato;
        font-size: 19px;
        line-height: 23px;
        font-weight: 400;
    }
    h1 {
        color: #515151;
    }
    h2 {
        color: #C5C5C5;
    }
`;