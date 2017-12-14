import { Directive, HostListener, HostBinding } from "@angular/core";


@Directive({
    selector: '[vgDropdown]'
})
export class DropdownDirective {
    @HostBinding('class.open') isOpen = false;

    @HostListener('click') toggleMenuVisibility() {
        this.isOpen = !this.isOpen;
    }
}