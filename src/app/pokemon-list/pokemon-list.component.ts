import { Component, OnInit, ViewChild } from '@angular/core';
import { NgProgressService } from 'ngx-progressbar';

import { DetailComponent } from '../detail/detail.component';
import { ApiService } from '../shared/services/api.service';
import { LocalStorageService } from "../shared/services/local-storage.service";

import { Pokemon } from '../shared/models/pokemon';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
  providers: [ ApiService, LocalStorageService ]
})
export class PokemonListComponent implements OnInit {
  @ViewChild( DetailComponent ) detailComponent: DetailComponent;
  allPokemons: Pokemon[] = [];
  isLoading: boolean = true;
  disabled: boolean = true;

  constructor (
    private apiPokemonsService: ApiService,
    private lsPokemonsService: LocalStorageService,
    public progressService: NgProgressService
  ) {}

  ngOnInit() {
    this.progressService.start();
    this.apiPokemonsService.getPokemons()
      .then((pokemons) => {
          this.allPokemons =  pokemons;
          this.isLoading = false;
          this.progressService.done();
      })
      .catch(err => err.console.log(err));
  }

  selectPokemon(pokemon: Pokemon) {
    this.allPokemons.forEach((item) => {
      item.isSelected = false;
    });
    pokemon.isSelected = true;
    this.disabled = false;
  }

  showDetails() {
    let pokemon: Pokemon;
    this.allPokemons.forEach((item, i) => {
      if(item.isSelected) pokemon = this.allPokemons[i];
    });
    this.detailComponent.showPokeDetails(pokemon);
  }

  addRemoveLikeList(pokemon: Pokemon) {
    if (!pokemon.isLiked) {
      pokemon.isLiked = true;
      this.lsPokemonsService.add(pokemon);
    } else {
      pokemon.isLiked = false;
      this.lsPokemonsService.remove(pokemon);
    }
  }
}
