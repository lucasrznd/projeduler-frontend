import { Component } from '@angular/core';

import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  anoAtual: number = new Date().getFullYear();
  versao: string = environment.version;

  constructor() {}
}
