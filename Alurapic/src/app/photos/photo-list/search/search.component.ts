import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
    selector: 'ap-search',
    templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit, OnDestroy {

    @Output() onTyping: EventEmitter<string> = new EventEmitter<string>();
    @Input() value: string = '';
    debounce: Subject<string> = new Subject<string>();

    ngOnInit() {
        // tecnica para garantir que a pesquisa seja aplicada apenas apos 300ms que o usuario 
        // parou de digitar.
        // recurso conhecido como Lettable operators do RxJS
        this.debounce
            .pipe(debounceTime(300))
            .subscribe(filter=>this.onTyping.emit (filter));
    }

    // para nao gerar memory leak é necessario remover cancelar o subscribe
    // para subscribers de httlclient nao é necessario pois eles sao automaticamente 
    // encerrados ao receber a resposta do servidor
    ngOnDestroy(): void {
        this.debounce.unsubscribe();
    }
}