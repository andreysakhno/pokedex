import { Injectable } from '@angular/core';
import { Pokemon } from '../models/pokemon';

@Injectable()
export class LocalStorageService {

  pokemonInStorage: Pokemon[] = [];

  constructor() {
    if (window.localStorage.getItem('pokemon')) {
        const obj = JSON.parse(window.localStorage.getItem('pokemon'));
        obj.forEach((item) => this.pokemonInStorage.push(item));
    }
  }

  getAll() {
    return this.pokemonInStorage;
  }

  update() {
    const json = JSON.stringify(this.pokemonInStorage);
    window.localStorage.setItem('pokemon', json);
  }

  add(pokemon: Pokemon) {
    pokemon.isSelected = false;
    this.pokemonInStorage.push(pokemon);
    this.update();
  }

  remove(pokemon: Pokemon) {
    let n = pokemon.id-1;
    this.pokemonInStorage = this.pokemonInStorage.filter(function(item, index) {
      return (item.id !== pokemon.id ) ? item : null;
    });
    this.update();
  }

  hasId(id: number): boolean {
    if (window.localStorage.getItem('pokemon')) {
      const json = JSON.parse(window.localStorage.getItem('pokemon'));
      let flag = false;
      json.forEach((item) => {
        if (item.id === id) flag = true;
      });
      return flag;
    }
    return false;
  }
}
