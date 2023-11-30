let content = [];

let contentFilmes = [];

let contentPilotos = [];

let listaVeiculos = document.querySelector("#listaVeiculos");

let pesquisa = document.querySelector("#pesquisa");

let listaContainer = document.querySelector("#listaContainer");

let carregando = document.querySelector("#carregando");

let carregandoContent = document.querySelector("#carregandoContent");

let conteudo = document.querySelector("#conteudoVeiculos");

let veiculos = document.querySelectorAll("ul > li");

let veiculoNome = document.querySelector("#veiculoNome");

let modeloVeiculo = document.querySelector("#modeloVeiculo");

let fabricanteVeiculo = document.querySelector("#fabricanteVeiculo");

let custoVeiculo = document.querySelector("#custoVeiculo");

let tamanhoVeiculo = document.querySelector("#tamanhoVeiculo");

let velocidadeVeiculo = document.querySelector("#velocidadeVeiculo");

let numPessVeiculo = document.querySelector("#numPessVeiculo");

let capacidadeVeiculo = document.querySelector("#capacidadeVeiculo");

let cargaVeiculo = document.querySelector("#cargaVeiculo");

let capacidadeConsumoVeiculo = document.querySelector(
  "#capacidadeConsumoVeiculo"
);

let classeVeiculo = document.querySelector("#classeVeiculo");

conteudo.style.display = "none";

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
      conteudo.style.display = "flex";
      montaInformacoes(content[0]);
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
  let button = montaBotaoItem(textContent);

  let li = document.createElement("li");

  li.classList.add("item-lista");

  li.setAttribute("id", `${textContent.replaceAll(" ", "").replaceAll("/", "")}Lista`);

  li.append(button, div);

  lista.appendChild(li);

  adicionaBordaHover(`#${button.id}`, `#${div.id}`, "item-lista-border-active");
}

function montaBotaoItem(textContent) {
  let button = document.createElement("button");

  button.classList.add("item-lista-btn");

  button.textContent = textContent;

  button.setAttribute(
    "id",
    `${textContent.replaceAll(" ", "").replaceAll("/", "")}`
  );

  button.onclick = async function () {
    let veiculo = content.find((p) => p.name === button.textContent);

    await montaInformacoes(veiculo);
  };

  return button;
}

function montaBordaItem(textContent) {
  let div = document.createElement("div");

  div.classList.add("item-lista-border");

  div.setAttribute(
    "id",
    `${textContent.replaceAll(" ", "").replaceAll("/", "")}Border`
  );

  return div;
}

async function montaInformacoes(veiculo) {
  await getContent(veiculo.pilots);

  await getContent(veiculo.films);

  let botoes = document.querySelectorAll("li > button");

  let bordas = document.querySelectorAll("li > div");

  bordas.forEach((b) => b.classList.remove("item-lista-border-selecionada"));

  botoes.forEach((btn) => {
    btn.style.color = "";
  });

  let button = document.querySelector(`#${veiculo.name.replaceAll(" ", "").replaceAll("/", "")}`);

  let border = document.querySelector(
    `#${veiculo.name.replaceAll(" ", "")}Border`
  );

  border.classList.add("item-lista-border-selecionada");

  button.style.color = "#fdf149";

  veiculoNome.textContent = veiculo.name.toUpperCase();

  modeloVeiculo.textContent = veiculo.model;

  fabricanteVeiculo.textContent = veiculo.manufacturer;

  custoVeiculo.textContent = veiculo.cost_in_credits;

  tamanhoVeiculo.textContent = `${veiculo.length} m`;

  velocidadeVeiculo.textContent = veiculo.max_atmosphering_speed;

  numPessVeiculo.textContent = veiculo.crew;

  capacidadeVeiculo.textContent = veiculo.passengers;

  cargaVeiculo.textContent = `${veiculo.cargo_capacity} Kg`;

  capacidadeConsumoVeiculo.textContent = veiculo.consumables;

  classeVeiculo.textContent = veiculo.vehicle_class;
}

function montaModalRequest(titulo) {
  let modalTitulo = document.querySelector("#tituloModal");

  let modal = document.querySelector("#bodyModal");

  let spanNoContent = document.createElement("span");

  modal.childNodes.forEach((el) => (el.style.display = "none"));

  film = titulo === "Filmes";

  let informacoes = [];

  if (titulo === "Filmes") {
    informacoes = contentFilmes;
  } else if (titulo === "Pilotos") {
    informacoes = contentPilotos;
  }

  modalTitulo.textContent = titulo;

  if (informacoes.length <= 0) {
    spanNoContent.textContent = "Não há nada aqui";

    modal.appendChild(spanNoContent);

    return;
  }

  informacoes.forEach((info) => {
    let li = document.createElement("li");

    li.textContent = film ? info.title : info.name;

    modal.appendChild(li);
  });
}

async function getContent(urls) {
  if (urls.length <= 0) {
    contentFilmes = [];
    contentPilotos = [];
    
    return;
  }

  let filmes = !!urls.find((u) => u.includes('films'));

  conteudo.style.display = "none";

  carregandoContent.style.display = "flex";

  let retorno = [];

  Promise.all(urls.map((url) => fetch(url)))
    .then((response) => Promise.all(response.map((r) => r.json())))
    .then((results) => {
      retorno = [...results];

      if (filmes) {
        contentFilmes = [...retorno];
      } else {
        contentPilotos = [...retorno];
      }
    })
    .finally(() => {
      conteudo.style.display = "flex";
      carregandoContent.style.display = "none";
    });
}

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

adicionaBordaHover("#btnInfoPilotos", "#bordaInfoPilotos", "btn-info-active");

adicionaBordaHover("#btnInfoFilmes", "#bordaInfoFilmes", "btn-info-active");
