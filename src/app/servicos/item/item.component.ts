import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Item } from 'app/model';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  @Input() itens= [];
  @Output() alterarItensEvento = new EventEmitter();
  displayDialog: boolean;
  item = new Item();

  ngOnInit() {
  }

  exibeMenuAdicionarItem() {
    this.displayDialog = true;
    this.item = new Item();
  }

  adicionarItem() {
    if (isNaN(this.item.valor)) {
      this.item.valor = 0;
    }

    this.itens.push(this.item);

    this.alterarItensEvento.emit(this.itens);
    this.displayDialog = false;
  }

  delete(item) {
    const index = this.itens.indexOf(item);
    if ( index > -1) {
      this.itens.splice(index, 1);
    }
    this.alterarItensEvento.emit(this.itens);
  }

}
