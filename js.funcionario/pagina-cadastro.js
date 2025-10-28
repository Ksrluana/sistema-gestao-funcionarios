(function () {
  const $ = (s) => document.querySelector(s);
  const form = {
    nome: $("#nome"), idade: $("#idade"), cargo: $("#cargo"), salario: $("#salario"),
    btn: $("#btnSalvar"), tbody: $("#tbodyColaboradores")
  };
  let edit = null;

  function limpar(){
    form.nome.value = form.idade.value = form.cargo.value = form.salario.value = "";
    edit = null; form.btn.textContent = "Cadastrar"; form.nome.focus();
  }
  function validar(){
    if(!form.nome.value.trim()) return alert("Informe o nome.");
    if(!form.idade.value) return alert("Informe a idade.");
    if(!form.cargo.value.trim()) return alert("Informe o cargo.");
    if(!form.salario.value) return alert("Informe o salário.");
    return true;
  }
  function salvar(e){
    e.preventDefault(); if(!validar()) return;
    const novo = new Colaborador(form.nome.value, form.idade.value, form.cargo.value, form.salario.value);
    if(edit===null) App.repo.adicionar(novo); else App.repo.atualizar(edit, novo);
    render(); limpar();
  }
  function render(){
    const lista = App.repo.listar();
    form.tbody.innerHTML = "";
    lista.forEach((c,i)=>{
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${i+1}</td><td>${c.nome}</td><td>${c.idade}</td><td>${c.cargo}</td>
        <td>${App.money(c.salario)}</td>
        <td>
          <button class="btn btn-sm btn-outline-warning me-2" data-a="ed" data-i="${i}">Editar</button>
          <button class="btn btn-sm btn-outline-danger" data-a="rm" data-i="${i}">Excluir</button>
        </td>`;
      form.tbody.appendChild(tr);
    });
  }
  form.tbody.addEventListener("click",(ev)=>{
    const b = ev.target.closest("button[data-a]"); if(!b) return;
    const i = Number(b.dataset.i), ac = b.dataset.a;
    if(ac==="ed"){
      const c = App.repo.listar()[i]; if(!c) return;
      form.nome.value=c.nome; form.idade.value=c.idade; form.cargo.value=c.cargo; form.salario.value=c.salario;
      edit=i; form.btn.textContent="Salvar alterações"; form.nome.focus();
    }
    if(ac==="rm"){
      if(confirm("Remover este colaborador?")){ App.repo.remover(i); render(); }
    }
  });
  form.btn.addEventListener("click", salvar);
  render(); form.nome && form.nome.focus();
})();
