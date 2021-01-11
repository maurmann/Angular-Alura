import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Photo } from '../photo/photo';
import { PhotoService } from '../photo/photo.service';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit, OnDestroy {

  photos: Photo[];
  filter: string = '';
  debounce: Subject<string> = new Subject<string>();
  hasMore: boolean = true;
  userName: string = '';
  currentPage: number = 1;

  constructor(
    private activatedRoute: ActivatedRoute,
    private PhotoService: PhotoService
  ) { }

  ngOnInit() {
    // le o dado lido pelo resolver
    this.userName = this.activatedRoute.snapshot.params.userName;
    this.photos = this.activatedRoute.snapshot.data['photos'];

    // tecnica para garantir que a pesquisa seja aplicada apenas apos 300ms que o usuario 
    // parou de digitar.
    // recurso conhecido como Lettable operators do RxJS
    this.debounce
      .pipe(debounceTime(300))
      .subscribe(filter => this.filter = filter);
  }

  // para nao gerar memory leak é necessario remover cancelar o subscribe
  // para subscribers de httlclient nao é necessario pois eles sao automaticamente 
  // encerrados ao receber a resposta do servidor
  ngOnDestroy(): void {
    this.debounce.unsubscribe();
  }

  load() {
    this.PhotoService.listFromUserPaginated(this.userName, ++this.currentPage)
      .subscribe(photos => {
        this.photos = this.photos.concat(photos);
        if (!photos.length) this.hasMore = false;
      });
  }

}