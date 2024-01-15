
//logo para refrescar l pagina
const refresh = document.querySelector(".intro");
refresh.addEventListener('click', _ => {
  location.reload();
})

let pokeSearched="";

//Guardamos la URL en una variable
const URL = 'https://pokeapi.co/api/v2/pokemon/';



//Seleccionamos donde vamos a renderizar los pokemos

const pokeShow = document.querySelector(".containerPokemon")

// Menu - Categoias de tipos de Pokemons
const selecTypesPok = document.querySelectorAll(".btn")
//console.log(selecTypesPok)
selecTypesPok.forEach(button => button.addEventListener("click", async (event) => {
let btnId = event.currentTarget.id;
    pokeShow.innerHTML=""
    for ( let i = 1; i <= 151; i++) {
      const response = await fetch(URL + i)
      const data = await response.json();
      console.log(data.types)
      const tipoPokes = data.types.map(type => type.type.name)
      if (tipoPokes.some(tipo => tipo.includes(btnId))){
        renderPokemons(data);
      }
    
      }
    }))



//Buscador

const searchInput = document.querySelector(".searcher");

const handleInputSearch = (event) => {
  event.preventDefault();
  pokeSearched = searchInput.value.toLowerCase();
  getPokemon(pokeSearched);
};

const btnSearch = document.querySelector(".pokeBall");
btnSearch.addEventListener('click', handleInputSearch);
searchInput.addEventListener("keyup", function(e) {
  
    if (e.code === 'Enter') {
        btnSearch.click(handleInputSearch);
    }
})

const getPokemon = async () => {
  try {
    const response = await fetch(URL + pokeSearched)
    const pokemon = await response.json();
    renderPokemon(pokemon)
  } catch (error) {
    console.log("error")
    pokeShow.innerHTML="";
    const header$$ = document.querySelector("header");
    const errorMsg = document.createElement("div");
    header$$.appendChild(errorMsg);
    errorMsg.innerHTML=`

    <div class="errorMsg">
       <h1>¡Error!</h1></br>
       <h2>El Pokemon buscado no se encuentra en nuestra pokedex</h2>
       <img src="./img/error404.gif">
      </div>
  `;
  }
}

// Fin BUscador

//Tomar datos de la Api y paginación
let stop=30;
const getPokemons = async () => {
    
      for ( let i = 1; i <= stop; i++) {
        const response = await fetch(URL + i)
        const data = await response.json();
        //console.log(data);
        renderPokemons(data);
        }

        const page1 = document.querySelector("#page1");
        page1.addEventListener("click", async ()=>{
          pokeShow.innerHTML=" ";
          for ( i = 1; i <= stop; i++) {
            const response = await fetch(URL + i)
            const data = await response.json();
            renderPokemons(data);
          }
          })

        const page2 = document.querySelector("#page2");
        page2.addEventListener("click", async ()=>{
          pokeShow.innerHTML=" ";
          for ( let j = 33; j <= 65; j++) {
          const response = await fetch(URL + j)
          const data = await response.json();
          renderPokemons(data);
          }
        })
       
        const page3 = document.querySelector("#page3");
        page3.addEventListener("click", async ()=>{
          pokeShow.innerHTML=" ";
          for ( let k = 66; k <= 98; k++) {
          const response = await fetch(URL + k)
          const data = await response.json();
          renderPokemons(data);
          }
        })

        const page4 = document.querySelector("#page4");
        page4.addEventListener("click", async ()=>{
          pokeShow.innerHTML=" ";
          for ( let l = 99; l <= 131; l++) {
          const response = await fetch(URL + l)
          const data = await response.json();
          renderPokemons(data);
          }
        })

        const page5 = document.querySelector("#page5");
        page5.addEventListener("click", async ()=>{
          pokeShow.innerHTML=" ";
          for ( let m = 132; m <= 151; m++) {
          const response = await fetch(URL + m)
          const data = await response.json();
          renderPokemons(data);
          }
        })
    
};


// Renderizar Pokemons

const renderPokemons = (poke) => {

    let tipos = poke.types.map((type) => `
    <p class="${type.type.name}">
    ${type.type.name} </p>`);
    tipos = tipos.join('');
    //console.log(tipos)

    const pokeCard = document.createElement("div")
    pokeShow.appendChild(pokeCard)
    pokeCard.classList ="pokeCard shadow-inset-center";
    //pokeCard.style.cssText = `background-image: url("${poke.sprites.other.dream_world.front_default}"); opacity: 0.2 `;
    let html=""
    html+= `
    
      <img src="${poke.sprites.other.home.front_default}" class="imgPoke">
      <h3>${poke.name}</h3>
      <h4 class="idPoke">#00${poke.id}</h4>
      <div class="tiposPoke">
        <strong>${tipos}</strong>
      </div>
    </div>
    `
    pokeCard.innerHTML+=html;

    const allCards = document.querySelectorAll('.pokeCard');
    for (const card of allCards) {
    card.addEventListener('click', handleClickFavorite);
  }
    
    }
   
    //Renderizar 1 Pokemon del buscador
  const renderPokemon = (pokemon) => {
    pokeShow.innerHTML="";
    renderPokemons(pokemon)
  }


// Pokemosn Fav
const pokeFavs = [];
const handleClickFavorite = (event) => {
 
  const clickedId = event.currentTarget.id;
  // buscar el elemento clicado dentro del array de favoritos
  const findElement = pokeFavs.find(
    (drink) => drink.idDrink === clickedId
  );
  //obtengo toda la informacion de la bebida clicada
  const drinkClicked = drinksList.find((drink) => drink.idDrink === clickedId);

  console.log(findElement);
  //falsy -->  undefined, null, 0,  ""
  //findElement === undefined
  if (!findElement) {
    drinkFavorite.push(drinkClicked);
  } else {
    // findIndex > busca la posición de un elemento dentro del array
    const indexElement = drinkFavorite.findIndex(
      (drink) => drink.idDrink === clickedId
    );
    drinkFavorite.splice(indexElement, 1);
  }
  renderDrinksFavorite(drinkFavorite);
  console.log(drinkFavorite);
};


//
getPokemons();

