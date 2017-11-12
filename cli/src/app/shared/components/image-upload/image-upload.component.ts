import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChange} from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit, OnChanges {
  @Input() imgSrc: any;
  @Output() onUploaded  = new EventEmitter();
  private newFile = {
    type: null,
    data: null
  };

  constructor() { }

  ngOnInit() { }

  ngOnChanges(changes: {[propName: string]: SimpleChange}) {
    if (changes['imgSrc']) {
      this.handleChangeImage();
    }
  }

  handleChangeImage(): void {
    Observable.of(this.imgSrc[0])
      // 画像だけ読み込む
      .filter(file => file.type.match(/image\/(jpeg|png|gif)/))
      .concatMap(file => this.readFile(file))
      // DOM領域にロードする
      .map((fileData) => this.loadFile(fileData))
      // canvasでリサイズする
      .concatMap((img) => this.resize(img))
      .subscribe((resizedImg) => {
        // ユーザーに見せる
        this.loadResizedFile(resizedImg);
      });
  }

  onClick() {
    this.onUploaded.emit(this.newFile.data);
  }

  private readFile(file: File): Observable<string> {
    return new Observable(obs => {
      const reader = new FileReader();
      reader.onload = () => {
          obs.next(reader.result);
          obs.complete();
      };
      reader.readAsDataURL(file);
      this.newFile.type = file.type;
    });
  }

  private loadFile(result: string): HTMLImageElement {
    const previewEl = document.getElementById('preview').children[0] as HTMLImageElement;
    previewEl.setAttribute('src', result);
    // ユーザーには見せない
    previewEl.setAttribute('style', 'display:none');
    return previewEl;
  }

  private resize(img: HTMLImageElement): Observable<string> {
    const MAX_WIDTH = 300;
    const MAX_HEIGHT = 400;

    return new Observable(obs => {
      img.onload = () => {
        // 同じ縮尺でリサイズする
        let width = img.width;
        let height = img.height;
        if (width > height) {
          if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
          }
        }
        // canvasでリサイズする
        const canvas = document.createElement('canvas');
        canvas.width = MAX_WIDTH;
        canvas.height = MAX_HEIGHT;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        obs.next(canvas.toDataURL(this.newFile.type));
        obs.complete();
      };
    });
  }

  private loadResizedFile(resizedImg: string): void {
    // リサイズしたデータを格納する
    this.newFile.data = resizedImg;

    // リサイズした画像をユーザーに見せる
    const drawFiled = document.getElementById('profileImage').children[0] as HTMLImageElement;
    drawFiled.setAttribute('src', resizedImg);
  }
}