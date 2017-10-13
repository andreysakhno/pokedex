import { Component } from '@angular/core';
import { ApiService } from '../shared/services/api.service';
import { Pokemon } from '../shared/models/pokemon';
import { PokemonDetail } from '../shared/models/detail';
import { NgProgressService } from 'ngx-progressbar';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  providers: [ApiService],
})
export class DetailComponent {
  pokemonDetail: PokemonDetail = new PokemonDetail();
  showDetails: boolean = false;

  constructor( private apiPokemonsService: ApiService,
               public progressService: NgProgressService) { }

  showPokeDetails(pokemon: Pokemon) {
    this.showDetails = false;
    this.progressService.start();
    this.apiPokemonsService.getPokemonsDetails(pokemon.url)
      .then((pokemons) => {
        this.pokemonDetail = pokemons;
        this.progressService.done();
        this.showDetails = true;
      })
      .catch(err => err.console.log(err));
  }

  hidePokeDetails(){
    this.showDetails = false;
  }

}
