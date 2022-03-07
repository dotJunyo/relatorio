import { Component } from '@angular/core';
import * as htmlToImage from 'html-to-image';
import { Avaliador } from 'src/models/avaliador.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public aval = Avaliador;
  public avalNome: string = '';
  public avalPatente: string = '';
  public avalPassaporte: number = 0;

  title = 'relatorio';

  generateImage() {
    var node: any = document.getElementById('image-section');
    htmlToImage
      .toPng(node)
      .then(function (dataUrl) {
        var img = new Image();
        img.src = dataUrl;
        var link = document.createElement('a');
        link.href = img.src;
        link.download = 'Relatorio.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch(function (error) {
        console.error('Algo deu errado, avise o Junyo#3633!', error);
      });

    this.salvar();
  }

  constructor() {
    this.carregar();
  }

  salvar() {
    localStorage.setItem('avalNome', this.avalNome);
    localStorage.setItem('avalPatente', this.avalPatente);
    localStorage.setItem('avalPassaporte', JSON.stringify(this.avalPassaporte));
  }

  carregar() {
    if (localStorage.getItem('avalNome')) {
      this.avalNome = localStorage.getItem('avalNome') || '';
    }
    if (localStorage.getItem('avalPatente')) {
      this.avalPatente = localStorage.getItem('avalPatente') || '';
    }

    if (localStorage.getItem('avalPassaporte')) {
      this.avalPassaporte = JSON.parse(
        localStorage.getItem('avalPassaporte') || ''
      );
    }
  }
}
