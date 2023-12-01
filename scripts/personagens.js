let content = [];

let contentFilmes = [];

let contentPlaneta = [];

let contentEspecies = [];

let contentVeiculos = [];

let contentEspaconaves = [];

let listaPersonagens = document.querySelector("#listaPersonagens");

let pesquisa = document.querySelector("#pesquisa");

let listaContainer = document.querySelector("#listaContainer");

let carregando = document.querySelector("#carregando");

let carregandoContent = document.querySelector("#carregandoContent");

let conteudo = document.querySelector("#conteudoPersonagens");

let personagens = document.querySelectorAll("ul > li");

let personagemNome = document.querySelector("#personagemNome");

let imagem = document.querySelector("#personagemImagem");

let filmes = document.querySelector("#btnInfoFilmes");

let veiculos = document.querySelector("#btnInfoVeiculos");

let espaconaves = document.querySelector("#btnInfoEspaconaves");

let planeta = document.querySelector("#btnInfoPlaneta");

let especie = document.querySelector("#btnInfoEspecie");

let maisInfo = document.querySelector("#btnInfoMaisInfo");

conteudo.style.display = "none";

getPersonagens(listaPersonagens, listaContainer, carregando);

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

async function getPersonagens(lista, listaContainer, carregando) {
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

async function montaLista(seletorLista, personagens) {
  if (!personagens) {
    return;
  }

  personagens.forEach((personagem) => {
    montaItemLista(seletorLista, personagem.name);
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
    let personagem = content.find((p) => p.name === button.textContent);

    await montaInformacoes(personagem);
  };

  return button;
}

function montaBordaItem(textContent) {
  let div = document.createElement("div");

  div.classList.add("item-lista-border");

  div.setAttribute("id", `${textContent.replaceAll(" ", "")}Border`);

  return div;
}

async function montaInformacoes(personagem) {
  await getContent(personagem.films, 'films');

  await getContent(personagem.starships, 'starships');

  await getContent(personagem.vehicles, 'vehicles');

  await getContent(personagem.species, 'species');

  await getContent([personagem.homeworld], 'planets');

  let botoes = document.querySelectorAll("li > button");

  let bordas = document.querySelectorAll("li > div");

  bordas.forEach((b) => b.classList.remove("item-lista-border-selecionada"));

  botoes.forEach((btn) => {
    btn.style.color = "";
  });

  let button = document.querySelector(
    `#${personagem.name.replaceAll(" ", "")}`
  );

  let border = document.querySelector(
    `#${personagem.name.replaceAll(" ", "")}Border`
  );

  border.classList.add("item-lista-border-selecionada");

  button.style.color = "#fdf149";

  personagemNome.textContent = personagem.name.toUpperCase();

  imagem.setAttribute(
    "src",
    `../assets/personagens/${button.id.toLowerCase()}.png`
  );

  imagem.setAttribute("alt", `${personagem.name} imagem`);
}

function montaModalRequest(titulo) {
  let modalTitulo = document.querySelector("#tituloModal");

  let modal = document.querySelector("#bodyModal");

  let spanNoContent = document.createElement("span");

  modal.childNodes.forEach((el) => (el.style.display = "none"));

  film = titulo === "Filmes";

  let informacoes = getContentModal(titulo);

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

function montaModalMaisInfo(titulo) {
  let pMaisInfo = content.find(
    (p) => p.name.toUpperCase() === personagemNome.textContent
  );

  let modalTitulo = document.querySelector("#tituloModal");

  let modal = document.querySelector("#bodyModal");

  modal.childNodes.forEach((el) => (el.style.display = "none"));

  modalTitulo.textContent = titulo;

  let li1 = document.createElement("li");

  li1.textContent = `Mass: ${pMaisInfo.mass} Kg`;

  let li2 = document.createElement("li");

  li2.textContent = `Height: ${pMaisInfo.height}`;
  
  let li3 = document.createElement("li");
  
  li3.textContent = `Gender: ${pMaisInfo.gender}`;
  
  let li4 = document.createElement("li");

  li4.textContent = `Hair color: ${pMaisInfo.hair_color}`;

  let li5 = document.createElement("li");

  li5.textContent = `Skin color: ${pMaisInfo.skin_color}`;

  let li6 = document.createElement("li");

  li6.textContent = `Eye color: ${pMaisInfo.eye_color}`;

  let li7 = document.createElement("li");

  li7.textContent = `Birth year: ${pMaisInfo.birth_year}`;

  modal.append(li1, li2, li3, li4, li5, li6, li7);

}

async function getContent(urls, titulo) {
  if (urls.length <= 0) {
    contentFilmes = [];
    contentEspecies = [];
    contentEspaconaves = [];
    contentVeiculos = [];
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

      if (titulo === "films") {
        contentFilmes = [...retorno];
      } else if (titulo === "species") {
        contentEspecies = [...retorno];
      } else if (titulo === "starships") {
        contentEspaconaves = [...retorno];
      } else if (titulo === "vehicles") {
        contentVeiculos = [...retorno];
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
  if (titulo === "Filmes") {
    return contentFilmes;
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

  if (titulo === "Planeta") {
    return contentPlaneta;
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

adicionaBordaHover(
  "#btnInfoEspaconaves",
  "#bordaInfoEspaconaves",
  "btn-info-active"
);

adicionaBordaHover("#btnInfoFilmes", "#bordaInfoFilmes", "btn-info-active");

adicionaBordaHover("#btnInfoVeiculos", "#bordaInfoVeiculos", "btn-info-active");

adicionaBordaHover("#btnInfoPlaneta", "#bordaInfoPlaneta", "btn-info-active");

adicionaBordaHover("#btnInfoEspecie", "#bordaInfoEspecie", "btn-info-active");

adicionaBordaHover("#btnInfoMaisInfo", "#bordaInfoMaisInfo", "btn-info-active");
