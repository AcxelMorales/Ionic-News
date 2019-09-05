import { Component, OnInit, OnDestroy } from '@angular/core';

import { NewsService } from 'src/app/providers/news.service';
import { IArticle } from 'src/app/interfaces/interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
})
export class Tab1Page implements OnInit, OnDestroy {

  news: IArticle[] = [];
  subscription: Subscription = new Subscription();

  constructor(public _newsService: NewsService) { }

  ngOnInit(): void {
    this.loadNews();
  }

  loadNews(event?: any): void {
    this.subscription = this._newsService.getTopHeadlines().subscribe(resp => {
      if (resp.articles.length === 0) {
        event.target.disabled = true;
        event.target.complete();
        return;
      }

      this.news.push(...resp.articles);

      if (event) {
        event.target.complete();
      }
    });
  }

  public loadData(event: any): void {
    this.loadNews(event);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
