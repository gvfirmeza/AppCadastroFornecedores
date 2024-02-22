function adicionarProduto() {
    const tableBody = document.getElementById('produtos');
    const newRow = tableBody.insertRow();

    const descricaoCell = newRow.insertCell(0);
    descricaoCell.innerHTML = '<input type="text" name="descricao[]" required>';

    const unidadeMedidaCell = newRow.insertCell(1);
    unidadeMedidaCell.innerHTML = '<input type="text" name="unidadeMedida[]" required>';

    const quantidadeEstoqueCell = newRow.insertCell(2);
    quantidadeEstoqueCell.innerHTML = '<input type="number" name="quantidadeEstoque[]" required>';

    const valorUnitarioCell = newRow.insertCell(3);
    valorUnitarioCell.innerHTML = '<input type="number" name="valorUnitario[]" required>';

    const valorTotalCell = newRow.insertCell(4);
    valorTotalCell.innerHTML = '<input type="text" name="valorTotal[]" readonly>';

    const removerCell = newRow.insertCell(5);
    const removerButton = document.createElement('button');
    removerButton.textContent = 'Remover';
    removerButton.addEventListener('click', function() {
        newRow.remove();
    });
    removerCell.appendChild(removerButton);

    newRow.querySelectorAll('input[type="number"]').forEach(input => {
        input.addEventListener('input', () => {
            const row = input.parentNode.parentNode;
            const quantidadeEstoque = parseFloat(row.querySelector('input[name="quantidadeEstoque[]"]').value);
            const valorUnitario = parseFloat(row.querySelector('input[name="valorUnitario[]"]').value);
            const valorTotal = quantidadeEstoque * valorUnitario;
            row.querySelector('input[name="valorTotal[]"]').value = isNaN(valorTotal) ? '' : valorTotal.toFixed(2);
        });
    });
}

document.getElementById('anexo').addEventListener('change', function(event) {
    const fileList = event.target.files;
    const anexosList = document.getElementById('anexos');

    for (let i = 0; i < fileList.length; i++) {
        const listItem = document.createElement('li');
        listItem.textContent = fileList[i].name;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Excluir';
        deleteButton.addEventListener('click', function() {
            listItem.remove();
        });

        listItem.appendChild(deleteButton);
        anexosList.appendChild(listItem);
    }
});

function baixarJSON(event) {
    event.preventDefault();

    const camposObrigatorios = document.querySelectorAll('[required]');
    let camposVazios = false;

    camposObrigatorios.forEach(campo => {
        if (!campo.value.trim()) {
            camposVazios = true;
        }
    });

    if (camposVazios) {
        alert('Por favor, preencha todos os campos obrigatórios antes de salvar.');
        return;
    }

    const razaoSocial = document.getElementById('razaoSocial').value;
    const nomeFantasia = document.getElementById('nomeFantasia').value;
    const cnpj = document.getElementById('cnpj').value;
    const inscricaoEstadual = document.getElementById('inscricaoEstadual').value;
    const inscricaoMunicipal = document.getElementById('inscricaoMunicipal').value;
    const nomeContato = document.getElementById('contato').value;
    const telefoneContato = document.getElementById('telefone').value;
    const emailContato = document.getElementById('email').value;

    const produtos = [];
    document.querySelectorAll('#produtos tr').forEach(row => {
        const descricaoProduto = row.querySelector('input[name="descricao[]"]').value;
        const unidadeMedida = row.querySelector('input[name="unidadeMedida[]"]').value;
        const qtdeEstoque = row.querySelector('input[name="quantidadeEstoque[]"]').value;
        const valorUnitario = row.querySelector('input[name="valorUnitario[]"]').value;
        const valorTotal = row.querySelector('input[name="valorTotal[]"]').value;

        produtos.push({
            descricaoProduto,
            unidadeMedida,
            qtdeEstoque,
            valorUnitario,
            valorTotal
        });
    });

    const anexos = [];
    document.querySelectorAll('#anexos li').forEach((item, index) => {
        const nomeArquivo = item.textContent.trim().replace('Excluir', '');
        anexos.push({
            indice: index + 1,
            nomeArquivo
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
        anexos
    };

    const jsonData = JSON.stringify(data, null, 4);

    const blob = new Blob([jsonData], { type: 'application/json' });

    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'dados_fornecedor.json';

    link.click();

    URL.revokeObjectURL(url);
}

document.getElementById('btnSalvarFornecedor').addEventListener('click', baixarJSON);
