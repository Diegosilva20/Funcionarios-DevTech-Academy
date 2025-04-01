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

document.getElementById("funcionarioForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const idade = parseInt(document.getElementById("idade").value);
    const cargo = document.getElementById("cargo").value;
    const salario = parseFloat(document.getElementById("salario").value);

    if (editando) {
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
                <button class="edit-btn">Editar</button>
                <button class="delete-btn">Excluir</button>
            </td>
        `;
        tbody.appendChild(row);

        // Adicionar eventos aos botões com funções anônimas
        const editBtn = row.querySelector(".edit-btn");
        const deleteBtn = row.querySelector(".delete-btn");

        editBtn.addEventListener("click", function () {
            editarFuncionario(index);
        });

        deleteBtn.addEventListener("click", function () {
            excluirFuncionario(index);
        });
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

const exibirRelatorio = (titulo, conteudo) => {
    const output = document.getElementById("relatoriosOutput");
    output.innerHTML = `<h3>${titulo}</h3><p>${conteudo}</p>`;
};

const listarSalariosAltos = () => {
    const salariosAltos = funcionarios.filter(funcionario => funcionario.salario > 5000);
    if (salariosAltos.length === 0) {
        exibirRelatorio("Funcionários com Salário > R$ 5000", "Nenhum funcionário com salário acima de R$ 5000 encontrado.");
    } else {
        const lista = salariosAltos.map(funcionario => funcionario.toString()).join("<br>");
        exibirRelatorio("Funcionários com Salário > R$ 5000", lista);
    }
};

const calcularMediaSalarial = () => {
    if (funcionarios.length === 0) {
        exibirRelatorio("Média Salarial", "Nenhum funcionário cadastrado.");
        return;
    }
    const somaSalarios = funcionarios.reduce((soma, funcionario) => soma + funcionario.salario, 0);
    const media = (somaSalarios / funcionarios.length).toFixed(2);
    const expressaoSoma = funcionarios.map(funcionario => funcionario.salario.toFixed(2)).join(" + ");
    const expressaoCompleta = `(${expressaoSoma}) / ${funcionarios.length} = R$ ${media}`;
    exibirRelatorio("Média Salarial", expressaoCompleta);
};

const listarCargosUnicos = () => {
    if (funcionarios.length === 0) {
        exibirRelatorio("Cargos Únicos", "Nenhum funcionário cadastrado.");
        return;
    }
    const cargosUnicos = [...new Set(funcionarios.map(funcionario => funcionario.cargo))];
    exibirRelatorio("Cargos Únicos", cargosUnicos.join("<br>"));
};

const listarNomesMaiusculo = () => {
    if (funcionarios.length === 0) {
        exibirRelatorio("Nomes em Maiúsculo", "Nenhum funcionário cadastrado.");
        return;
    }
    const nomesMaiusculo = funcionarios.map(funcionario => funcionario.nome.toUpperCase());
    exibirRelatorio("Nomes em Maiúsculo", nomesMaiusculo.join("<br>"));
};

document.getElementById("listarSalariosAltos").addEventListener("click", listarSalariosAltos);
document.getElementById("mediaSalarial").addEventListener("click", calcularMediaSalarial);
document.getElementById("cargosUnicos").addEventListener("click", listarCargosUnicos);
document.getElementById("nomesMaiusculo").addEventListener("click", listarNomesMaiusculo);