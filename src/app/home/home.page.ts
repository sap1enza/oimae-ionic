import { Component } from '@angular/core';
import { watsonConversation } from '../../services/watsonServices/watsonConversation.service'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  mensagem: string = "";
  mensagens: Array<Mensagem>;

  chatbot_mensagem = '';

  constructor(public WatsonConversation: watsonConversation) {
    this.mensagens = new Array<Mensagem>();
   }

  sendMessage() {
    if(this.chatbot_mensagem.length <= 0) {
      alert('preencha uma mensagem!');
    } else {
      this.WatsonConversation.sendMessage(this.chatbot_mensagem).subscribe((data) => {
        this.mensagens.push(new Mensagem(this.chatbot_mensagem, false));
        this.mensagens.push(new Mensagem(data.output.text[0], true));
      },
      (error) => {
          alert(error);
      })
    }
  }
}

export class Mensagem  {
  mensagem: string;
  isWatson: boolean;

  constructor(mensagem: string, isWatson: boolean) {
      this.mensagem = mensagem;
      this.isWatson = isWatson;
  }
}