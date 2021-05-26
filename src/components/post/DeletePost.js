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
                height: '200px',
                width: '300px',
                margin: 'auto',
                border: '1px solid #ccc',
                background: '#fff',
                overflow: 'auto',
                WebkitOverflowScrolling: 'touch',
                borderRadius: '4px',
                outline: 'none',
                padding: '20px'
              }
            }}>
                Modal Content
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