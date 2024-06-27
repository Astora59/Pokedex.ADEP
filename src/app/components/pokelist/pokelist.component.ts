import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-pokelist',
  templateUrl: './pokelist.component.html',
  styleUrls: ['./pokelist.component.css']
})
export class PokelistComponent implements OnInit {
  pokemons: any[] = [];
  filteredPokemonList: any[] = [];
  page = 1;
  totalPokemons: number | undefined;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getPokemons();
  }

  getPokemons() {
    this.dataService.getPokemons(12, (this.page - 1) * 12).subscribe((response: any) => {
      this.totalPokemons = response.count;
      this.pokemons = response.results;

      // Chargez les détails des Pokémon en arrière-plan
      this.pokemons.forEach(pokemon => {
        this.dataService.getMoreData(pokemon.name).subscribe((details: any) => {
          pokemon.details = details;
        });
      });

      // Initialisez la liste filtrée avec la liste complète au début
      this.filteredPokemonList = this.pokemons;
    });
  }

  updateFilteredPokemonList(filteredPokemonList: any[]): void {
    this.filteredPokemonList = filteredPokemonList;
  }

  getSpriteUrl(url: string): string {
    const id = url.split('/').filter(Boolean).pop();
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  }
}
