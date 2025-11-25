const API_BASE = 'https://biblioteca-api-m4jr.onrender.com';

// In-memory storage for records (não usado atualmente, mas pode ficar)
const storage = {
    cliente: [],
    autor: [],
    livro: [],
    emprestimo: [],
    multa: []
};

// Navigation
const navLinks = document.querySelectorAll('.nav-link');
const pages = document.querySelectorAll('.page');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        const targetPage = link.getAttribute('data-page');

        // Update active nav link
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');

        // Update active page
        pages.forEach(p => p.classList.remove('active'));
        document.getElementById(targetPage).classList.add('active');

        // Reset tabs to first one
        const firstTab = document.querySelector(`#${targetPage} .tab`);
        if (firstTab) firstTab.click();
    });
});

// Tab switching
const tabs = document.querySelectorAll('.tab');
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const targetTab = tab.getAttribute('data-tab');
        const parentPage = tab.closest('.page');

        parentPage.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        parentPage.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
        document.getElementById(targetTab).classList.add('active');
    });
});

// Utility function to display response
function displayResponse(containerId, requestBody, response, status) {
    const container = document.getElementById(containerId);
    container.style.display = 'grid';
    const statusClass = status >= 200 && status < 300 ? 'status-success' : 'status-error';

    container.innerHTML = `
        <div class="response-container">
            <div class="status-badge ${statusClass}">Status: ${status}</div>
            <div class="response-section">
                <h4>Request Body</h4>
                <pre>${JSON.stringify(requestBody, null, 2)}</pre>
            </div>
            <div class="response-section">
                <h4>Response</h4>
                <pre>${JSON.stringify(response, null, 2)}</pre>
            </div>
        </div>
    `;
}

// Utility function to display records
function displayRecords(containerId, records) {
    const container = document.getElementById(containerId);
    container.style.display = 'block';

    if (!records || records.length === 0) {
        container.innerHTML = '<p class="no-records">Nenhum registro encontrado.</p>';
        return;
    }

    container.innerHTML = records.map(record => {
        const recordStr = Object.entries(record)
            .map(([key, value]) => `<strong>${key}:</strong> ${value}`)
            .join('<br>');
        return `<div class="record-card">${recordStr}</div>`;
    }).join('');
}

// ============================================
// CLIENTE CRUD
// ============================================

document.getElementById('clienteCreateForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
        nome: document.getElementById('clienteNome').value,
        email: document.getElementById('clienteEmail').value,
        telefone: document.getElementById('clienteTelefone').value
    };

    try {
        const response = await fetch(`${API_BASE}/clientes`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        const responseData = await response.json();
        displayResponse('cliente-create-response', data, responseData, response.status);
        document.getElementById('clienteCreateForm').reset();
    } catch (error) {
        document.getElementById('cliente-create-response').innerHTML = `<p class="error">Erro: ${error.message}</p>`;
    }
});

document.getElementById('clienteReadBtn').addEventListener('click', async () => {
    try {
        const response = await fetch(`${API_BASE}/clientes`);
        const data = await response.json();
        displayRecords('cliente-read-response', data);
    } catch (error) {
        document.getElementById('cliente-read-response').innerHTML = `<p class="error">Erro: ${error.message}</p>`;
    }
});

document.getElementById('clienteUpdateForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('clienteUpdateId').value;
    const data = {};

    if (document.getElementById('clienteUpdateNome').value) data.nome = document.getElementById('clienteUpdateNome').value;
    if (document.getElementById('clienteUpdateEmail').value) data.email = document.getElementById('clienteUpdateEmail').value;
    if (document.getElementById('clienteUpdateTelefone').value) data.telefone = document.getElementById('clienteUpdateTelefone').value;

    try {
        const response = await fetch(`${API_BASE}/clientes/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        const responseData = await response.json();
        displayResponse('cliente-update-response', data, responseData, response.status);
        document.getElementById('clienteUpdateForm').reset();
    } catch (error) {
        document.getElementById('cliente-update-response').innerHTML = `<p class="error">Erro: ${error.message}</p>`;
    }
});

document.getElementById('clienteDeleteForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('clienteDeleteId').value;

    try {
        const response = await fetch(`${API_BASE}/clientes/${id}`, { method: 'DELETE' });
        const responseData = await response.json();
        displayResponse('cliente-delete-response', { id }, responseData, response.status);
        document.getElementById('clienteDeleteForm').reset();
    } catch (error) {
        document.getElementById('cliente-delete-response').innerHTML = `<p class="error">Erro: ${error.message}</p>`;
    }
});

// ============================================
// AUTOR CRUD (mantido igual)
// ============================================

document.getElementById('autorCreateForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
        nome: document.getElementById('autorNome').value,
        data_nascimento: document.getElementById('autorDataNascimento').value,
        nacionalidade: document.getElementById('autorNacionalidade').value
    };

    try {
        const response = await fetch(`${API_BASE}/autores`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        const responseData = await response.json();
        displayResponse('autor-create-response', data, responseData, response.status);
        document.getElementById('autorCreateForm').reset();
    } catch (error) {
        document.getElementById('autor-create-response').innerHTML = `<p class="error">Erro: ${error.message}</p>`;
    }
});

document.getElementById('autorReadBtn').addEventListener('click', async () => {
    try {
        const response = await fetch(`${API_BASE}/autores`);
        const data = await response.json();
        displayRecords('autor-read-response', data);
    } catch (error) {
        document.getElementById('autor-read-response').innerHTML = `<p class="error">Erro: ${error.message}</p>`;
    }
});

document.getElementById('autorUpdateForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('autorUpdateId').value;
    const data = {};

    if (document.getElementById('autorUpdateNome').value) data.nome = document.getElementById('autorUpdateNome').value;
    if (document.getElementById('autorUpdateDataNascimento').value) data.data_nascimento = document.getElementById('autorUpdateDataNascimento').value;
    if (document.getElementById('autorUpdateNacionalidade').value) data.nacionalidade = document.getElementById('autorUpdateNacionalidade').value;

    try {
        const response = await fetch(`${API_BASE}/autores/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        const responseData = await response.json();
        displayResponse('autor-update-response', data, responseData, response.status);
        document.getElementById('autorUpdateForm').reset();
    } catch (error) {
        document.getElementById('autor-update-response').innerHTML = `<p class="error">Erro: ${error.message}</p>`;
    }
});

document.getElementById('autorDeleteForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('autorDeleteId').value;

    try {
        const response = await fetch(`${API_BASE}/autores/${id}`, { method: 'DELETE' });
        const responseData = await response.json();
        displayResponse('autor-delete-response', { id }, responseData, response.status);
        document.getElementById('autorDeleteForm').reset();
    } catch (error) {
        document.getElementById('autor-delete-response').innerHTML = `<p class="error">Erro: ${error.message}</p>`;
    }
});

// ============================================
// LIVRO CRUD – COM DATA DE CADASTRO
// ============================================

document.getElementById('livroCreateForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
        titulo: document.getElementById('livroTitulo').value,
        autor_id: document.getElementById('livroAutorId').value,
        isbn: document.getElementById('livroISBN').value,
        genero: document.getElementById('livroGenero').value,
        ano_publicacao: parseInt(document.getElementById('livroAnoPublicacao').value),
        data_cadastro: document.getElementById('livroDataCadastro').value   // novo campo
    };

    fetch(`${API_BASE}/livros`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(response => response.json().then(respData => ({ status: response.status, body: respData })))
    .then(({ status, body }) => {
        displayResponse('livro-create-response', data, body, status);
        document.getElementById('livroCreateForm').reset();
    })
    .catch(error => {
        document.getElementById('livro-create-response').innerHTML = `<p class="error">Erro: ${error.message}</p>`;
    });
});

document.getElementById('livroReadBtn').addEventListener('click', async () => {
    try {
        const response = await fetch(`${API_BASE}/livros`);
        const data = await response.json();
        displayRecords('livro-read-response', data);
    } catch (error) {
        document.getElementById('livro-read-response').innerHTML = `<p class="error">Erro: ${error.message}</p>`;
    }
});

document.getElementById('livroUpdateForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = document.getElementById('livroUpdateId').value;
    const data = {};

    if (document.getElementById('livroUpdateTitulo').value) data.titulo = document.getElementById('livroUpdateTitulo').value;
    if (document.getElementById('livroUpdateAutorId').value) data.autor_id = document.getElementById('livroUpdateAutorId').value;
    if (document.getElementById('livroUpdateISBN').value) data.isbn = document.getElementById('livroUpdateISBN').value;
    if (document.getElementById('livroUpdateGenero').value) data.genero = document.getElementById('livroUpdateGenero').value;
    if (document.getElementById('livroUpdateAnoPublicacao').value) data.ano_publicacao = parseInt(document.getElementById('livroUpdateAnoPublicacao').value);
    if (document.getElementById('livroUpdateDataCadastro').value) data.data_cadastro = document.getElementById('livroUpdateDataCadastro').value;

    try {
        const response = await fetch(`${API_BASE}/livros/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        const responseData = await response.json();
        displayResponse('livro-update-response', data, responseData, response.status);
        document.getElementById('livroUpdateForm').reset();
    } catch (error) {
        document.getElementById('livro-update-response').innerHTML = `<p class="error">Erro: ${error.message}</p>`;
    }
});

document.getElementById('livroDeleteForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('livroDeleteId').value;

    try {
        const response = await fetch(`${API_BASE}/livros/${id}`, { method: 'DELETE' });
        const responseData = await response.json();
        displayResponse('livro-delete-response', { id }, responseData, response.status);
        document.getElementById('livroDeleteForm').reset();
    } catch (error) {
        document.getElementById('livro-delete-response').innerHTML = `<p class="error">Erro: ${error.message}</p>`;
    }
});

// ============================================
// EMPRÉSTIMO CRUD (mantido)
// ============================================

document.getElementById('emprestimoCreateForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
        cliente_id: document.getElementById('emprestimoClienteId').value,
        livro_id: document.getElementById('emprestimoLivroId').value,
        data_emprestimo: document.getElementById('emprestimoDataEmprestimo').value,
        data_devolucao: document.getElementById('emprestimoDataDevolucao').value
    };

    try {
        const response = await fetch(`${API_BASE}/emprestimos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        const responseData = await response.json();
        displayResponse('emprestimo-create-response', data, responseData, response.status);
        document.getElementById('emprestimoCreateForm').reset();
    } catch (error) {
        document.getElementById('emprestimo-create-response').innerHTML = `<p class="error">Erro: ${error.message}</p>`;
    }
});

document.getElementById('emprestimoReadBtn').addEventListener('click', async () => {
    try {
        const response = await fetch(`${API_BASE}/emprestimos`);
        const data = await response.json();
        displayRecords('emprestimo-read-response', data);
    } catch (error) {
        document.getElementById('emprestimo-read-response').innerHTML = `<p class="error">Erro: ${error.message}</p>`;
    }
});

document.getElementById('emprestimoUpdateForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('emprestimoUpdateId').value;
    const data = {};

    if (document.getElementById('emprestimoUpdateClienteId').value) data.cliente_id = document.getElementById('emprestimoUpdateClienteId').value;
    if (document.getElementById('emprestimoUpdateLivroId').value) data.livro_id = document.getElementById('emprestimoUpdateLivroId').value;
    if (document.getElementById('emprestimoUpdateDataEmprestimo').value) data.data_emprestimo = document.getElementById('emprestimoUpdateDataEmprestimo').value;
    if (document.getElementById('emprestimoUpdateDataDevolucao').value) data.data_devolucao = document.getElementById('emprestimoUpdateDataDevolucao').value;

    try {
        const response = await fetch(`${API_BASE}/emprestimos/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        const responseData = await response.json();
        displayResponse('emprestimo-update-response', data, responseData, response.status);
        document.getElementById('emprestimoUpdateForm').reset();
    } catch (error) {
        document.getElementById('emprestimo-update-response').innerHTML = `<p class="error">Erro: ${error.message}</p>`;
    }
});

document.getElementById('emprestimoDeleteForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('emprestimoDeleteId').value;

    try {
        const response = await fetch(`${API_BASE}/emprestimos/${id}`, { method: 'DELETE' });
        const responseData = await response.json();
        displayResponse('emprestimo-delete-response', { id }, responseData, response.status);
        document.getElementById('emprestimoDeleteForm').reset();
    } catch (error) {
        document.getElementById('emprestimo-delete-response').innerHTML = `<p class="error">Erro: ${error.message}</p>`;
    }
});

// ============================================
// MULTA CRUD (mantido)
// ============================================

document.getElementById('multaCreateForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
        cliente_id: document.getElementById('multaClienteId').value,
        valor: parseFloat(document.getElementById('multaValor').value),
        data_multa: document.getElementById('multaDataMulta').value,
        motivo: document.getElementById('multaMotivo').value
    };

    try {
        const response = await fetch(`${API_BASE}/multas`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        const responseData = await response.json();
        displayResponse('multa-create-response', data, responseData, response.status);
        document.getElementById('multaCreateForm').reset();
    } catch (error) {
        document.getElementById('multa-create-response').innerHTML = `<p class="error">Erro: ${error.message}</p>`;
    }
});

document.getElementById('multaReadBtn').addEventListener('click', async () => {
    try {
        const response = await fetch(`${API_BASE}/multas`);
        const data = await response.json();
        displayRecords('multa-read-response', data);
    } catch (error) {
        document.getElementById('multa-read-response').innerHTML = `<p class="error">Erro: ${error.message}</p>`;
    }
});

document.getElementById('multaUpdateForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('multaUpdateId').value;
    const data = {};

    if (document.getElementById('multaUpdateClienteId').value) data.cliente_id = document.getElementById('multaUpdateClienteId').value;
    if (document.getElementById('multaUpdateValor').value) data.valor = parseFloat(document.getElementById('multaUpdateValor').value);
    if (document.getElementById('multaUpdateDataMulta').value) data.data_multa = document.getElementById('multaUpdateDataMulta').value;
    if (document.getElementById('multaUpdateMotivo').value) data.motivo = document.getElementById('multaUpdateMotivo').value;

    try {
        const response = await fetch(`${API_BASE}/multas/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        const responseData = await response.json();
        displayResponse('multa-update-response', data, responseData, response.status);
        document.getElementById('multaUpdateForm').reset();
    } catch (error) {
        document.getElementById('multa-update-response').innerHTML = `<p class="error">Erro: ${error.message}</p>`;
    }
});

document.getElementById('multaDeleteForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('multaDeleteId').value;

    try {
        const response = await fetch(`${API_BASE}/multas/${id}`, { method: 'DELETE' });
        const responseData = await response.json();
        displayResponse('multa-delete-response', { id }, responseData, response.status);
        document.getElementById('multaDeleteForm').reset();
    } catch (error) {
        document.getElementById('multa-delete-response').innerHTML = `<p class="error">Erro: ${error.message}</p>`;
    }
});