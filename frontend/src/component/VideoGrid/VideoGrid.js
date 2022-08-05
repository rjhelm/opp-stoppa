import React from "react";
import './VideoGrid.scss';
import { VideoGridHeader } from './VideoGridHeader/VideoGridHeader.js';
import { Divider } from 'semantic-ui-react';
import { VideoPreview } from '../VideoPreview/VideoPreview';

const VideoGrid = (props) => {
    if (!props.videos || !props.videos.length) {
        return <div/>;
    }
    const gridItems = props.videos.map(video => {
        return (
            <VideoPreview video={video} key={video.id} pathname='./watch' search={`?v=${video.id}`} />
        );
    });
    return (
        <React.Fragment>
            <VideoGridHeader title={props.title} />
            <div clasName="video-grid">
                {gridItems}
            </div>
            {Divider}
        </React.Fragment>
    );
}

export default VideoGrid;