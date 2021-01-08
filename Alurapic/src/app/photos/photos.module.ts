import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { PhotoComponent } from "./photo/photo.component";
import { PhotoListComponent } from './photo-list/photo-list.component';
import { PhotoFormComponent } from './photo-form/photo-form.component';
import { PhotosComponent } from './photo-list/photos/photos.component';
import { FilterByDescription } from './photo-list/filter-by-description.pipe';

@NgModule({
    declarations: [
        PhotoComponent, 
        PhotoListComponent, 
        PhotoFormComponent, PhotosComponent ,FilterByDescription],

    // CommomModule possui as diretivas, que também sao referenciadas em BrowserModule,
    // como BrowserModulo nao pode ser instanciado em outros modulos alem do modulo principal aqui 
    // usamos o CommomModule.

    // É uma boa pratica sempre importar CommomModule em modulos criados 

    imports: [HttpClientModule, CommonModule]
})
export class PhotosModule { }