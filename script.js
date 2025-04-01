class Funcionario {
    constructor(nome, idade, cargo, salario) {
        this._nome = nome;  
        this._idade = idade;
        this._cargo = cargo;
        this._salario = salario;
    }

    get nome() {
        return this._nome;
    }

    get idade() {
        return this._idade;
    }

    get cargo() {
        return this._cargo;
    }

    get salario() {
        return this._salario;
    }

    set nome(nome) {
        this._nome = nome;
    }

    set idade(idade) {
        this._idade = idade;
    }

    set cargo(cargo) {
        this._cargo = cargo;
    }

    set salario(salario) {
        this._salario = salario;
    }

    toString() {
        return `${this._nome}, ${this._idade} anos, Cargo: ${this._cargo}, Salário: ${this._salario}`;
    }
}
    

let funcionarios = [];

document.getElementById("funcionarioForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const idade = document.getElementById("idade").value;
    const cargo = document.getElementById("cargo").value;
    const salario = document.getElementById("salario").value;

    const funcionario = new Funcionario(nome, idade, cargo, salario);

    funcionarios.push(funcionario);

    renderTable();

    this.reset();
});

const renderTable = () => {
    const tbody = document.querySelector("#funcionariosTable tbody");
    tbody.innerHTML = ""; // Limpar a tabela
    funcionarios.forEach(funcionario => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${funcionario.nome}</td>
            <td>${funcionario.idade}</td>
            <td>${funcionario.cargo}</td>
            <td>${funcionario.salario}</td>
        `;
        tbody.appendChild(row);
    });
};