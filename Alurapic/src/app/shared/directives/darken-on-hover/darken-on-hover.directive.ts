import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
    selector: '[apDarkenOnHover]'    // entre colchetes pq sera incluido como atributo em uma tag
})
export class DarkOnHoverDirective {


    // o parametro el do tipo ElementRef permite pegar o elemento do DOM na qual a diretiva foi adicionada

    constructor(
        private el: ElementRef,
        private render: Renderer2) { }

    // HostListener permite invocar o metodo quando o evento for gerado no elemento do DOM
    // que possui a diretiva

    @HostListener('mouseover')
    darkenOn() {
        this.render.setStyle(this.el.nativeElement,'filter','brightness(70%)');
    }

    @HostListener('mouseleave')
    darkenOff() {
        this.render.setStyle(this.el.nativeElement,'filter','brightness(100%)');
    }
}