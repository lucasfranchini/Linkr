import styled from 'styled-components'
import { IoLocationSharp } from "react-icons/io5";

const RepostInfo = styled.div `
    width: 612px;
    background: #1E1E1E;
    margin-bottom: 16px;
    border-radius: 16px 16px 16px 16px;
    @media(max-width: 611px) {
        width:100vw;
        border-radius: 0px;
    }
`;

const RepostedByWho = styled.div`
    display: flex;
    align-items: center;
    svg {
        color: #FFFFFF;
        margin-left: 13px;
    }
    h3 {
        margin-top: 11px;
        margin-left: 6px;
        margin-bottom: 11px;
        font-size: 11px;
        line-height: 13px;
        font-family: Lato;
        font-weight: 400;
        letter-spacing: 0em;
        color:#FFF;
    }
    strong {
        margin-left: 3px;
    }
`;

const Container = styled.div`
    position:relative;
    z-index:2;
    font-family: Lato;
    font-weight: 400;
    letter-spacing: 0em;
    color:#FFF;
    margin-bottom: 16px;
    width: 612px;
    z-index:2;
    @media(max-width: 611px) {
        padding: 0px;
        width:100%;
        border-radius:0px;
        height:auto;
    }
`
const Card = styled.div`
    display:flex;
    align-items: flex-start;
    justify-content:center;
    padding: 16px 20px 20px 12px;
    background: #171717;
    border-radius: 16px;
    overflow: scroll;
    -ms-overflow-style: none;  /* Internet Explorer 10+ */
    scrollbar-width: none;
    ::-webkit-scrollbar{
        width: 0;
    }
    @media(max-width: 611px) {
        padding: 15px 18px 8px 15px;
        border-radius:0px;
        width:100%;
        height:auto;
    }
`
const PostCreator = styled.div`
    width: 62px;
    display:flex;
    flex-direction:column;
    align-items: center;
    justify-content:start;
    img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-bottom: 18px;
    }
    svg {
        height: 20px;
        width: 20px;
        cursor: pointer;
    }
    p {
        margin: 4px 0px 14px;
        width:100%;
        font-size: 11px;
        line-height: 13px;
        text-align:center;
    }
    @media(max-width: 611px) {
        img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin-bottom: 18px;
        }
        svg {
            height: 18px;
            width: 18px;
        }
        p {
            margin-top: 12px;
            font-size: 9px;
            line-height: 11px;
        }
    }
`
const PostContentStyle = styled.div`
    position: relative;
    z-index: 2;
    width: 502px;
    margin-left: 16px;
    display:flex;
    flex-direction:column;
    align-items: flex-start;
    justify-content:space-between;
    word-break:break-all;
    h3 {
        font-size: 19px;
        line-height: 23px;
        color: #FFFFFF;
        margin:2px 0 8px 0;
    }
    p{
        margin:0 0 12px 0;
        font-size: 17px;
        line-height: 20px;
        color: #B7B7B7;
        >span{
            cursor: pointer;
        }
    }
    span { //hashtag Style
        color:#FFF;
        font-weight: 700;
    }
    @media(max-width: 611px) {
        width: 100%;
        h3 {
            font-size: 17px;
            line-height: 20px;
        }
        p{
            font-size: 15px;
            line-height: 18px;
        }
    }
`
const PostSnippet = styled.div`
    position: relative;
    z-index:2;
    padding-left: 20px;
    width: 502px;
    border: 1px solid #4D4D4D;
    border-radius: 11px;
    display:flex;
    align-items: center;
    justify-content:space-between;
    &:hover{
        cursor: pointer;
    }
    @media(max-width: 611px) {
        width: 100%;
        padding:0;
        min-height: 115px;
        justify-content:center;
        justify-content:flex-start;
    }
`
const SpinnetContent = styled.article`
    margin:24px 28px 23px 0;
    width: 304px;
    display:flex;
    flex-direction:column;
    align-items:flex-start;
    justify-content:space-between;
    font-size: 16px;
    span{
        text-align: left;
        margin-left:0;
        line-height: 19px;
        color: #CECECE;
    }
    p{
        font-size: 11px;
        line-height: 13px;
        color: #9B9595;
        margin:6px 0 14px;
    }
    
    @media(max-width: 611px) {
        margin:0;
        padding:7px 11px 8px 12px;
        width: calc(100% - 115px);
        span{
            font-size: 11px;
            line-height: 13px;
        }
        p{
            font-size: 9px;
            line-height: 11px;
            margin:6px 0 14px;
        }
    }
`
const PageLink = styled.span`
    font-size: 11px; 
    @media(max-width: 611px) {
            font-size: 9px;
            line-height: 11px;
            margin:0;
    }
`
const SnippetImg = styled.img`
    position:absolute;
    right:0px;
    top:0px;
    height:100%;
    width: 154px;
    border-radius: 0px 12px 13px 0px;
    @media(max-width: 611px) {
        height: 100%;
        width:115px;
    }
`

const EditButton = styled.button`
    position: absolute;
    top: 5px;
    right: 35px;
    color: #FFFFFF;
    font-size: 20px;
    background: none;
    border: none;
    padding: 0px;
    cursor: pointer;
`;

const Form = styled.form`
    margin:0 0 12px 0;
    padding-right:2px;
    width:100%;
    textarea {
        outline:none;
        width:100%;
        height: 34px;
        color: #4C4C4C;
        margin-top: 10px;
        background: #EFEFEF;
        border: none;
        border-radius: 5px;
        font-family: Lato;
        font-weight: 400;
        font-size: 14px;
        line-height: 17px;
        resize: none;
        padding-left: 6px;
        padding-top: 6px;
        padding-right: 6px;
    }
`;

const Author =styled.div`
    display: flex;
    align-items: center;
    svg {
        margin-bottom: 5px;
    }
    a{
        margin-right: 5px;
    }
`
const IoLocation = styled(IoLocationSharp)`
    cursor: pointer;
`

const RepostIcon = styled.svg`
    color: #FFFFFF;
    font-size: 20px;
    background: none;
    border: none;
    padding: 0px;
    cursor: pointer;
    margin-top: 10px;
`;

export {SnippetImg, SpinnetContent, PostSnippet, PostContentStyle, PostCreator, Container, EditButton, Form, PageLink, Card, RepostInfo, RepostIcon, RepostedByWho, IoLocation, Author}
