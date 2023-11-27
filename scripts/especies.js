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
