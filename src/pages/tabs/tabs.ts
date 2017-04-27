import { Component } from '@angular/core';

import { SuggestionPage } from '../suggestions/suggestions';
import { ProgressPage } from '../progress/progress';
import { HomePage } from '../home/home';
// import { IdeasPage } from '../ideas/ideas';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = SuggestionPage;
  tab3Root = ProgressPage;
  // tab4Root = IdeasPage;

  constructor() {

  }
}
