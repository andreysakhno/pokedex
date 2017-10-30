import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { LocalStorageService } from './local-storage.service';

import { Pokemon } from '../models/pokemon';
import { PokemonDetail } from '../models/detail';

@Injectable()
export class ApiService {

  constructor (
    private http: Http,
    private lsPokemonsService: LocalStorageService,
  ) {}

  getPokemons(): Promise<Pokemon[]> {
    const url: string = "https://pokeapi.co/api/v1/pokemon?limit=12";

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.get(url)
      .toPromise()
      .then(response => {
         return response.json().objects.map((item) => {
              const id = item.national_id,
                    name = item.name,
                    url = `https://pokeapi.co/api/v2/pokemon/${id}`,
                    types = item.types.map(t => t.name);

              let tmpObj: Pokemon = {
                id,
                name,
                url,
                imageURL: this.getImageUrl(id),
                types,
                isLiked: false,
                isSelected: false,
              };

              if(this.lsPokemonsService.hasId(id) === true) tmpObj.isLiked = true;

              return tmpObj;
        });
      })
      .catch(this.handleError);
  }

  getPokemonsDetails(url: string): Promise<PokemonDetail> {
    return this.http.get(url)
      .toPromise()
      .then(response => response.json())
      .then(items => {
         let id = items.id,
             name = items.name,
             imageURL = this.getImageUrl(id),
             types = items.types.map(t => t.type.name),
             weight = items.weight,
             speed, attack, defense, hp, spAttack, spDefense,
             totalMoves = Object.keys(items.moves).length;
         items.stats.map(s => {
           switch(s.stat.name) {
             case 'speed':
               speed = s.base_stat;
               break;
             case 'special-defense':
               spDefense = s.base_stat;
               break;
             case 'special-attack':
               spAttack = s.base_stat;
               break;
             case 'defense':
               defense = s.base_stat;
               break;
             case 'attack':
               attack = s.base_stat;
               break;
             case 'hp':
               hp = s.base_stat;
               break;
           }
         });

        return {id, name,
                url: url,
                imageURL,
                types,
                weight, speed, attack, defense, hp, spAttack, spDefense,
                totalMoves
        };
      })
      .catch(this.handleError)
  }

  getTypes(url): Promise<Pokemon[]> {
    return this.http.get(url)
      .toPromise()
      .then(response => response.json())
      .then(items => items.types.map(t => t.type.name))
      .catch(this.handleError)
  }

  private getId(url: string): number {
      const reg = url.match('([0-9]+)\/$');
      return parseInt(reg[1]);
  }

  private getImageUrl(id: number): string {
      return "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + id + ".png";
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
