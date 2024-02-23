let contadorProdutos = 1;

function calcularValorTotal(input) {
  const row = input.closest(".produto");
  const quantidadeEstoque = parseFloat(
    row.querySelector('input[name="quantidadeEstoque[]"]').value
  );
  const valorUnitario = parseFloat(
    row.querySelector('input[name="valorUnitario[]"]').value
  );
  const valorTotalInput = row.querySelector('input[name="valorTotal[]"]');
  const valorTotal = quantidadeEstoque * valorUnitario;
  valorTotalInput.value = isNaN(valorTotal) ? "" : valorTotal.toFixed(2);
}

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
                <button type="button" class="btn btn-danger btnRemoverProduto mx-2 p-1 button-lixeira">
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
                    <div class="row my-3">
                        <div class="col-md-3">
                            <div class="form-group">
                            <label for="unidadeMedida" class="form-label">Unidade de Medida:</label>
                            <select name="unidadeMedida[]" required class="form-select">
                                <option value="cm">cm</option>
                                <option value="mm">mm</option>
                                <option value="m">m</option>
                            </select>
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

document
  .getElementById("btnAdicionarProduto")
  .addEventListener("click", adicionarProduto);

function adicionarAnexo(file) {
  const anexosList = document.getElementById("anexos");

  const divAnexo = document.createElement("div");
  divAnexo.classList.add("anexo", "col-md-12", "mb-3");

  const fileContainer = document.createElement("div");
  fileContainer.classList.add("d-flex", "justify-content-between");

  const fileIcons = document.createElement("div");
  fileIcons.classList.add("d-flex");

  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
      <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
    </svg>
  `;
  deleteButton.classList.add(
    "btn",
    "btn-danger",
    "mx-2",
    "p-1",
    "button-lixeira"
  );
  deleteButton.addEventListener("click", function () {
    divAnexo.remove();
  });

  const fileLink = document.createElement("a");
  fileLink.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
  </svg>`;
  fileLink.href = URL.createObjectURL(file);
  fileLink.download = file.name;
  fileLink.classList.add("btn", "btn-primary", "mx-2", "p-1");

  fileIcons.appendChild(deleteButton);
  fileIcons.appendChild(fileLink);

  const fileLabel = document.createElement("span");
  fileLabel.textContent = file.name;

  fileContainer.appendChild(fileIcons);
  fileContainer.appendChild(fileLabel);

  divAnexo.appendChild(fileContainer);

  anexosList.appendChild(divAnexo);
}

document.getElementById("anexo").addEventListener("change", function (event) {
  const fileList = event.target.files;

  for (let i = 0; i < fileList.length; i++) {
    adicionarAnexo(fileList[i]);
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

document.querySelectorAll(".produto").forEach((produto) => {
  calcularValorTotal(produto);
});
