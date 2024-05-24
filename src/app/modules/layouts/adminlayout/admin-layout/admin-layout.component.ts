import { Component } from '@angular/core';

import { RouterOutlet } from '@angular/router';
import { AdminNavBarComponent } from '../../../../shared/components/admin-nav-bar/admin-nav-bar.component';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    AdminNavBarComponent
  ],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent {

}
