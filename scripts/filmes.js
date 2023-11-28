let content = [];

let listaFilmes = document.querySelector("#listaFilmes");

let pesquisa = document.querySelector("#pesquisa");

let listaContainer = document.querySelector("#listaContainer");

let carregando = document.querySelector("#carregando");

getFilmes(listaFilmes, listaContainer, carregando);

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

adicionaBordaHover(
  "#linkPersonagens",
  "#linkBordaPersonagens",
  "menu-container-link-border-active"
);

adicionaBordaHover(
  "#linkPlanetas",
  "#linkBordaPlanetas",
  "menu-container-link-border-active"
);

adicionaBordaHover(
  "#linkVeiculos",
  "#linkBordaVeiculos",
  "menu-container-link-border-active"
);

adicionaBordaHover(
  "#linkFilmes",
  "#linkBordaFilmes",
  "menu-container-link-border-active"
);

adicionaBordaHover(
  "#linkEspecies",
  "#linkBordaEspecies",
  "menu-container-link-border-active"
);

adicionaBordaHover(
  "#linkEspaconaves",
  "#linkBordaEspaconaves",
  "menu-container-link-border-active"
);

function adicionaBordaHover(link, borda, classe) {
  let seletorLink = document.querySelector(link);
  let seletorBorda = document.querySelector(borda);

  seletorLink.onmouseover = () => {
    seletorBorda.classList.add(classe);
  };

  seletorLink.onmouseout = () => {
    seletorBorda.classList.remove(classe);
  };
}

async function getFilmes(lista, listaContainer, carregando) {
  const url = "https://swapi.dev/api/films";

  listaContainer.style.display = "none";

  fetch(url)
    .then((response) => response.json())
    .then((json) => {
      content = content.concat(json.results);
      montaLista(lista, json.results);
    })
    .finally(() => {
      carregando.style.display = "none";
      listaContainer.style.display = "block";
    });
}

async function montaLista(seletorLista, filmes) {
  if (!filmes) {
    return;
  }

  filmes.forEach((filme) => {
    montaItemLista(seletorLista, filme.title);
  });
}

function montaItemLista(lista, textContent) {
  let div = montaBordaItem(textContent);
  let a = montaLinkItem(textContent);

  let li = document.createElement("li");

  li.classList.add("item-lista");

  li.setAttribute("id", `${textContent.replaceAll(' ', '')}`);

  li.append(a, div);

  lista.appendChild(li);

  adicionaBordaHover(`#${a.id}`, `#${div.id}`, "item-lista-border-active");

  a.onclick = () => {};
}

function montaLinkItem(textContent) {
  let a = document.createElement("a");

  a.classList.add("item-lista-link");

  a.textContent = textContent;

  a.setAttribute("id", `${textContent.replaceAll(' ', '')}Link`);

  return a;
}

function montaBordaItem(textContent) {
  let div = document.createElement("div");

  div.classList.add("item-lista-border");

  div.setAttribute("id", `${textContent.replaceAll(' ', '')}Border`);

  return div;
}
