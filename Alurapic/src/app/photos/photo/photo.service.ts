import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Photo } from "./photo";

// Decorator Injectable com propriedade providedIn = root é necessario para injetar essa 
// classe em outras classe, root indica que o escopo é raiz, qualquer classe poderá injetar essa classe

@Injectable({ providedIn: 'root' })
export class PhotoService {

    // Ao informar private ou public já cria implicitamente uma propriedade para o objeto injetado
    constructor(private http: HttpClient) { }

    listFromUser(userName: string): Observable<Photo[]> {
        return this.http
            .get<Photo[]>('http://localhost:3000/' + userName + '/photos');
    }

    listFromUserPaginated(userName: string, page: number): Observable<Photo[]> {
        const params = new HttpParams()
            .append('page', page.toString());

        return this.http
            .get<Photo[]>('http://localhost:3000/' + userName + '/photos', { params: params });
    }
}