import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent {
  @Input() pokemonList: any[] = [];
  @Output() filteredListChanged = new EventEmitter<any[]>();

  filteredPokemonList: any[] = [];
  searchTerm: string = '';

  constructor() { }

  onSearch(): void {
    this.filterPokemons();
  }

  onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.filterPokemons();
    }
  }

  filterPokemons(): void {
    if (this.searchTerm.trim() === '') {
      this.filteredPokemonList = this.pokemonList;
    } else {
      this.filteredPokemonList = this.pokemonList.filter(pokemon =>
        pokemon.name?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        pokemon.id?.toString() === this.searchTerm.trim()
      );
    }
    this.filteredListChanged.emit(this.filteredPokemonList);
  }
}