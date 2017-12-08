import { AfterViewInit, Component, ElementRef, HostListener, Renderer } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
    numbers = Array(20).map((x, i) => i);

    constructor(private elementRef: ElementRef, private renderer: Renderer) {
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        let allMods = this.elementRef.nativeElement.querySelector('section').children;
        for (let module of allMods) {
            if (this.isVisible(module)) {
                this.renderer.setElementClass(module, 'already-visible', true);
            }
        }
    }

    isVisible(el: any): boolean {
        let viewTop = document.documentElement.scrollTop;
        let viewBottom = viewTop + document.documentElement.clientHeight;
        let top = el.offsetTop;
        let bottom = top + el.offsetHeight;

        console.log('view top', viewTop, 'view bottom', viewBottom, 'top', top, 'bottom', bottom);

        return ((top <= viewBottom) && (bottom >= viewTop));
    }

    @HostListener('window:scroll', ['$event']) onScrollEvent($event) {
        let allMods = this.elementRef.nativeElement.querySelector('section').children;
        for (let module of allMods) {
            if (this.isVisible(module)) {
                this.renderer.setElementClass(module, 'come-in', true);
            }
        }
    }
}
