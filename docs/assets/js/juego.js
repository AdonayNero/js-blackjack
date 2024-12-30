/*
 2C = TWO OF CLUBS
 2D = TWO OF DIAMINDS
 2H = TWO OF HEARTS
 2S = TWO OF SPADES
*/


// iniciamor a mejorar el codigo

// creamo funcion anonima, tambien llamada patron modulo, ya que se ejecuta una sola vez 
const miModulo = (() => {
  "use strict";


  let deck = [];
  const tipos = ["C", "D", "H", "S"],
    especiales = ["A", "J", "Q", "K"];

  let puntosJugadores = [];

  //Referencia del HTML
  const btnPedir = document.querySelector("#btnPedir"),
    btnDetener = document.querySelector("#btnDetener"),
    btnNuevo = document.querySelector('#btnNuevo'),
    puntosHTML = document.querySelectorAll("small");

  //referencia a las cartas del jugador
  const divCartasJugadores = document.querySelectorAll(".divCartas");


  // iniciamos el juego
  const inicializarJuego = (numeroJugadores = 2) => {
    deck = crearDeck();
    puntosJugadores = [];
    for (let i = 0; i < numeroJugadores; i++) {
      puntosJugadores.push(0);
    }

    puntosHTML.forEach(elem => elem.innerText = 0);
    divCartasJugadores.forEach(elem => elem.innerHTML = '');
    btnDetener.disabled = false;
    btnPedir.disabled = false;

  }


  // varear cartas del deck
  const crearDeck = () => {
    deck = [];
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

    //console.log(deck);
    // retornamos un arreglo de cartas aleatorias
    return _.shuffle(deck);
  };



  // funcion que permite tomar una carta
  const pedirCarta = () => {
    if (deck.length === 0) {
      throw "eror";
    }
    return deck.pop();
  };



  //pedir cartas
  const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
    return isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1;
  };


  // acumular puntos
  // 0 = primer jugador y el ultimo sera la computadora
  const acumularPuntos = (carta, turno) => {
    puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
    puntosHTML[turno].innerText = puntosJugadores[turno];
    return puntosJugadores[turno];
  }




  // crear cartas

  const crearCarta = (carta, turno) => {
    const imgCartas = document.createElement("img");
    imgCartas.src = `assets/cartas/${carta}.png`;
    imgCartas.classList.add("carta");
    divCartasJugadores[turno].append(imgCartas);
  }



  // nueva funcion para determinar el ganador
  const determinarGanador = () => {

    const [puntosMinimos, puntosComputadora] = puntosJugadores;

    setTimeout(() => {
      if (puntosComputadora === puntosMinimos) {
        alert('Nadie gaga :()');
      } else if (puntosMinimos > 21) {
        alert('Computadora gana')
      } else if (puntosComputadora > 21) {
        alert('Jugador Gana');
      } else {
        alert('Computadora gana');
      }

    }, 190);
  };




  //turno de la computadora
  const turnoComputadora = (puntosMinimos) => {
    let puntosComputadora = 0;
    do {
      const carta = pedirCarta();
      puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
      crearCarta(carta, puntosJugadores.length - 1);

      if (puntosMinimos > 21) {
        break;
      }
    } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

    determinarGanador();
  }

  // Eventos
  btnPedir.addEventListener("click", function () {

    const carta = pedirCarta();
    const puntosJugador = acumularPuntos(carta, 0);

    // creado la imagenes de la carta
    crearCarta(carta, 0);

    if (puntosJugador > 21) {
      console.warn("Lo siento mucho, perdiste");
      btnPedir.disabled = true;
      btnDetener.disabled = true;
      turnoComputadora(puntosJugador);
    } else if (puntosJugador === 21) {
      btnPedir.disabled = true;
      btnDetener.disabled = true;
      console.warn("21, genial!" + puntosJugador);
      turnoComputadora(puntosJugador);
    }
  });

  //turnoComputadora(12);
  btnDetener.addEventListener("click", () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugadores[0]);
  });


  //nuevo juego
  btnNuevo.addEventListener("click", () => {
    inicializarJuego();
  });

  return {

    nuevoJuego: inicializarJuego

  };

})();


