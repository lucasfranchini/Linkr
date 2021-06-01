import getYouTubeID from 'get-youtube-id';
import YoutubeEmbed from "./YoutubeEmbed";
import styled from 'styled-components'

export default function VideoPlayer({link}) {
    let embedId = getYouTubeID(link);
    return(
        <>
            <YoutubeEmbed embedId={embedId} />
            <LinkURL href={link}>{link}</LinkURL>
        </>
    )
}

const LinkURL = styled.a`
    font-family: Lato;
    font-size: 17px;
    line-height: 20px;
    color: #B7B7B7;
    margin-top: 10px;
`;