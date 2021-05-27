import styled from "styled-components";
import ReactModal from 'react-modal';
import axios from "axios";
import { useState } from "react";

export default function DeletePost({ postId, userToken, isOpen, setIsOpen }) {

    return(
        <>
            <DeleteButton onClick={() => setIsOpen(true)}>apagar</DeleteButton>
            <ReactModal isOpen={isOpen} style={{
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
                border: '1px solid #ccc',
                background: '#333',
                overflow: 'auto',
                WebkitOverflowScrolling: 'touch',
                borderRadius: '50px',
                border: 'none',
                outline: 'none',
                padding: '20px',
                overflow: 'hidden'
              }
            }}>
                <DialogContent>
                    <Text>Tem certeza que deseja excluir essa publicação?</Text>
                    <Buttons>
                        <CancelButton>Cancelar</CancelButton>
                        <ConfirmButton>Sim, excluir</ConfirmButton>
                    </Buttons>
                </DialogContent>
            </ReactModal>
        </>
    )
}

const DeleteButton = styled.button`
    position: absolute;
    top: 5px;
    right: 5px;
    color: red;
    font-size: 11;
    background: none;
    border: none;
    padding: 0px;
    cursor: pointer;
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
    cursor: pointer;
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
    cursor: pointer;
`;