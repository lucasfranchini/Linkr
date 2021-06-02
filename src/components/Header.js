import { useContext, useState } from "react";
import { useLocation } from "react-router";
import styled from "styled-components";
import UserContext from "../contexts/UserContext";
import PostContext from "../contexts/PostContext";
import { IoIosArrowDown,IoIosArrowUp } from "react-icons/io";
import { Link } from "react-router-dom";
import UserSearch from "./UserSearch";

export default function Header(){
    const local = useLocation().pathname;
    const {user, setUser} = useContext(UserContext);
    const {setPostsData} = useContext(PostContext);
    const [openMenu,setOpenMenu] = useState(false);

    function toggleMenu(e){
        if(openMenu===false)setOpenMenu(true);
        else if(openMenu===true)setOpenMenu(false);
    }
    function closeMenu(e){
        let verification =true;
        if(e.relatedTarget!==null)verification=!(e.relatedTarget.innerHTML==='My posts'||e.relatedTarget.innerHTML==='My likes'||e.relatedTarget.innerHTML==='logout');
        if(openMenu===true && verification)setOpenMenu(false);
    }

    if(local==="/"|| local==="/signup") return null;
    return (
        <Body >
            <Title><Link to="/timeline">Linkr</Link></Title>
            <UserSearch/>
            <Menu onClick={toggleMenu} onBlur={closeMenu}>
                {openMenu ? <IoIosArrowUp/>:<IoIosArrowDown/>}
                <img src={user.user.avatar} alt="user"/>
                {
                    openMenu 
                    && 
                    <Links>
                        <Link to="/my-posts" onClick={()=>{
                            toggleMenu();
                            setPostsData(null);
                        }}>My posts</Link>
                        <Link to="/my-likes" onClick={()=>{
                            toggleMenu();
                            setPostsData(null);
                        }}>My likes</Link>
                        <Link to="/" onClick={()=>{localStorage.clear();setUser(null)}}>logout</Link>
                    </Links>
                }
            </Menu>
        </Body>
    );
}

const Body = styled.div`
    width: 100%;
    height: 72px;
    padding: 0 17px 0 28px;
    background-color: #151515;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    font-weight: 700;
    z-index: 3;
`
const Title = styled.div`
    font-family: 'Passion One', cursive;
    font-size: 49px;
    line-height: 54px;
`
const Menu=styled.button`
    height: 100%;
    display: flex;
    align-items: center;
    font-size: 30px;
    background-color: inherit;
    color:inherit;
    border: none;
    position: relative;
    cursor: pointer;
    img{
            width: 53px;
            height: 53px;
            border-radius: 50%;
            margin-left: 15px;
        }
`
const Links = styled.div`
    position: fixed;
    top: 72px;
    right: 0;
    display: flex;
    flex-direction: column;
    font-size: 17px;
    font-family: 'Lato', sans-serif;
    background-color: #171717;
    border-radius: 0 0 0 20px;
    padding: 0px 30px 17px 30px;
    a{
        margin-top: 10px;
    }
    @media(max-width:600px){
        font-size: 15px;
    }
`