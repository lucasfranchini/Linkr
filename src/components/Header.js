import { useContext, useState } from "react";
import { useLocation } from "react-router";
import styled from "styled-components";
import UserContext from "../contexts/UserContext";
import { IoIosArrowDown,IoIosArrowUp } from "react-icons/io";

export default function Header(){
    const local = useLocation().pathname;
    const {user} = useContext(UserContext);
    const [openMenu,setOpenMenu] = useState(false);
    console.log(user)

    function toggleMenu(){
        if(openMenu===false)setOpenMenu(true);
        else if(openMenu===true)setOpenMenu(false);
    }

    if(local==="/"|| local==="/signup") return null;
    return (
        <Body onClick={toggleMenu}>
            <Title>Linkr</Title>
            <Menu>
                {openMenu ? <IoIosArrowUp/>:<IoIosArrowDown/>}
                <img src={user.user.avatar} alt="user"/>
                
            </Menu>
        </Body>
    );
}

const Body = styled.div`
    width: 100%;
    height: 72px;
    padding: 0 17px 0 28px;
    background-color: #151515;
    position:fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
`
const Title = styled.div`
    font-family: 'Passion One', cursive;
    font-weight: 700;
    font-size: 49px;
    line-height: 54px;
`
const Menu=styled.div`
    display: flex;
    align-items: center;
    font-size: 30px;
    img{
            width: 53px;
            height: 53px;
            border-radius: 50%;
            margin-left: 15px;
        }
`