import { Component } from '@angular/core';

import { FrontPageComponent } from '../../../../shared/components/front-page/front-page.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';

@Component({
  selector: 'app-authentication-layout',
  standalone: true,
  imports: [FrontPageComponent, FooterComponent, RouterOutlet],
  templateUrl: './authentication-layout.component.html',
  styleUrl: './authentication-layout.component.css'
})
export class AuthenticationLayoutComponent {

}
