import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() titulo: string;
  @Input() icono: string;
  @Input() botones: Array<Array<String>>;


  constructor() { 
    console.log(this.botones);
  }

  ngOnInit() {
  }

}
