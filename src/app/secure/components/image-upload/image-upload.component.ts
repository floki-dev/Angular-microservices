import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ImageService} from "../../../services/image.service";

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {

  @Output('fileUploaded') fileUploaderEmitter = new EventEmitter<string>();

  constructor(private imageService: ImageService) {
  }

  ngOnInit(): void {
  }

  upload(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    const file = files.item(0) as File;

    // создаем form-data и кладем [image => file]
    const formData = new FormData();
    formData.append('image', file);

    this.imageService.upload(formData).subscribe(
      (res: any) => {
        console.log(res)
        this.fileUploaderEmitter.emit(res.url)
      }
    );
  }
}
