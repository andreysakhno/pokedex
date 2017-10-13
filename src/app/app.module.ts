import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { NgProgressModule } from 'ngx-progressbar';
import { SharerdModule } from './shared/shared.module';

import { AppComponent } from './app.component';

import { HeaderComponent } from './shared/components/header/header.component';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { LikeComponent } from './like/like.component';
import { DetailComponent } from './detail/detail.component';

const appRoutes: Routes =[
  { path: '', component: PokemonListComponent},
  { path: 'like', component: LikeComponent},
  { path: '**', redirectTo: '/' }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PokemonListComponent,
    LikeComponent,
    DetailComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    NgProgressModule,
    RouterModule.forRoot(appRoutes),
    SharerdModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
