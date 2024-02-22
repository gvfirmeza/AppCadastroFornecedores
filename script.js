let contadorProdutos = 1;

function adicionarProduto() {
  contadorProdutos++;

  const tabelaProdutos = document.getElementById("tabela-produtos");

  const divProduto = document.createElement("div");
  divProduto.classList.add("produto", "col-md-12", "mb-3");

  divProduto.innerHTML = `
        <div class="produto">
            <br/>
            <div class="row">
                <div class="col-md-1 d-flex align-items-center justify-content-end">
                <button type="button" class="btn btn-danger btnRemoverProduto mx-2 button-lixeira">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                    </svg>
                </button>
                <div class="icon-caixa rounded p-2 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-box-seam" viewBox="0 0 16 16">
                    <path fill="#fff" d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5l2.404.961L10.404 2zm3.564 1.426L5.596 5 8 5.961 14.154 3.5zm3.25 1.7-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464z"/>
                </svg>
            </div>                   
                </div>
                <div class="col-md-11">
                <h4>Produto ${contadorProdutos}</h4>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <label for="descricao" class="form-label">Descrição:</label>
                                <input type="text" name="descricao[]" required class="form-control">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-3">
                            <div class="form-group">
                                <label for="unidadeMedida" class="form-label">Unidade de Medida:</label>
                                <input type="text" name="unidadeMedida[]" required class="form-control">
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label for="quantidadeEstoque" class="form-label">Quantidade em Estoque:</label>
                                <input type="number" name="quantidadeEstoque[]" required class="form-control">
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="form-group">
                                <label for="valorUnitario" class="form-label">Valor Unitário:</label>
                                <input type="number" name="valorUnitario[]" required class="form-control">
                            </div>
                        </div>
                        <div class="col-md-3">
                            <label for="valorTotal" class="form-label">Valor Total:</label>
                            <input type="text" name="valorTotal[]" readonly class="form-control">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>    
    `;

  tabelaProdutos.appendChild(divProduto);

  divProduto.querySelectorAll('input[type="number"]').forEach((input) => {
    input.addEventListener("input", () => {
      calcularValorTotal(divProduto);
    });
  });

  divProduto
    .querySelector(".btnRemoverProduto")
    .addEventListener("click", () => {
      divProduto.remove();
      contadorProdutos--;
    });
}

function calcularValorTotal(divProduto) {
  const quantidadeEstoque = parseFloat(
    divProduto.querySelector('input[name="quantidadeEstoque[]"]').value
  );
  const valorUnitario = parseFloat(
    divProduto.querySelector('input[name="valorUnitario[]"]').value
  );
  const valorTotalInput = divProduto.querySelector(
    'input[name="valorTotal[]"]'
  );
  const valorTotal = quantidadeEstoque * valorUnitario;
  valorTotalInput.value = isNaN(valorTotal) ? "" : valorTotal.toFixed(2);
}

document
  .getElementById("btnAdicionarProduto")
  .addEventListener("click", adicionarProduto);

document.getElementById("anexo").addEventListener("change", function (event) {
  const fileList = event.target.files;
  const anexosList = document.getElementById("anexos");

  for (let i = 0; i < fileList.length; i++) {
    const listItem = document.createElement("li");
    listItem.textContent = fileList[i].name;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Excluir";
    deleteButton.addEventListener("click", function () {
      listItem.remove();
    });

    listItem.appendChild(deleteButton);
    anexosList.appendChild(listItem);
  }
});

document.getElementById("anexo").addEventListener("change", function (event) {
  const fileList = event.target.files;
  const anexosList = document.getElementById("anexos");

  for (let i = 0; i < fileList.length; i++) {
    const listItem = document.createElement("li");
    listItem.textContent = fileList[i].name;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Excluir";
    deleteButton.addEventListener("click", function () {
      listItem.remove();
    });

    listItem.appendChild(deleteButton);
    anexosList.appendChild(listItem);
  }
});

function baixarJSON(event) {
  event.preventDefault();

  const camposObrigatorios = document.querySelectorAll("[required]");
  let camposVazios = false;

  camposObrigatorios.forEach((campo) => {
    if (!campo.value.trim()) {
      camposVazios = true;
    }
  });

  if (camposVazios) {
    alert("Por favor, preencha todos os campos obrigatórios antes de salvar.");
    return;
  }

  const razaoSocial = document.getElementById("razaoSocial").value;
  const nomeFantasia = document.getElementById("nomeFantasia").value;
  const cnpj = document.getElementById("cnpj").value;
  const inscricaoEstadual = document.getElementById("inscricaoEstadual").value;
  const inscricaoMunicipal =
    document.getElementById("inscricaoMunicipal").value;
  const nomeContato = document.getElementById("contato").value;
  const telefoneContato = document.getElementById("telefone").value;
  const emailContato = document.getElementById("email").value;

  const produtos = [];
  document.querySelectorAll("#produtos tr").forEach((row) => {
    const descricaoProduto = row.querySelector(
      'input[name="descricao[]"]'
    ).value;
    const unidadeMedida = row.querySelector(
      'input[name="unidadeMedida[]"]'
    ).value;
    const qtdeEstoque = row.querySelector(
      'input[name="quantidadeEstoque[]"]'
    ).value;
    const valorUnitario = row.querySelector(
      'input[name="valorUnitario[]"]'
    ).value;
    const valorTotal = row.querySelector('input[name="valorTotal[]"]').value;

    produtos.push({
      descricaoProduto,
      unidadeMedida,
      qtdeEstoque,
      valorUnitario,
      valorTotal,
    });
  });

  const anexos = [];
  document.querySelectorAll("#anexos li").forEach((item, index) => {
    const nomeArquivo = item.textContent.trim().replace("Excluir", "");
    anexos.push({
      indice: index + 1,
      nomeArquivo,
    });
  });

  const data = {
    razaoSocial,
    nomeFantasia,
    cnpj,
    inscricaoEstadual,
    inscricaoMunicipal,
    nomeContato,
    telefoneContato,
    emailContato,
    produtos,
    anexos,
  };

  const jsonData = JSON.stringify(data, null, 4);

  const blob = new Blob([jsonData], { type: "application/json" });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "dados_fornecedor.json";

  link.click();

  URL.revokeObjectURL(url);
}

document
  .getElementById("btnSalvarFornecedor")
  .addEventListener("click", baixarJSON);
