import { Component, OnInit, ViewChild} from '@angular/core';
import { NgProgressService } from 'ngx-progressbar';

import { DetailComponent } from '../detail/detail.component';

import { LocalStorageService } from '../shared/services/local-storage.service'

import { Pokemon } from '../shared/models/pokemon';

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.css'],
  providers: [LocalStorageService],
})
export class LikeComponent implements OnInit {
  @ViewChild( DetailComponent ) detailComponent: DetailComponent;
  allStoredPokemons: Pokemon[] = [];
  isLoading: boolean = true;
  disabled: boolean = true;

  constructor(
    private lsPokemonsService: LocalStorageService,
    public progressService: NgProgressService
  ) {}

  ngOnInit() {
    this.load();
  }

  load(){
    this.progressService.start();
    this.allStoredPokemons = this.lsPokemonsService.getAll();
    this.isLoading = false;
    this.progressService.done();
  }

  selectPokemon(pokemon: Pokemon) {
    this.allStoredPokemons.forEach((item) => {
      item.isSelected = false;
    });
    pokemon.isSelected = true;
    this.disabled = false;
  }

  removeFromLikeList(pokemon: Pokemon) {
      pokemon.isLiked = false;
      this.lsPokemonsService.remove(pokemon);
      if(pokemon.isSelected) this.detailComponent.hidePokeDetails();
      this.load();
  }

  showDetails() {
    let pokemon: Pokemon;
    this.allStoredPokemons.forEach((item, i) => {
      if(item.isSelected) pokemon = this.allStoredPokemons[i];
    });
    this.detailComponent.showPokeDetails(pokemon);
  }
}
