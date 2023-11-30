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

let conteudo = document.querySelector("#conteudoPersonagens");

let personagens = document.querySelectorAll("ul > li");

let personagemNome = document.querySelector("#personagemNome");

let imagem = document.querySelector("#personagemImagem");

let altura = document.querySelector("#personagemAltura");

let peso = document.querySelector("#personagemPeso");

let filmes = document.querySelector("#personagemFilmes");

let veiculos = document.querySelector("#personagemVeiculos");

let espaconaves = document.querySelector("#personagemEspaconaves");

let planeta = document.querySelector("#personagemPlaneta");

let especie = document.querySelector("#personagemEspecie");

let maisInfo = document.querySelector("#personagemMaisInfo");

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

async function montaInformacoes(personagem) {
  await getContent(personagem.films);

  await getContent(personagem.starships);

  await getContent(personagem.vehicles);

  await getContent(personagem.species);

  await getContent([personagem.homeworld]);

  let button = document.querySelector(
    `#${personagem.name.replaceAll(" ", "")}`
  );

  personagemNome.textContent = personagem.name.toUpperCase();

  imagem.setAttribute(
    "src",
    `../assets/personagens/${button.id.toLowerCase()}.png`
  );

  imagem.setAttribute("alt", `${personagem.name} imagem`);

  peso.textContent = `${personagem.mass} Kg`;

  altura.textContent = `${personagem.height / 100} m`;
}

function montaModalRequest(titulo) {
  let modalTitulo = document.querySelector("#tituloModal");

  let modal = document.querySelector("#bodyModal");

  let spanNoContent = document.createElement("span");

  modal.childNodes.forEach((el) => el.style.display = 'none');

  film = titulo === "Filmes";

  informacoes = getContentModal(titulo);

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

function montaBordaItem(textContent) {
  let div = document.createElement("div");

  div.classList.add("item-lista-border");

  div.setAttribute("id", `${textContent.replaceAll(" ", "")}Border`);

  return div;
}

async function getContent(urls) {
  if (urls.length <= 0) {
    return;
  }

  let titulo = urls[0].slice((urls[0].indexOf("i/") + 2), (urls[0].lastIndexOf("s/") + 1));

  conteudo.style.display = "none";

  let retorno = [];

  Promise.all(urls.map((url) => fetch(url)))
    .then((response) => Promise.all(response.map((r) => r.json())))
    .then((results) => {
      retorno = [...results];

      if (titulo === "films") {
        contentFilmes = [...retorno];
      }
    
      if (titulo === "species") {
        contentEspecies = [...retorno];
      }
    
      if (titulo === "starships") {
        contentEspaconaves = [...retorno];
      }
    
      if (titulo === "vehicles") {
        contentVeiculos = [...retorno];
      }
    
      if (titulo === "planets") {
        contentPlaneta = [...retorno];
      }
    })
    .finally(() => {
      conteudo.style.display = "flex";
    });
}

function getGenero(genero) {
  if (genero === "male") {
    return "Homem";
  }

  if (genero === "female") {
    return "Mulher";
  }

  return "Desconhecido";
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
