import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TdsListComponent } from './tds-list/tds-list.component';
import { TdThumbnailComponent } from './td-thumbnail/td-thumbnail.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TdService } from './services/td.service';

import { TdDetailsComponent } from './td-details/td-details.component';
import { ScorecardComponent } from './scorecard/scorecard.component';
import { ScoreKeyComponent } from './score-key/score-key.component';
import { PartyPageComponent } from './party-page/party-page.component';
import { SearchfilterPipe } from './searchfilter.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComparisonpageComponent } from './comparisonpage/comparisonpage.component';



@NgModule({
  declarations: [
    AppComponent,
    TdsListComponent,
    TdThumbnailComponent,
    NavbarComponent,
    TdDetailsComponent,
    ScorecardComponent,
    ScoreKeyComponent,
    PartyPageComponent,
    SearchfilterPipe,
    ComparisonpageComponent
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [TdService],
  bootstrap: [AppComponent]
})
export class AppModule { }
