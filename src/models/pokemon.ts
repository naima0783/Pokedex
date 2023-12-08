export default class Pokemon {
  id: number;
  hp: number;
  cp: number;
  name: string;
  picture: string;
  types: Array<number>;

  constructor(
    id: number,
    hp: number = 100,
    cp: number = 10,
    name: string = "...",
    picture: string = "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/XXX.png",
    types: Array<number> = [0]
  ) {
    this.id = id;
    this.hp = hp;
    this.cp = cp;
    this.name = name;
    this.picture = picture;
    this.types = types;
  }
}
