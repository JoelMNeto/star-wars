let content = [];

let contentFilmes = [];

let contentResidentes = [];

let listaPlanetas = document.querySelector("#listaPlanetas");

let pesquisa = document.querySelector("#pesquisa");

let listaContainer = document.querySelector("#listaContainer");

let carregando = document.querySelector("#carregando");

let carregandoContent = document.querySelector("#carregandoContent");

let conteudo = document.querySelector("#conteudoPlanetas");

let planetas = document.querySelectorAll("ul > li");

let planetaNome = document.querySelector("#planetaNome");

let planetaClima = document.querySelector("#planetaClima");

let planetaAguaSup = document.querySelector("#planetaAguaSup");

let planetaPopulacao = document.querySelector("#planetaPopulacao");

let btnInfoFilmes = document.querySelector("#btnInfoFilmes");

let btnInfoResidentes = document.querySelector("#btnInfoResidentes");

conteudo.style.display = "none";

getPlanetas(listaPlanetas, listaContainer, carregando);

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

async function getPlanetas(lista, listaContainer, carregando) {
  const urls = [
    "https://swapi.dev/api/planets/?page=1",
    "https://swapi.dev/api/planets/?page=2",
    "https://swapi.dev/api/planets/?page=3",
    "https://swapi.dev/api/planets/?page=4",
    "https://swapi.dev/api/planets/?page=5",
    "https://swapi.dev/api/planets/?page=6",
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

async function montaLista(seletorLista, planetas) {
  if (!planetas) {
    return;
  }

  planetas.forEach((planeta) => {
    montaItemLista(seletorLista, planeta.name);
  });
}

function montaItemLista(lista, textContent) {
  let div = montaBordaItem(textContent);
  let button = montaBotaoItem(textContent);

  let li = document.createElement("li");

  li.classList.add("item-lista");

  li.setAttribute("id", `${textContent.replaceAll(" ", "")}lista`);

  li.append(button, div);

  lista.appendChild(li);

  adicionaBordaHover(`#${button.id}`, `#${div.id}`, "item-lista-border-active");
}

function montaBotaoItem(textContent) {
  let button = document.createElement("button");

  button.classList.add("item-lista-btn");

  button.textContent = textContent;

  button.setAttribute("id", `${textContent.replaceAll(" ", "")}`);

  button.onclick = async function () {
    let planeta = content.find((p) => p.name === button.textContent);

    await montaInformacoes(planeta);
  };

  return button;
}

function montaBordaItem(textContent) {
  let div = document.createElement("div");

  div.classList.add("item-lista-border");

  div.setAttribute("id", `${textContent.replaceAll(" ", "")}Border`);

  return div;
}

async function montaInformacoes(planeta) {
  await getContent(planeta.residents, false);

  await getContent(planeta.films, true);

  let botoes = document.querySelectorAll('li > button');

  let bordas = document.querySelectorAll('li > div');

  bordas.forEach((b) => b.classList.remove('item-lista-border-selecionada'));

  botoes.forEach((btn) => {
    btn.style.color = '';
  });

  let button = document.querySelector(
    `#${planeta.name.replaceAll(" ", "")}`
  );

  let border = document.querySelector(
    `#${planeta.name.replaceAll(" ", "")}Border`
  );

  border.classList.add('item-lista-border-selecionada');

  button.style.color = '#fdf149';

  planetaNome.textContent = planeta.name.toUpperCase();

  planetaAguaSup.textContent = `${planeta.surface_water}`;

  planetaClima.textContent = `${planeta.climate}`;

  planetaPopulacao.textContent = `${planeta.population}`;
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
  } else if (titulo === "Residentes") {
    informacoes = contentResidentes;
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

function montaModalMaisInfo() {
  let planetaInfo = content.find(
    (p) => p.name.toUpperCase() === planetaNome.textContent
  );

  let modalTitulo = document.querySelector("#tituloModal");

  let modal = document.querySelector("#bodyModal");

  modal.childNodes.forEach((el) => (el.style.display = "none"));

  modalTitulo.textContent = 'Mais informações';

  let li1 = document.createElement("li");

  li1.textContent = `Gravity: ${planetaInfo.gravity}`;

  let li2 = document.createElement("li");

  li2.textContent = `Rotation period: ${planetaInfo.rotation_period} hs`;

  let li3 = document.createElement("li");

  li3.textContent = `Orbital period: ${planetaInfo.orbital_period} days`;

  let li4 = document.createElement("li");

  li4.textContent = `Diameter: ${planetaInfo.diameter} km`;

  modal.append(li1, li2, li3, li4);
}

async function getContent(urls, filmes) {
  if (urls.length <= 0) {
    contentFilmes = [];
    contentResidentes = [];

    return;
  }

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
        contentResidentes = [...retorno];
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

adicionaBordaHover(
  "#btnInfoResidentes",
  "#bordaInfoResidentes",
  "btn-info-active"
);

adicionaBordaHover("#btnInfoFilmes", "#bordaInfoFilmes", "btn-info-active");

adicionaBordaHover("#btnInfo", "#bordaInfo", "btn-info-active");
