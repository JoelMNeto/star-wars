let content = [],
  pagina = 1;

let listaPersonagens = document.querySelector("#listaPersonagens");

let pesquisa = document.querySelector("#pesquisa");

let listaContainer = document.querySelector("#listaContainer");

getPersonagens(listaPersonagens);

listaContainer.addEventListener("scroll", () => {
  ++pagina;

  if (pagina > 9) {
    return;
  }

  getPersonagens(listaPersonagens, pagina);
});

pesquisa.addEventListener('input', (event) => {
  let itensLista = document.querySelectorAll('ul > li');
  let busca = event.target.value.toLowerCase();

  itensLista.forEach((i) => {
    texto = i.textContent.toLowerCase();

    if(texto.includes(busca)) {
      i.style.display = 'block';
      return;
    }

    i.style.display = 'none';
  });
});

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

async function getPersonagens(seletorLista, pagina = 1) {
  const URL = `https://swapi.dev/api/people/?page=${pagina}`;

  await fetch(URL)
    .then((response) => response.json())
    .then((json) => {
      montaLista(seletorLista, json.results);
      content = content.concat(json.results);
    });
}

function montaItemLista(textContent) {
  let li = document.createElement("li");

  li.classList.add('item-lista');
  
  li.textContent = textContent;

  li.setAttribute('id', `personagem${content.length}`);

  return li;
}

async function montaLista(seletorLista, personagens) {
  if (!personagens) {
    return;
  }

  personagens.forEach((personagem) => {
    seletorLista.appendChild(montaItemLista(personagem.name));
  });
}
