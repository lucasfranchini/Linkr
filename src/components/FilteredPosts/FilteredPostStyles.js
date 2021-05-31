import styled from "styled-components";

const Body =  styled.div`
width: 940px;
margin: 125px auto;
@media(max-width:940px){
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

`
const Title = styled.div`
font-family: 'Oswald', sans-serif;
color: #fff;
font-size: 43px;
font-weight: 700;
line-height: 64px;
margin-bottom: 43px;
width: 100%;
display: flex;
justify-content: space-between;
align-items: center;
flex-wrap: wrap;
img{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 20px;
}
div{
    display: flex;
    align-items: center;
}
@media(max-width:940px){
    width: 612px;;
   
}
@media(max-width:612px){
    width: 100%;
    font-size: 30px;
    justify-content: center;
}
`
const Posts =  styled.div`
display:flex;
flex-direction:column;
align-items:flex-start;
justify-content:center;

`
const Content = styled.div`
display: flex;
justify-content: space-between;
align-items: flex-start;
>div{
    margin:0;    
}
`
const Button = styled.button`
background-color: ${props=>props.follow ? '#fff': '#1877F2'};
color: ${props=>props.follow ? '#1877F2': '#fff'};
border: none;
padding: 7px 30px; 
border-radius: 5px;
cursor: ${props=>props.disabled ? 'not-allowed':'pointer'};
`

export {Button,Content,Posts,Title,Body}