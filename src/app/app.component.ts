import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { fontAwesomeIcons } from './shared/font-awesome-icons';
import { NavbarComponent } from "./layout/navbar/navbar.component";
import { CollectionComponent } from "./layout/collection/collection.component";
import { HeaderComponent } from "./layout/header/header.component";
import { ToastService } from './service/toast.service';
import {NgbModal, NgbModalRef, NgbToast} from "@ng-bootstrap/ng-bootstrap";
import { AddProductComponent } from "./add-product/add-product.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FontAwesomeModule, NavbarComponent, CollectionComponent, HeaderComponent, NgbToast, AddProductComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'assara-front';

  private faIconLibrairy: FaIconLibrary = inject(FaIconLibrary);

  toastService : ToastService = inject(ToastService)

  ngOnInit(): void {
      this.initFontAwesome();
  }

  initFontAwesome() {
    return this.faIconLibrairy.addIcons(...fontAwesomeIcons)
  }

  
}
