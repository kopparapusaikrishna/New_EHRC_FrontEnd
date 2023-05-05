import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { NgxAgoraService, Stream, AgoraClient, ClientEvent, StreamEvent } from 'ngx-agora';

@Component({
  selector: 'app-meeting-page',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.css']
})
export class MeetingComponent implements OnInit {

  title = 'angular-video';
  localCallId = 'agora_local';
  remoteCalls: string[] = [];
  sliderValue = 50;

  private channel_name: any = '';
  private client: AgoraClient;
  private localStream: Stream;
  private uid: number;
  isVideoMuted: boolean
  isAudioMuted: boolean;

  constructor(private router: Router, private ngxAgoraService: NgxAgoraService, private location: Location) {
    this.uid = Math.floor(Math.random() * 100);
    this.client = this.ngxAgoraService.createClient({ mode: 'rtc', codec: 'h264' });
    this.assignClientHandlers();

    this.localStream = this.ngxAgoraService.createStream({ streamID: this.uid, audio: true, video: true, screen: false });
    this.assignLocalStreamHandlers();
    // Join and publish methods added in this step

    this.initLocalStream(() => this.join(uid => this.publish(), error => console.error(error)));
    this.channel_name = localStorage.getItem("channel_name");
    // this.channel_name = "sdkfn";
    this.isAudioMuted = false;
    this.isVideoMuted = false;
  }

  ngOnInit(): void {
    this.assignClientHandlers();
  }


  resizeVideos(): void {
    console.log(this.sliderValue);
    const video1 = document.querySelectorAll('.video1')[0] as unknown as HTMLVideoElement;
    const video2 = document.querySelectorAll('.video2')[0] as unknown as HTMLVideoElement;
    const video1Size = this.sliderValue;
    const video2Size = 100 - this.sliderValue;

    video1.style.width = video1Size + '%';
    video1.style.height = video1Size + '%';
    video2.style.width = video2Size + '%';
    video2.style.height = video2Size + '%';
  }

  

  join(onSuccess?: (uid: number | string) => void, onFailure?: (error: Error) => void): void {
    this.client.join(null, this.channel_name, this.uid, onSuccess, onFailure);
  }

  /**
   * Attempts to upload the created local A/V stream to a joined chat room.
   */
  publish(): void {
    this.client.publish(this.localStream, err => console.log('Publish local stream error: ' + err));
  }

  private assignClientHandlers(): void {
    this.client.on(ClientEvent.LocalStreamPublished, evt => {
      console.log('Publish local stream successfully');
    });

    this.client.on(ClientEvent.Error, error => {
      console.log('Got error msg:', error.reason);
      if (error.reason === 'DYNAMIC_KEY_TIMEOUT') {
        this.client.renewChannelKey(
          '',
          () => console.log('Renewed the channel key successfully.'),
          renewError => console.error('Renew channel key failed: ', renewError)
        );
      }
    });

    this.client.on(ClientEvent.RemoteStreamAdded, evt => {
      const stream = evt.stream as Stream;
      this.client.subscribe(stream, { audio: true, video: true }, err => {
        console.log('Subscribe stream failed', err);
      });
    });

    this.client.on(ClientEvent.RemoteStreamSubscribed, evt => {
      const stream = evt.stream as Stream;
      const id = this.getRemoteId(stream);
      if (!this.remoteCalls.length) {
        this.remoteCalls.push(id);
        setTimeout(() => stream.play(id), 1000);
      }
    });

    this.client.on(ClientEvent.RemoteStreamRemoved, evt => {
      const stream = evt.stream as Stream;
      if (stream) {
        stream.stop();
        this.remoteCalls = [];
        console.log(`Remote stream is removed ${stream.getId()}`);
      }
    });

    this.client.on(ClientEvent.PeerLeave, evt => {
      const stream = evt.stream as Stream;
      if (stream) {
        stream.stop();
        this.remoteCalls = this.remoteCalls.filter(call => call !== `${this.getRemoteId(stream)}`);
        console.log(`${evt.uid} left from this channel`);
      }
    });
  }

  private assignLocalStreamHandlers(): void {
    this.localStream.on(StreamEvent.MediaAccessAllowed, () => {
      console.log('accessAllowed');
    });

    // The user has denied access to the camera and mic.
    this.localStream.on(StreamEvent.MediaAccessDenied, () => {
      console.log('accessDenied');
    });
  }

  private initLocalStream(onSuccess?: () => any): void {
    this.localStream.init(
      () => {
        // The user has granted access to the camera and mic.
        this.localStream.play(this.localCallId);
        if (onSuccess) {
          onSuccess();
        }
      },
      err => console.error('getUserMedia failed', err)
    );
  }

  private getRemoteId(stream: Stream): string {
    return `agora_remote-${stream.getId()}`;
  }

  camera() {
    if(this.isVideoMuted){
      
      this.localStream.unmuteVideo();

    }
    else{
      console.log("hii");
      this.localStream.muteVideo();
      console.log("hii");
    }
    console.log("inside camera: "+this.isVideoMuted);
    
    this.isVideoMuted = !this.isVideoMuted;
    console.log("inside camera: "+this.isVideoMuted);
  }

  mute() {
    if(this.isAudioMuted){
      this.localStream.unmuteAudio();
    }
    else{
      // console.log("hi");
      this.localStream.muteAudio();
      // console.log("hi");
    }

    console.log("inside mute:"+this.isAudioMuted);
    
    this.isAudioMuted = !this.isAudioMuted;
    console.log("inside mute:"+this.isAudioMuted);
  }

  end() {
    this.client.leave(() => {
      this.ngxAgoraService.client.leave();
      this.client.unpublish(this.localStream);
      this.location.back();
      console.log("Leavel channel successfully");
    }, (err:any) => {
      console.log("Leave channel failed", err);
    });
  }

}
