import ReactModal from 'react-modal';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

export default function OpenMap({ toggleMap, setToggleMap }) {
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
        <ReactModal isOpen={toggleMap} style={modalStyles}>
            <LoadScript googleMapsApiKey="AIzaSyB5vTL7qMB8j1-3pIJttbjX_xfRgZkNcGI">
                <GoogleMap
                    mapContainerStyle={{
                        width: '400px',
                        height: '400px'
                      }}
                    center={{
                        lat: -3.745,
                        lng: -38.523
                      }}
                    zoom={10}
                >
                </GoogleMap>
            </LoadScript>
        </ReactModal>
    );
}