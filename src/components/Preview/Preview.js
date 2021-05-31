import styled from "styled-components";
import ReactModal from 'react-modal';
import { IoIosClose } from "react-icons/io";

export default function Preview({preview,link,setPreview}){
    const modalStyles = {
        overlay: {
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(255, 255, 255, 0.75)',
          zIndex: 10
        },
        content: {
          maxHeight: '966px',
          maxWidth: '904px',
          margin: 'auto',
          background: '#333',
          WebkitOverflowScrolling: 'touch',
          borderRadius: '20px',
          border: 'none',
          outline: 'none',
          padding: '10px 20px 20px 20px ',
        }
      };   
    return (
        <ReactModal isOpen={preview} style={modalStyles}>
            <Header>
                <a href={link} target="_blank" rel="noopener noreferrer">
                    <Button>
                        Open in new tab 
                    </Button>
                </a>
                <IoIosClose onClick={()=>setPreview(false)}/>
            </Header>
            <Iframe src={link} name="link para pagina clicada" referrerPolicy="no-referrer"/>
        </ReactModal>
    );
}

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 30px;
    color: #fff;
    margin-bottom: 15px;
`
const Button = styled.button`
    background-color: #1877F2;
    border: none;
    border-radius: 5px;
    color: #fff;
    padding: 7px 17px;
    
`
const Iframe = styled.iframe`
    width:100%;
    height:92%;
`