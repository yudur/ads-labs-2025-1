import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-default',
  imports: [Header, RouterOutlet],
  templateUrl: './default.html',
})
export class Default {

}
