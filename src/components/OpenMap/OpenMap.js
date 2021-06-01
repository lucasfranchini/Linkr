import ReactModal from 'react-modal';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import styled from 'styled-components';
import { IoIosClose } from "react-icons/io";

export default function OpenMap({ toggleMap, setToggleMap,geolocation,name}) {
    const modalStyles = {
        overlay: {
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(255, 255, 255, 0.75)',
            zIndex: 10
        },
        content: {
            maxHeight: '354px',
            maxWidth: '790px',
            margin: 'auto',
            background: '#333',
            WebkitOverflowScrolling: 'touch',
            borderRadius: '20px',
            border: 'none',
            outline: 'none',
            padding: '10px 20px',
        }
    };
    return (
        <ReactModal isOpen={toggleMap} style={modalStyles} ariaHideApp={false}>
            <LoadScript googleMapsApiKey="AIzaSyB5vTL7qMB8j1-3pIJttbjX_xfRgZkNcGI">
                <Header>
                    <span>{`${name}'s location`}</span>
                    <Close onClick={()=>setToggleMap(false)}/>  
                </Header>
                <GoogleMap
                    mapContainerStyle={{
                        width: '100%',
                        height: '80%'
                      }}
                    center={{
                        lat: parseFloat(geolocation.latitude),
                        lng: parseFloat(geolocation.longitude)
                      }}
                    zoom={15}
                />
            </LoadScript>
        </ReactModal>
    );
}

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    font-size: 38px;
    line-height: 56px;
    font-family: oswald;
`
const Close = styled(IoIosClose)`
    cursor: pointer;
`