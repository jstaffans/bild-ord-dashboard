import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { TopGroupsComponent } from './top-groups/top-groups.component';
import { GroupsService } from './groups.service';

@NgModule({
  declarations: [
    AppComponent,
    TopGroupsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [{provide:'groups', useClass:GroupsService}],
  bootstrap: [AppComponent]
})
export class AppModule { }
