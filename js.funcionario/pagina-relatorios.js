// js.funcionario/pagina-relatorios.js
(function () {
  const $ = (s) => document.querySelector(s);

  const ui = {
    ricos: $("#listaRicos"),
    media: $("#mediaSalarial"),
    cargos: $("#listaCargos"),
    caps: $("#listaCaps"),
    bRicos: $("#btnRicos"),
    bMedia: $("#btnMedia"),
    bCargos: $("#btnCargos"),
    bCaps: $("#btnCaps"),
  };

  function atualizar(acao) {
    if (!window.App || !App.repo) return;

    const dados = App.repo.listar();

    const ricos = dados.filter(d => d.salario > 5000);
    const media = dados.length ? dados.reduce((s,d)=>s+d.salario,0)/dados.length : 0;
    const cargosUnicos = [...new Set(dados.map(d=>d.cargo))];
    const caps = dados.map(d=>d.nome.toUpperCase());

    if (!acao || acao==="ricos") {
      ui.ricos.innerHTML = ricos.length
        ? ricos.map(r=>`<li>${r.nome} — ${r.cargo} — R$ ${r.salario.toFixed(2)}</li>`).join("")
        : "<em>Ninguém com salário acima de R$ 5000.</em>";
    }
    if (!acao || acao==="media") {
      ui.media.textContent = dados.length ? `R$ ${media.toFixed(2)}` : "-";
    }
    if (!acao || acao==="cargos") {
      ui.cargos.innerHTML = cargosUnicos.length
        ? cargosUnicos.map(c=>`<li>${c}</li>`).join("")
        : "<em>Nenhum cargo cadastrado.</em>";
    }
    if (!acao || acao==="caps") {
      ui.caps.innerHTML = caps.length
        ? caps.map(n=>`<li>${n}</li>`).join("")
        : "<em>Lista vazia.</em>";
    }
  }

  ui.bRicos.addEventListener("click", ()=>atualizar("ricos"));
  ui.bMedia.addEventListener("click", ()=>atualizar("media"));
  ui.bCargos.addEventListener("click", ()=>atualizar("cargos"));
  ui.bCaps.addEventListener("click", ()=>atualizar("caps"));

  atualizar(); // mostra algo ao abrir a página
})();
