import styled from 'styled-components'

const Filler = styled.div`
    display: ${(props)=>(props.active ? 'block' : 'none' )};
    position: absolute;
    z-index: -1;
    height: 100%;
    bottom: 0;
    width: 100%;
    border-radius: 16px;
    background: #1E1E1E;
    @media(max-width: 611px) {
        border-radius:0px;
    }
`
const CommentsContainer = styled.article`
    display: ${(props)=>(props.active ? 'flex' : 'none' )}; 
    flex-direction:column;
    justify-content:center;
    align-items:flex-start;
    background: #1E1E1E;
    padding: 12px 20px 24px;
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
    @media(max-width: 611px) {
        border-bottom-left-radius: 0px;
        border-bottom-right-radius: 0px;
    }

`
const Spreader = styled.div`
    margin:15px 0;
    width:100%;
    border: 0.5px solid #353535;
    border-radius: 1px;
    color:#353535;;
    transform: rotate(-0.1deg);
`
const InputComment = styled.div`
    display:flex;
    align-items:center;
    justify-content:space-between;
    width:100%;
    form{
        margin-left: 14px;
        position: relative;
        width:100%;
    }
    input{
        background: #252525;
        border: none;
        outline: none;
        border-radius: 8px;
        line-height: 17px;
        text-indent: 15px;
        color:#F3F3F3;
        min-height:39px;
        width:100%;
    }
    input::placeholder{
        font-family: Lato;
        font-size: 14px;
        font-style: italic;
        font-weight: 400;
        line-height: 17px;
        letter-spacing: 0.05em;
        text-align: left;
        text-indent: 15px;
    }
    img {
        height: 39px;
        width: 39px;
        border-radius:50%;
    }
    svg{
        height: 15px;
        width: 15px;
        position:absolute;
        color:#F3F3F3;
        right: 12.5px;
        bottom: 12.5px;
    }
`
export { Filler, CommentsContainer, Spreader, InputComment}
