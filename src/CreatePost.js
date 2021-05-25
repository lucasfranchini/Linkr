import styled from 'styled-components';

export default function CreatePost() {
    return(
        <Conteiner>
            <Title>O que você tem para favoritar hoje?</Title>
            <LinkInput placeholder="https://..."></LinkInput>
            <AboutInput placeholder="Muito irado esse link falando de #javascript"></AboutInput>
        </Conteiner>
    );
}

const Conteiner = styled.div`
    height: 209px;
    width: 611px;
    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 16px;
    padding-top: 21px;
    padding-left: 86px;
    padding-right: 22px;
`;

const Title = styled.div`
    font-size: 20px;
    line-height: 24px;
    color: #707070;
`;

const LinkInput = styled.input`
    width: 503px;
    height: 30px;
    padding: 10px;
    color: #000000;
    margin-top: 10px;
    background: #EFEFEF;
    border: none;
    border-radius: 5px;
    color: #949494;
`;

const AboutInput = styled.input`
    width: 503px;
    height: 66px;
    padding: 10px;
    color: #000000;
    margin-top: 10px;
    background: #EFEFEF;
    border: none;
    border-radius: 5px;
    color: #949494;
`;