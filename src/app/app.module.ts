import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { GaComponent } from './ga.component';

import { ChartsModule } from './charts/charts.module';

import { clientKey, profileId } from './config.secret';

@NgModule({
  declarations: [
    AppComponent,
    GaComponent
  ],

  imports: [
    BrowserModule,
    FormsModule,
    ChartsModule
  ],

  providers: [{provide: 'client key', useValue: clientKey},
              {provide: 'profile id', useValue: profileId}],

  bootstrap: [AppComponent, GaComponent]
})

export class AppModule { }
