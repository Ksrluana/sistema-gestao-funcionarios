// ===== CORE: modelo + repositório (compartilhado entre páginas) =====
class Colaborador {
  constructor(nome, idade, cargo, salario) {
    this.nome = String(nome ?? "").trim();
    this.idade = Number(idade ?? 0);
    this.cargo = String(cargo ?? "").trim();
    this.salario = Number(salario ?? 0);
  }
  descricao() {
    const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
    return `${this.nome} | ${this.idade} anos | ${this.cargo} | ${brl.format(this.salario)}`;
  }
}

class RepoColaboradores {
  constructor(storageKey = "db_colaboradores_v1") {
    this.key = storageKey;
    this._cache = this._carregar();
  }
  _carregar() {
    try {
      const raw = localStorage.getItem(this.key);
      const arr = raw ? JSON.parse(raw) : [];
      return arr.map(o => new Colaborador(o.nome, o.idade, o.cargo, o.salario));
    } catch { return []; }
  }
  _salvar() { localStorage.setItem(this.key, JSON.stringify(this._cache)); }
  listar() { return [...this._cache]; }
  adicionar(col) { this._cache.push(col); this._salvar(); }
  atualizar(ind, col) { if (ind>=0 && ind<this._cache.length){ this._cache[ind]=col; this._salvar(); } }
  remover(ind) { if (ind>=0 && ind<this._cache.length){ this._cache.splice(ind,1); this._salvar(); } }
}

window.App = {
  repo: new RepoColaboradores(),
  money(n){ return new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(Number(n||0)); }
};
