import styled from "styled-components";

export default function PageTitle({title}) {
    return(
        <Container>
            <h1>{title}</h1>
        </Container>
    );
}
const Container = styled.div`
    margin-top: 72px;
    display:flex;
    align-items:center;
    height: 160px;
    width: 100%;
    h1{
        margin-left:0;
        font-family: Oswald;
        font-size: 43px;
        font-weight: 700;
        line-height: 64px;
        letter-spacing: 0em;
        color:#FFF;
    }
    @media(max-width: 940px) {
        height: 86px;
        padding-left: 18px;
    }
`