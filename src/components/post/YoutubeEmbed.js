import React from "react";
import PropTypes from "prop-types";
import styled from 'styled-components'

const YoutubeEmbed = ({ embedId }) => (
  <VideoResponsive>
    <iframe
      width="853"
      height="480"
      src={`https://www.youtube.com/embed/${embedId}`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  </VideoResponsive>
);

YoutubeEmbed.propTypes = {
  embedId: PropTypes.string.isRequired
};

export default YoutubeEmbed;

const VideoResponsive = styled.div`
    overflow: hidden;
    width: 501px;
    height: 281px;
    iframe {
        height: 100%;
        width: 100%;
    }
`;