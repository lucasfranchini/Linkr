import styled from "styled-components";
import ReactModal from 'react-modal';
import axios from "axios";
import { useState, useContext } from "react";
import UserContext from '../../contexts/UserContext';
import PostContext from '../../contexts/PostContext';
import { IoMdTrash } from "react-icons/io";

export default function DeletePost({ postId, userToken }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { postsData, setPostsData } = useContext(PostContext);

    function deletePost(postId, userToken) {
        const config = {
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        };
        const request = axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/posts/${postId}`, config);

        request.then((res) => {
            setIsLoading(true);
            let array = [...postsData];
            let newPostsData = array.filter(e => e.id != postId);
            setIsOpen(false);
            setPostsData(newPostsData);
            setIsLoading(false);
        })

        request.catch((error) => {
            setIsOpen(false);
            alert("Não foi possível excluir o post. Por favor, tente novamente.")
        })
    }

    return(
        <>
            <DeleteButton onClick={() => setIsOpen(true)}><IoMdTrash /></DeleteButton>
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
                        <CancelButton isloading={isLoading} disabled={isLoading} onClick={() => setIsOpen(false)}>Cancelar</CancelButton>
                        <ConfirmButton isloading={isLoading} disabled={isLoading} onClick={() => deletePost(postId, userToken)}>Sim, excluir</ConfirmButton>
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
    color: #FFFFFF;
    font-size: 20px;
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