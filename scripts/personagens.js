adicionaBordaHover('#linkPersonagens', '#linkBordaPersonagens');
adicionaBordaHover('#linkPlanetas', '#linkBordaPlanetas');
adicionaBordaHover('#linkVeiculos', '#linkBordaVeiculos');

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
