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
let editando = false;
let editIndex = null;

document.getElementById("funcionarioForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const idade = parseInt(document.getElementById("idade").value);
    const cargo = document.getElementById("cargo").value;
    const salario = parseFloat(document.getElementById("salario").value);

    if(editando) {
        funcionarios[editIndex].nome = nome;
        funcionarios[editIndex].idade = idade;
        funcionarios[editIndex].cargo = cargo;
        funcionarios[editIndex].salario = salario;
        editando = false;
        editIndex = null;
        document.querySelector("#funcionarioForm button").textContent = "Cadastrar";
    } else {
        const funcionario = new Funcionario(nome, idade, cargo, salario);
        funcionarios.push(funcionario);
    }

    renderTable();
    this.reset();
});

const renderTable = () => {
    const tbody = document.querySelector("#funcionariosTable tbody"); 
    tbody.innerHTML = "";
    funcionarios.forEach((funcionario, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${funcionario.nome}</td>
            <td>${funcionario.idade}</td>
            <td>${funcionario.cargo}</td>
            <td>R$ ${funcionario.salario.toFixed(2)}</td>
            <td>
                <button onclick="(() => editarFuncionario(${index}))()">Editar</button>
                <button onclick="(() => excluirFuncionario(${index}))()">Excluir</button>
            </td>
        `;
        tbody.appendChild(row);
    });
};

const editarFuncionario = (index) => {
    const funcionario = funcionarios[index];
    document.getElementById("nome").value = funcionario.nome;
    document.getElementById("idade").value = funcionario.idade;
    document.getElementById("cargo").value = funcionario.cargo;
    document.getElementById("salario").value = funcionario.salario;
    editando = true;
    editIndex = index;
    document.querySelector("#funcionarioForm button").textContent = "Salvar";
};

const excluirFuncionario = (index) => {
    if (confirm("Deseja realmente excluir este funcionário?")) {
        funcionarios.splice(index, 1);
        renderTable(); 
    }
};