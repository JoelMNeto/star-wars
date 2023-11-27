let content = [];

let listaPersonagens = document.querySelector("#listaPersonagens");

let pesquisa = document.querySelector("#pesquisa");

let listaContainer = document.querySelector("#listaContainer");

getPersonagens(listaPersonagens);

pesquisa.addEventListener("input", (event) => {
  let itensLista = document.querySelectorAll("ul > li");
  let busca = event.target.value.toLowerCase();

  itensLista.forEach((i) => {
    texto = i.textContent.toLowerCase();

    if (texto.includes(busca)) {
      i.style.display = "block";
      return;
    }

    i.style.display = "none";
  });
});

adicionaBordaHover("#linkPersonagens", "#linkBordaPersonagens");
adicionaBordaHover("#linkPlanetas", "#linkBordaPlanetas");
adicionaBordaHover("#linkVeiculos", "#linkBordaVeiculos");
adicionaBordaHover("#linkFilmes", "#linkBordaFilmes");
adicionaBordaHover("#linkEspecies", "#linkBordaEspecies");
adicionaBordaHover("#linkEspaconaves", "#linkBordaEspaconaves");

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
  const urls = [
    "https://swapi.dev/api/people/?page=1",
    "https://swapi.dev/api/people/?page=2",
    "https://swapi.dev/api/people/?page=3",
    "https://swapi.dev/api/people/?page=4",
    "https://swapi.dev/api/people/?page=5",
    "https://swapi.dev/api/people/?page=6",
    "https://swapi.dev/api/people/?page=7",
    "https://swapi.dev/api/people/?page=8",
    "https://swapi.dev/api/people/?page=9",
  ];

  Promise.all(urls.map((url) => fetch(url)))
    .then((response) => Promise.all(response.map((r) => r.json())))
    .then((results) => {
      results.forEach((json) => {
        montaLista(seletorLista, json.results);
        content = content.concat(json.results);
      })
    });
}

function montaItemLista(textContent) {
  let li = document.createElement("li");

  li.classList.add("item-lista");

  li.textContent = textContent;

  li.setAttribute("id", `personagem${content.length}`);

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
