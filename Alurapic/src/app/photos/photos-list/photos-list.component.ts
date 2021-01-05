import { Component, OnInit } from '@angular/core';
import { Photo } from '../photo/photo';
import { PhotoService } from '../photo/photo.service';

@Component({
  selector: 'app-photos-list',
  templateUrl: './photos-list.component.html',
  styleUrls: ['./photos-list.component.css']
})
export class PhotosListComponent implements OnInit {

  photos: Photo[];

  constructor(private photoService: PhotoService) { }

  ngOnInit() {
    this.photoService.listFromUser('flavio').subscribe(photos => this.photos = photos);
  }


}
