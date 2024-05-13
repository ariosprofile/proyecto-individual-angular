import { Component } from '@angular/core';
import { NavBarComponent } from '../../../../shared/components/nav-bar/nav-bar.component';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user-layout',
  standalone: true,
  imports: [NavBarComponent, FooterComponent, RouterOutlet],
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.css'
})
export class UserLayoutComponent {

}
