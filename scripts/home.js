let textoHome = document.querySelector("#textoHome");

let curiosidades = [
  `Antes de ser Skywalker, 
    Luke era Starkiller. 
    Adventures of the Starkiller, 
    Episode I: The Star Wars era 
    o título da segunda versão do 
    roteiro de Uma Nova Esperança.
    Luke foi rebatizado e chegou à
    sua personalidade definitiva 
    durante a pré-produção do filme.`,

  `George Lucas cogitou várias ideias
    para o filme que, eventualmente, 
    foram descartadas. Algumas das mais 
    singulares envolvem um elenco principal 
    formado por anões, Luke Skywalker como 
    um general de 60 anos e um Han Solo 
    alienígena.`,

  `O icônico Darth Vader foi o primeiro 
    personagem do universo Star Wars criado
    por George Lucas, mesmo com seu tempo de 
    tela limitado no longa original.`,

  `Apesar da presença marcante em Uma Nova
    Esperança, Darth Vader aparece, ao todo, 
    por 12 minutos no longa que deu origem à 
    franquia.`,

  `A armadura de Darth Vader foi desenhada 
    por Ralph McQuarrie, cuja principal preocupação
    era a capacidade do personagem de se locomover 
    e respirar enquanto se deslocava da sua nave para 
    a da Princesa Leia - não é explicado o porquê da 
    armadura até O Império Contra-Ataca.`,

  `O som da respiração do Darth Vader foi criado 
    por Ben Burtt, que colocou um pequeno microfone 
    do bocal de um respirador de mergulho e gravou 
    o som da própria respiração usando o aparelho.`,

  `O nome R2-D2 significa "Reel 2, Dialog 2". 
    A sigla surgiu durante a pós-produção de Loucura 
    de Verão (1973), quando o editor de som pediu a 
    Lucas o R2-D2, ou o Rolo#2 (Reel 2) do Segundo Diálogo
    (Dialog 2). Lucas gostou do som da abreviação e anotou 
    para usá-la no futuro.`,

  `Nas primeiras versões do roteiro, R2-D2 
    podia falar normalmente. Apesar de suas falas terem
    sido removidas, as reações de C-3PO ao 
    diálogo foram mantidas no roteiro.`,

  `Originalmente, Darth Vader seria um caçador de 
    recompensas intergaláctico, mas depois que o 
    personagem se tornou um Jedi caído, Lucas decidiu 
    reciclar o conceito do "bounty hunter" para Boba Fett.`,

  `Jeremy Bulloch, que interpreta Boba Fett, também 
    dá vida ao Tenente Sheckil, que captura Leia durante
    sua tentativa de fuga em Bespin. Bulloch cobriu a ausência 
    do ator escalado originalmente para o papel. O ator também
    interpretou um piloto em A Vingança dos Sith.`,
];

textoHome.innerHTML = `Bem-vindo, pequeno padawan! Bem-vindo ao melhor site
                        de Star Wars que você já viu! 
                        Aqui você pode relembrar os pricipais 
                        personagens, planetas e veículos 
                        dos seus filmes favoritos. Navegue e divirta-se!`;

let index = 0;

function mudaTexto() {
  textoHome.innerHTML = curiosidades[index];

  index = index === curiosidades.length - 1 ? 0 : index + 1;
}

setInterval(() => mudaTexto(), 14000);

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
    seletorBorda.classList.add("menu-container-link-border-home-active");
  };

  seletorLink.onmouseout = () => {
    seletorBorda.classList.remove("menu-container-link-border-home-active");
  };
}
