// js.funcionario/pagina-relatorios.js
(function () {
  const $ = (s) => document.querySelector(s);

  const ui = {
    ricos: $("#listaRicos"),
    media: $("#mediaSalarial"),
    cargos: $("#listaCargos"),
    caps: $("#listaCaps"),
  };

  function atualizar() {
    if (!window.App || !App.repo) return;

    const dados = App.repo.listar();

    const ricos = dados.filter(d => d.salario > 5000);
    const media = dados.length ? dados.reduce((s,d)=>s+d.salario,0)/dados.length : 0;
    const cargosUnicos = [...new Set(dados.map(d=>d.cargo))];
    const caps = dados.map(d=>d.nome.toUpperCase());

    ui.ricos.innerHTML = ricos.length
      ? ricos.map(r=>`<li>${r.nome} — ${r.cargo} — R$ ${r.salario.toFixed(2)}</li>`).join("")
      : "<em>Ninguém com salário acima de R$ 5000.</em>";

    ui.media.textContent = dados.length ? `R$ ${media.toFixed(2)}` : "-";

    ui.cargos.innerHTML = cargosUnicos.length
      ? cargosUnicos.map(c=>`<li>${c}</li>`).join("")
      : "<em>Nenhum cargo cadastrado.</em>";

    ui.caps.innerHTML = caps.length
      ? caps.map(n=>`<li>${n}</li>`).join("")
      : "<em>Lista vazia.</em>";
  }

  atualizar(); // gera tudo automaticamente
})();
