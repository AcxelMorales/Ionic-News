import { Component } from '@angular/core';

import { DataService } from '../../providers/data.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
})
export class Tab3Page {

  constructor(public _dataService: DataService) {}

}
