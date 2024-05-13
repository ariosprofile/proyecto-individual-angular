import { Component } from '@angular/core';

import { FrontPageComponent } from '../../../../shared/components/front-page/front-page.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-authentication-layout',
  standalone: true,
  imports: [FrontPageComponent, RouterOutlet],
  templateUrl: './authentication-layout.component.html',
  styleUrl: './authentication-layout.component.css'
})
export class AuthenticationLayoutComponent {

}
