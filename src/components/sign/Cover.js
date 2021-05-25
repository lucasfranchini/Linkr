import styled from "styled-components"

export default function Cover() {
    return (
        <Container>
            <h1>linkr</h1>
            <h2>
                save, share and discover<br/>
                the best links on the web
            </h2>
        </Container>
    );
}

const Container = styled.div`
    width: 100%;
    padding:0 0 150px 8%;
    background: #151515;
    box-shadow: 4px 0px 4px 0px #00000040;
    color:#FFF;
    font-weight: 700;
    display:flex;
    flex-direction:column;
    align-items:flex-start;
    justify-content:center;
    h1 {
        font-family: Passion One;
        font-size: 106px;
        line-height: 117px;
        letter-spacing: 0.05em;
        margin-bottom: 20px;
    }
    h2{
        font-family: Oswald;
        font-size: 43px;
        line-height: 64px;
        letter-spacing: 0em;
    }
`