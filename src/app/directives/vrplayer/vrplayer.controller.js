'use strict';

export default class VRPlayerController {
    constructor($element, $sce) {

        // used to switch icons in html
        this.isVideoPlaying = false;
        this.isMuted = false;

        // strict contextual escaping of video urls
        this.src = $sce.trustAsResourceUrl(this.url);

        // fetching video element
        this.videoElem = $element[0].querySelector('video');
    }

    togglePlay() {

        // toogle video play/pause
        if(!this.isVideoPlaying) {
            this.videoElem.play();
            this.isVideoPlaying = true;
        } else {
            this.videoElem.pause();
            this.isVideoPlaying = false;
        }
    }

    toggleMute() {

        // toogle video mute on/off
        if(!this.isMuted) {
            this.videoElem.volume = 0.0;
            this.isMuted = true;
        } else {
            this.videoElem.volume = 1.0;
            this.isMuted = false;
        }
    }

    stop() {

        // stops video by pause and reset start time
        this.videoElem.pause();
        this.videoElem.currentTime = 0;
        this.isVideoPlaying = false;
    }
}

VRPlayerController.$inject = ['$element', '$sce'];