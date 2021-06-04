import styled from "styled-components";
import ReactModal from 'react-modal';
import axios from "axios";
import { useState } from "react";
import { ImLoop } from "react-icons/im";

export default function RePost({ postId, userToken}) {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    function rePost(postId, userToken) {
        setIsLoading(true);
        
        const request = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${postId}/share`, {}, {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        });

        request.then((res) => {
            setIsLoading(false);
            setIsOpen(false);
        })

        request.catch((error) => {
            setIsLoading(false);
            setIsOpen(false);
            alert("Não foi possível repostar a publicação. Por favor, tente novamente.")
        })
    }

    const modalStyles = {
        overlay: {
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(255, 255, 255, 0.75)',
          zIndex: 10
        },
        content: {
          maxHeight: '262px',
          maxWidth: '597px',
          display: 'flex',
          justifyContent: 'center',
          margin: 'auto',
          background: '#333',
          WebkitOverflowScrolling: 'touch',
          borderRadius: '50px',
          border: 'none',
          outline: 'none',
          padding: '20px',
          overflow: 'hidden'
        }
      };

    return(
        <>
            <RePostButton onClick={() => setIsOpen(true)}><ImLoop /></RePostButton>
            <ReactModal isOpen={isOpen} style={modalStyles}>
                <DialogContent>
                    <Text>Você deseja repostar essa publicação?</Text>
                    <Buttons>
                        <CancelButton isloading={isLoading} disabled={isLoading} onClick={() => setIsOpen(false)}>Não, cancelar</CancelButton>
                        <ConfirmButton isloading={isLoading} disabled={isLoading} onClick={() => rePost(postId, userToken)}>Sim, repostar!</ConfirmButton>
                    </Buttons>
                </DialogContent>
            </ReactModal>
        </>
    )
}

const RePostButton = styled.button`
    color: #FFFFFF;
    font-size: 20px;
    background: none;
    border: none;
    padding: 0px;
    cursor: pointer;
    margin-top: 10px;
`;

const DialogContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 597px;
    height: 222px;
`;

const Text = styled.h1`
    width: 360px;
    text-align: center;
    font-family: Lato;
    font-weight: bold;
    font-size: 34px;
    line-height: 41px;
    color: #FFFFFF;
    margin-bottom: 39px;
`;

const Buttons = styled.div`
    display: flex;
    justify-content: space-between;
    width: 295px;
`;

const CancelButton = styled.button`
    width: 134px;
    height: 37px;
    background: #FFFFFF;
    color: #1877F2;
    font-family: Lato;
    font-size: 18px;
    line-height: 22px;
    text-align: center;
    border: none;
    border-radius: 5px;
    cursor: ${props=> props.isloading ? "not-allowed" : "pointer"};
`;

const ConfirmButton = styled.button`
    width: 134px;
    height: 37px;
    background: #1877F2;
    color: #FFFFFF;
    font-family: Lato;
    font-size: 18px;
    line-height: 22px;
    text-align: center;
    border: none;
    border-radius: 5px;
    cursor: ${props=> props.isloading ? "not-allowed" : "pointer"};
`;