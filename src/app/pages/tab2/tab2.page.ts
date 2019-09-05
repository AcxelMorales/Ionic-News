import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { IonSegment } from '@ionic/angular';

import { Subscription } from 'rxjs';

import { NewsService } from 'src/app/providers/news.service';
import { IArticle } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
})
export class Tab2Page implements OnInit, OnDestroy {

  @ViewChild(IonSegment, null) ionSegment: IonSegment;

  news        : IArticle[] = [];
  categories  : string[] = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
  subscription: Subscription = new Subscription();

  constructor(public _newsService: NewsService) {}

  ngOnInit(): void {
    this.ionSegment.value = this.categories[0];
    this.loadNews(this.ionSegment.value);
  }

  private loadNews(category: string, event?: any): void {
    this.subscription = this._newsService.getTopHeadlinesForCategory(category).subscribe(r => {
      this.news.push(...r.articles);

      if (event) {
        event.target.complete();
      }
    }); 
  }

  public changeCategory(event: any): void {
    this.news = [];
    this.loadNews(event.detail.value);
  }

  public loadData(event: any): void {
    this.loadNews(this.ionSegment.value, event);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
