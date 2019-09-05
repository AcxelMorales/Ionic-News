import { Component, Input, OnInit } from '@angular/core';

import { IArticle } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
})
export class NewsComponent implements OnInit {

  @Input() news       : IArticle[] = [];
  @Input() inFavorites: boolean = false;
  
  ok: boolean = false;

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.ok = true;
    }, 1500);
  }

}
