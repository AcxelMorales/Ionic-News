import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IArticle } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  news: IArticle[] = [];

  constructor(private storage: Storage) {
    this.getData();
  }

  saveNew(neew: IArticle): void {
    const exist = this.news.find(ntc => ntc.title === neew.title);

    if (!exist) {
      this.news.unshift(neew);
      this.storage.set('favorites', this.news);
    }
  }

  async getData(): Promise<void> {
    const fav = await this.storage.get('favorites');

    if (fav) {
      this.news = fav;
    }
  }

  deleteNew(neew: IArticle): void {
    this.news = this.news.filter(ntc => ntc.title != neew.title);
    this.storage.set('favorites', this.news);
  }

}
