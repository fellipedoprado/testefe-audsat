import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  nome: string = 'Fellipe do Prado Arruda';
  startDate = new Date('2024/01/13').toLocaleDateString('pt-BR'); //'13/01/2024'
}