import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {
  @Input() supportedFileTypes: Array<string>;
  @Output() selectedFile = new EventEmitter<any>();

  startUpload(event: FileList) {
    // The File object
    const file = event.item(0);

    // Client-side validation
    const fileType = file.type.split('/')[0];
    // tslint:disable-next-line:no-bitwise
    if (!~this.supportedFileTypes.indexOf(fileType)) {
      alert('This is not a supported file type. Please choose another file.');
      console.error('unsupported file type :( ');
      return;
    }

    this.selectedFile.emit(file);
  }
}
