let listaPersonagens = document.querySelector("#listaPersonagens");

montaLista(listaPersonagens);

adicionaBordaHover("#linkPersonagens", "#linkBordaPersonagens");
adicionaBordaHover("#linkPlanetas", "#linkBordaPlanetas");
adicionaBordaHover("#linkVeiculos", "#linkBordaVeiculos");

function adicionaBordaHover(link, borda) {
  let seletorLink = document.querySelector(link);
  let seletorBorda = document.querySelector(borda);

  seletorLink.onmouseover = () => {
    seletorBorda.classList.add("menu-container-link-border-active");
  };

  seletorLink.onmouseout = () => {
    seletorBorda.classList.remove("menu-container-link-border-active");
  };
}

async function getPersonagens(pagina = 1) {
  const URL = `https://swapi.dev/api/people/?page=${pagina}`;

  let retorno = [];

  await fetch(URL).then(response => response.json()).then((json) => {
    retorno = json.results;
  });

  return retorno;
}

function montaItemLista() {
  let li = document.createElement('li');

  li.classList.add('item-lista');

  return li;
}

async function montaLista(seletorLista, pagina = 1) {
  let personagens = await getPersonagens(pagina);
  let personagensNext = await getPersonagens(++pagina);

  personagens = personagens.concat(...personagensNext);

  if (!personagens) {
    return;
  }

  personagens.forEach((personagem, i) => {
    seletorLista.appendChild(montaItemLista());

    seletorLista.childNodes[i].innerHTML = personagem.name;
  });
}
