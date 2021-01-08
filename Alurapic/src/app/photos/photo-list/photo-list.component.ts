import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Photo } from '../photo/photo';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit,OnDestroy {

  photos: Photo[];
  filter: string = '';
  debounce: Subject<string> = new Subject<string>();

  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    // le o dado lido pelo resolver
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

}