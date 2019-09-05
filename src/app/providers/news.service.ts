import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { IRespTopHeadlines } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

const apiKey: string = environment.apikey;
const apiUrl: string = environment.apiUrl;

const headers = new HttpHeaders({
  'X-Api-key': apiKey
});

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private headlinesPage  : number = 0;
  private categoryPage   : number = 0;
  private currentCategory: string = '';

  constructor(private http: HttpClient) { }

  private runQuery(query: string): Observable<IRespTopHeadlines> {
    query = `${apiUrl}${query}`;
    return this.http.get<IRespTopHeadlines>(query, { headers });
  }

  getTopHeadlines(): Observable<IRespTopHeadlines> {
    this.headlinesPage++;
    return this.runQuery(`/top-headlines?country=us&page=${this.headlinesPage}`);
  }

  getTopHeadlinesForCategory(category: string): Observable<IRespTopHeadlines> {
    if (this.currentCategory === category) {
      this.categoryPage++;
    } else {
      this.currentCategory = category;
      this.categoryPage    = 1;
    }

    return this.runQuery(`/top-headlines?country=us&category=${category}&page=${this.categoryPage}`);
  }

}
