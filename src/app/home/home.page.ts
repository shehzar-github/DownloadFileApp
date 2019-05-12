import { Component } from '@angular/core';
import {HttpRequest,HttpClient,HttpEventType} from '@angular/common/http';
import { map,tap,last } from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  percentage=0;
  showProgressBar=false;
  
  constructor(private http:HttpClient,private transfer: FileTransfer,private file: File,public toastController: ToastController){}
   fileTransfer: FileTransferObject = this.transfer.create()
  
  downloadFileWithFileTransfer(url){
    this. showProgressBar=true;
    //let downloadUrl = 'https://devdactic.com/html/5-simple-hacks-LBT.pdf';
    this.fileTransfer.download(url, this.file.dataDirectory + 'file.pdf').then((entry) => {
      console.log('download complete: ' + entry.toURL());
      this.presentToast();
     // this.percentage=0;
     this.showProgressBar=false;
    }, (error) => {
      // handle error
      console.log(error);
    });
    // this.fileTransfer.onProgress((progressEvent) => {
    //     let perc = Math.floor(progressEvent.loaded / progressEvent.total * 100);
    //     this.percentage = perc/100;
    // });

  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Your file have been downloaded.',
      duration: 2000
    });
    toast.present();
  }
  
}
