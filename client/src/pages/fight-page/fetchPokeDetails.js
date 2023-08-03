
export default async function(arr){
    const fetchPoke = async (poke) => {
      const req = await fetch(`https://pokeapi.co/api/v2/pokemon/${poke}`);
      const res = await req.json();
      return res;
    };

    const pokemonPromises = arr.map(async (poke) => {
      const pokemonFetched = await fetchPoke(poke);
      return {
        name: poke,
        picture: pokemonFetched.sprites.front_default,
        stats: {
          hp: pokemonFetched.stats[0].base_stat,
          attack: pokemonFetched.stats[1].base_stat,
          defense: pokemonFetched.stats[2].base_stat,
        },
        type: pokemonFetched.types[0].type.name,
      };
    });

    const pokemons = await Promise.all(pokemonPromises);
    return pokemons;

}