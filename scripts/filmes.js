let content = [];

let contentPersonagens = [];

let contentVeiculos = [];

let contentEspaconaves = [];

let contentEspecies = [];

let contentPlanetas = [];

let listaFilmes = document.querySelector("#listaFilmes");

let pesquisa = document.querySelector("#pesquisa");

let listaContainer = document.querySelector("#listaContainer");

let carregando = document.querySelector("#carregando");

let carregandoContent = document.querySelector("#carregandoContent");

let conteudo = document.querySelector("#conteudoFilmes");

let filmes = document.querySelectorAll("ul > li");

let filmeTitulo = document.querySelector("#filmeTitulo");

let filmeEpisodio = document.querySelector("#filmeEpisodio");

let filmeDiretor = document.querySelector("#filmeDiretor");

let filmeProducao = document.querySelector("#filmeProducao");

let filmeData = document.querySelector("#filmeData");

let abertura = '';

conteudo.style.display = "none";

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
      conteudo.style.display = "flex";
      montaInformacoes(content[0]);
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
  let button = montaBotaoItem(textContent);

  let li = document.createElement("li");

  li.classList.add("item-lista");

  li.setAttribute("id", `${textContent.replaceAll(' ', '')}Lista`);

  li.append(button, div);

  lista.appendChild(li);

  adicionaBordaHover(`#${button.id}`, `#${div.id}`, "item-lista-border-active");
}

function montaBotaoItem(textContent) {
  let button = document.createElement("button");

  button.classList.add("item-lista-btn");

  button.textContent = textContent;

  button.setAttribute("id", `${textContent.replaceAll(' ', '')}`);

  button.onclick = async function () {
    let filme = content.find((p) => p.title === button.textContent);

    await montaInformacoes(filme);
  };

  return button;
}

function montaBordaItem(textContent) {
  let div = document.createElement("div");

  div.classList.add("item-lista-border");

  div.setAttribute("id", `${textContent.replaceAll(' ', '')}Border`);

  return div;
}

async function montaInformacoes(filme) {
  await getContent(filme.characters, 'characters');

  await getContent(filme.planets, 'planets');

  await getContent(filme.starships, 'starships');

  await getContent(filme.vehicles, 'vehicles');

  await getContent(filme.species, 'species');

  abertura = filme.opening_crawl;

  filmeProducao = filme.producer;

  let botoes = document.querySelectorAll("li > button");

  let bordas = document.querySelectorAll("li > div");

  bordas.forEach((b) => b.classList.remove("item-lista-border-selecionada"));

  botoes.forEach((btn) => {
    btn.style.color = "";
  });

  let button = document.querySelector(`#${filme.title.replaceAll(" ", "").replaceAll("/", "")}`);

  let border = document.querySelector(
    `#${filme.title.replaceAll(" ", "")}Border`
  );

  border.classList.add("item-lista-border-selecionada");

  button.style.color = "#fdf149";

  filmeTitulo.textContent = filme.title;

  filmeData.textContent = filme.release_date;

  filmeDiretor.textContent = filme.director;

  filmeEpisodio.textContent = filme.episode_id;

  filmeProducao.textContent = filme.producer;
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

    li.textContent = info.name;

    modal.appendChild(li);
  });
}

function producaoModal() {
  let modalTitulo = document.querySelector("#tituloModal");

  let modal = document.querySelector("#bodyModal");

  let spanNoContent = document.createElement("span");

  modal.childNodes.forEach((el) => (el.style.display = "none"));

  let informacoes = '';

  informacoes = filmeProducao.split(',');

  modalTitulo.textContent = 'Produção';

  if (informacoes.length <= 0) {
    spanNoContent.textContent = "Não há nada aqui";

    modal.appendChild(spanNoContent);

    return;
  }

  informacoes.forEach((info) => {
    let li = document.createElement("li");

    li.textContent = info;

    modal.appendChild(li);
  });
}

function aberturaFilmeModal() {
  let modalTitulo = document.querySelector("#tituloModal");

  let modal = document.querySelector("#bodyModal");

  let spanNoContent = document.createElement("span");

  modal.childNodes.forEach((el) => (el.style.display = "none"));

  let informacoes = '';

  informacoes = abertura;

  modalTitulo.textContent = 'Abertura';

  if (informacoes === '') {
    spanNoContent.textContent = "Não há nada aqui";

    modal.appendChild(spanNoContent);

    return;
  }

  let p = document.createElement("p");

  p.textContent = informacoes;

  modal.appendChild(p);
}

async function getContent(urls, titulo) {
  if (urls.length <= 0) {
    contentPersonagens = [];
    contentEspecies = [];
    contentEspaconaves = [];
    contentVeiculos = [];
    contentPlanetas = [];
    
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
      } else if (titulo === "species") {
        contentEspecies = [...retorno];
      } else if (titulo === "starships") {
        contentEspaconaves = [...retorno];
      } else if (titulo === "vehicles") {
        contentVeiculos = [...retorno];
      } else if (titulo === "planets") {
        contentPlanetas = [...retorno];
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

  if (titulo === "Espécies") {
    return contentEspecies;
  }

  if (titulo === "Espaçonaves") {
    return contentEspaconaves;
  }

  if (titulo === "Veículos") {
    return contentVeiculos;
  }

  if (titulo === "Planetas") {
    return contentPlanetas;
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

adicionaBordaHover("#btnInfoAbertura", "#bordaInfoAbertura", "btn-info-active");

adicionaBordaHover("#btnInfoPlanetas", "#bordaInfoPlanetas", "btn-info-active");

adicionaBordaHover("#btnInfoEspecies", "#bordaInfoEspecies", "btn-info-active");

adicionaBordaHover("#btnInfoVeiculos", "#bordaInfoVeiculos", "btn-info-active");

adicionaBordaHover("#btnInfoNaves", "#bordaInfoNaves", "btn-info-active");

adicionaBordaHover("#btnInfoProducao", "#bordaInfoProducao", "btn-info-active");