let content = [];

let contentPersonagens = [];

let contentFilmes = [];

let contentPlaneta = [];

let listaEpecies = document.querySelector("#listaEpecies");

let pesquisa = document.querySelector("#pesquisa");

let listaContainer = document.querySelector("#listaContainer");

let carregando = document.querySelector("#carregando");

let carregandoContent = document.querySelector("#carregandoContent");

let conteudo = document.querySelector("#conteudoEspecies");

let especieNome = document.querySelector("#especieNome");

let coresOlhos = '';

let coresCabelo = '';

let coresPele = '';

conteudo.style.display = "none";

getEspecies(listaEpecies, listaContainer, carregando);

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

async function getEspecies(lista, listaContainer, carregando) {
  const urls = [
    "https://swapi.dev/api/species/?page=1",
    "https://swapi.dev/api/species/?page=2",
    "https://swapi.dev/api/species/?page=3",
    "https://swapi.dev/api/species/?page=4",
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

async function montaLista(seletorLista, especies) {
  if (!especies) {
    return;
  }

  especies.forEach((especie) => {
    montaItemLista(seletorLista, especie.name);
  });
}

function montaItemLista(lista, textContent) {
  let div = montaBordaItem(textContent);
  let button = montaBotaoItem(textContent);

  let li = document.createElement("li");

  li.classList.add("item-lista");

  li.setAttribute("id", `${textContent.replaceAll(' ', '').replaceAll('\'', '')}Lista`);

  li.append(button, div);

  lista.appendChild(li);

  adicionaBordaHover(`#${button.id}`, `#${div.id}`, "item-lista-border-active");
}

function montaBotaoItem(textContent) {
  let button = document.createElement("button");

  button.classList.add("item-lista-btn");

  button.textContent = textContent;

  button.setAttribute("id", `${textContent.replaceAll(' ', '').replaceAll('\'', '')}`);

  button.onclick = async function () {
    let especie = content.find((p) => p.name === button.textContent);

    await montaInformacoes(especie);
  };

  return button;
}

function montaBordaItem(textContent) {
  let div = document.createElement("div");

  div.classList.add("item-lista-border");

  div.setAttribute("id", `${textContent.replaceAll(' ', '').replaceAll('\'', '')}Border`);

  return div;
}

async function montaInformacoes(especie) {
  await getContent(especie.people, 'characters');

  await getContent([especie.homeworld], 'planets');

  await getContent(especie.films, 'films');

  coresPele = especie.skin_colors;

  coresCabelo = especie.hair_colors;

  coresOlhos = especie.eye_colors;

  let botoes = document.querySelectorAll("li > button");

  let bordas = document.querySelectorAll("li > div");

  bordas.forEach((b) => b.classList.remove("item-lista-border-selecionada"));

  botoes.forEach((btn) => {
    btn.style.color = "";
  });

  let button = document.querySelector(`#${especie.name.replaceAll(" ", "").replaceAll("/", "")}`);

  let border = document.querySelector(
    `#${especie.name.replaceAll(" ", "")}Border`
  );

  border.classList.add("item-lista-border-selecionada");

  button.style.color = "#fdf149";

  especieNome.textContent = especie.name.toUpperCase();
}

function montaModalRequest(titulo) {
  let modalTitulo = document.querySelector("#tituloModal");

  let modal = document.querySelector("#bodyModal");

  let spanNoContent = document.createElement("span");

  modal.childNodes.forEach((el) => (el.style.display = "none"));

  informacoes = getContentModal(titulo);

  modalTitulo.textContent = titulo;

  if (informacoes.length <= 0) {
    spanNoContent.textContent = "Não há nada aqui";

    modal.appendChild(spanNoContent);

    return;
  }

  informacoes.forEach((info) => {
    let li = document.createElement("li");

    li.textContent = titulo === 'Filmes' ? info.title : info.name;

    modal.appendChild(li);
  });
}

function getInfoModal() {
  let especieInfo = content.find(
    (p) => p.name.toUpperCase() === especieNome.textContent
  );

  let modalTitulo = document.querySelector("#tituloModal");

  let modal = document.querySelector("#bodyModal");

  modal.childNodes.forEach((el) => (el.style.display = "none"));

  modalTitulo.textContent = 'Informações';

  let li1 = document.createElement("li");

  li1.textContent = `Classification: ${especieInfo.classification}`;

  let li2 = document.createElement("li");

  li2.textContent = `Designation: ${especieInfo.designation}`;

  let li3 = document.createElement("li");

  li3.textContent = `Language: ${especieInfo.language}`;

  let li4 = document.createElement("li");

  li4.textContent = `Avarage height ${especieInfo.average_height}`;

  let li5 = document.createElement("li");

  li5.textContent = `Avarage lifespan: ${especieInfo.average_lifespan}`;


  modal.append(li1, li2, li3, li4, li5);
}

function getInfoListModal(titulo) {
  let info = getContentModalInfo(titulo);

  let modalTitulo = document.querySelector("#tituloModal");

  let modal = document.querySelector("#bodyModal");

  modal.childNodes.forEach((el) => (el.style.display = "none"));

  info = info.split(',');

  modalTitulo.textContent = titulo;

  if (info.length <= 0) {
    spanNoContent.textContent = "Não há nada aqui";

    modal.appendChild(spanNoContent);

    return;
  }

  info.forEach((i) => {
    let li = document.createElement("li");

    li.textContent = i;

    modal.appendChild(li);
  });
}

async function getContent(urls, titulo) {
  if (urls.length <= 0) {
    contentPersonagens = [];
    contentFilmes = [];
    contentPlaneta = [];
    
    return;
  }

  conteudo.style.display = "none";

  carregandoContent.style.display = "flex";

  let retorno = [];

  Promise.all(urls.map((url) => fetch(url)))
    .then((response) => Promise.all(response.map((r) => r.json())))
    .then((results) => {
      retorno = [...results];

      if (titulo === "characters") {
        contentPersonagens = [...retorno];
      } else if (titulo === 'films') {
        contentFilmes = [...retorno];
      } else if (titulo === "planets") {
        contentPlaneta = [...retorno];
      }
    })
    .finally(() => {
      conteudo.style.display = "flex";
      carregandoContent.style.display = "none";
    });
}

function getContentModal(titulo) {
  if (titulo === "Personagens") {
    return contentPersonagens;
  }

  if (titulo === "Planeta") {
    return contentPlaneta;
  }

  if (titulo === "Filmes") {
    return contentFilmes;
  }
}

function getContentModalInfo(titulo) {
  if (titulo === "Cores de pele") {
    return coresPele;
  }

  if (titulo === "Cores de olhos") {
    return coresOlhos;
  }

  if (titulo === "Cores de cabelo") {
    return coresCabelo;
  }
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

adicionaBordaHover("#btnInfoPersonagens", "#bordaInfoPersonagens", "btn-info-active");

adicionaBordaHover("#btnInfo", "#bordaInfo", "btn-info-active");

adicionaBordaHover("#btnInfoOlhos", "#bordaInfoOlhos", "btn-info-active");

adicionaBordaHover("#btnInfoPele", "#bordaInfoPele", "btn-info-active");

adicionaBordaHover("#btnInfoCabelo", "#bordaInfoCabelo", "btn-info-active");

adicionaBordaHover("#btnInfoPlaneta", "#bordaInfoPlaneta", "btn-info-active");

adicionaBordaHover("#btnInfoFilmes", "#bordaInfoFilmes", "btn-info-active");
