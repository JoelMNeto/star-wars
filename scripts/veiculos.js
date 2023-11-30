let content = [];

let listaVeiculos = document.querySelector("#listaVeiculos");

let pesquisa = document.querySelector("#pesquisa");

let listaContainer = document.querySelector("#listaContainer");

let carregando = document.querySelector("#carregando");

getVeiculos(listaVeiculos, listaContainer, carregando);

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

async function getVeiculos(lista, listaContainer, carregando) {
  const urls = [
    "https://swapi.dev/api/vehicles/?page=1",
    "https://swapi.dev/api/vehicles/?page=2",
    "https://swapi.dev/api/vehicles/?page=3",
    "https://swapi.dev/api/vehicles/?page=4",
  ];

  listaContainer.style.display = "none";

  Promise.all(urls.map((url) => fetch(url)))
    .then((response) => Promise.all(response.map((r) => r.json())))
    .then((results) => {
      results.forEach((json) => {
        content = content.concat(json.results);
        montaLista(lista, json.results);
      });
    })
    .finally(() => {
      carregando.style.display = "none";
      listaContainer.style.display = "block";
    });
}

async function montaLista(seletorLista, veiculos) {
  if (!veiculos) {
    return;
  }

  veiculos.forEach((veiculo) => {
    montaItemLista(seletorLista, veiculo.name);
  });
}

function montaItemLista(lista, textContent) {
  let div = montaBordaItem(textContent);
  let button = montaLinkItem(textContent);

  let li = document.createElement("li");

  li.classList.add("item-lista");

  li.setAttribute("id", `${textContent.replaceAll('').replace("/", "")}`);

  li.append(button, div);

  lista.appendChild(li);

  adicionaBordaHover(`#${button.id}`, `#${div.id}`, "item-lista-border-active");
}

function montaLinkItem(textContent) {
  let button = document.createElement("button");

  button.classList.add("item-lista-btn");

  button.textContent = textContent;

  button.setAttribute("id", `${textContent.replaceAll('').replace("/", "")}Btn`);

  return button;
}

function montaBordaItem(textContent) {
  let div = document.createElement("div");

  div.classList.add("item-lista-border");

  div.setAttribute("id", `${textContent.replaceAll('').replace("/", "")}Border`);

  return div;
}
