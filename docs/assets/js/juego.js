/*
 2C = TWO OF CLUBS
 2D = TWO OF DIAMINDS
 2H = TWO OF HEARTS
 2S = TWO OF SPADES
*/

let deck = [];
const tipos = ["C", "D", "H", "S"];
const especiales = ["A", "J", "Q", "K"];

// varear cartas
const crearDeck = () => {
  for (let i = 2; i <= 10; i++) {
    for (let tipo of tipos) {
      deck.push(i + tipo);
    }
  }

  for (let tipo of tipos) {
    for (let esp of especiales) {
      deck.push(esp + tipo);
    }
  }
  deck = _.shuffle(deck);
  console.log(deck);
};

crearDeck();

// funcion que permite tomar una carta
const pedirCarta = () => {
  if (deck.length === 0) {
    throw "eror";
  }
  const carta = deck.pop();
  // console.log(deck);
  console.log(carta);
  return carta;
};

//pedirCarta();

//pedir cartas
const valorCarta = (carta) => {
  const valor = carta.substring(0, carta.length - 1);

  return isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1;

  //  let puntos = 0;

  //   if (isNaN(valor)) {
  //     console.log("No es un número");
  //   } else {
  //     console.log("Es un número");
  //     puntos = valor * 1;
  //   }s
};

let valor = valorCarta(pedirCarta());

console.log({ valor });
