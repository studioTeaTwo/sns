export class PictureComponent implements OnInit {
  @ViewChild('video') videoElm: ElementRef;
  @ViewChild('canvas') canvasElm: ElementRef;

  readonly medias = {audio: false, video: {
    facingMode: 'user',
    // facingMode: {
    //   exact : 'environment'
    // },
  }};
  private captureData: string;

  ngOnInit() {
    this.startCamera();
  }

  onClick() {
    this.captureData = this.draw();
    this.stopCamera();
    this.saveFile();
  }

  private draw() {
    // 写真のサイズを決める
    const WIDTH = this.videoElm.nativeElement.clientWidth;
    const HEIGHT = this.videoElm.nativeElement.clientHeight;

    // canvasを用意する
    const ctx = this.canvasElm.nativeElement.getContext('2d');
    this.canvasElm.nativeElement.width  = WIDTH;
    this.canvasElm.nativeElement.height = HEIGHT;

    // canvasの描画をしつつBase64データを取る
    return this.canvasElm.nativeElement.toDataURL(ctx.drawImage(this.videoElm.nativeElement, 0, 0, WIDTH, HEIGHT));
  }

  private startCamera() {
    window.navigator.mediaDevices.getUserMedia(this.medias)
      .then(stream => this.videoElm.nativeElement.srcObject = stream)
      .catch(error => {
        console.error(error);
        alert(error);
      });
  }

  private stopCamera() {
    this.videoElm.nativeElement.pause();
    const track = this.videoElm.nativeElement.srcObject.getTracks()[0] as MediaStreamTrack;
    track.stop();
  }
}