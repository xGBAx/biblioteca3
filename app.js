// API Base URL
const API_BASE = 'https://biblioteca3-5e8o.onrender.com';

// In-memory storage for records
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
        if (firstTab) {
            firstTab.click();
        }
    });
});

// Tab switching
const tabs = document.querySelectorAll('.tab');
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const targetTab = tab.getAttribute('data-tab');
        const parentPage = tab.closest('.page');
        
        // Update active tab
        parentPage.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        // Update active tab content
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
        <div class="response-box">
            <h4>Request Body</h4>
            <pre>${JSON.stringify(requestBody, null, 2)}</pre>
        </div>
        <div class="response-box ${statusClass}">
            <h4>Response (Status: ${status})</h4>
            <pre>${JSON.stringify(response, null, 2)}</pre>
        </div>
    `;
}

// Utility function to make API calls
async function makeRequest(method, endpoint, body = null) {
    try {
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json'
            }
        };
        
        if (body) {
            options.body = JSON.stringify(body);
        }
        
        const response = await fetch(`${API_BASE}${endpoint}`, options);
        const data = await response.json();
        
        return { data, status: response.status };
    } catch (error) {
        return { data: { error: error.message }, status: 500 };
    }
}

// ===== CLIENTE CRUD =====

// CREATE Cliente
document.getElementById('clienteCreateForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const body = {
        nome: formData.get('nome'),
        email: formData.get('email'),
        telefone: formData.get('telefone'),
        endereco: formData.get('endereco')
    };
    
    const { data, status } = await makeRequest('POST', '/cliente', body);
    displayResponse('clienteCreateResponse', body, data, status);
    
    if (status >= 200 && status < 300) {
        storage.cliente.push(data);
        e.target.reset();
    }
});

// READ Cliente - Todos
document.getElementById('clienteGetAll').addEventListener('click', async () => {
    const { data, status } = await makeRequest('GET', '/cliente');
    displayResponse('clienteReadResponse', {}, data, status);
    
    if (status >= 200 && status < 300) {
        storage.cliente = Array.isArray(data) ? data : [data];
        displayRecordsList('clienteRecordsList', storage.cliente);
    }
});

// READ Cliente - Por ID
document.getElementById('clienteGetById').addEventListener('click', async () => {
    const id = document.getElementById('clienteGetId').value;
    if (!id) return alert('Digite um ID');
    
    const { data, status } = await makeRequest('GET', `/cliente/${id}`);
    displayResponse('clienteReadResponse', {}, data, status);
});

// UPDATE Cliente
document.getElementById('clienteUpdateForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const id = formData.get('id');
    
    const body = {};
    if (formData.get('nome')) body.nome = formData.get('nome');
    if (formData.get('email')) body.email = formData.get('email');
    if (formData.get('telefone')) body.telefone = formData.get('telefone');
    if (formData.get('endereco')) body.endereco = formData.get('endereco');
    
    const { data, status } = await makeRequest('PUT', `/cliente/${id}`, body);
    displayResponse('clienteUpdateResponse', body, data, status);
});

// DELETE Cliente
document.getElementById('clienteDeleteBtn').addEventListener('click', async () => {
    const id = document.getElementById('clienteDeleteId').value;
    if (!id) return alert('Digite um ID');
    
    if (!confirm('Tem certeza que deseja excluir este cliente?')) return;
    
    const { data, status } = await makeRequest('DELETE', `/cliente/${id}`);
    displayResponse('clienteDeleteResponse', {}, data, status);
});

// ===== AUTOR CRUD =====

// CREATE Autor
document.getElementById('autorCreateForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const body = {
        nome: formData.get('nome'),
        nacionalidade: formData.get('nacionalidade'),
        dataNascimento: formData.get('dataNascimento')
    };
    
    const { data, status } = await makeRequest('POST', '/autor', body);
    displayResponse('autorCreateResponse', body, data, status);
    
    if (status >= 200 && status < 300) {
        storage.autor.push(data);
        e.target.reset();
    }
});

// READ Autor - Todos
document.getElementById('autorGetAll').addEventListener('click', async () => {
    const { data, status } = await makeRequest('GET', '/autor');
    displayResponse('autorReadResponse', {}, data, status);
    
    if (status >= 200 && status < 300) {
        storage.autor = Array.isArray(data) ? data : [data];
        displayRecordsList('autorRecordsList', storage.autor);
    }
});

// READ Autor - Por ID
document.getElementById('autorGetById').addEventListener('click', async () => {
    const id = document.getElementById('autorGetId').value;
    if (!id) return alert('Digite um ID');
    
    const { data, status } = await makeRequest('GET', `/autor/${id}`);
    displayResponse('autorReadResponse', {}, data, status);
});

// UPDATE Autor
document.getElementById('autorUpdateForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const id = formData.get('id');
    
    const body = {};
    if (formData.get('nome')) body.nome = formData.get('nome');
    if (formData.get('nacionalidade')) body.nacionalidade = formData.get('nacionalidade');
    if (formData.get('dataNascimento')) body.dataNascimento = formData.get('dataNascimento');
    
    const { data, status } = await makeRequest('PUT', `/autor/${id}`, body);
    displayResponse('autorUpdateResponse', body, data, status);
});

// DELETE Autor
document.getElementById('autorDeleteBtn').addEventListener('click', async () => {
    const id = document.getElementById('autorDeleteId').value;
    if (!id) return alert('Digite um ID');
    
    if (!confirm('Tem certeza que deseja excluir este autor?')) return;
    
    const { data, status } = await makeRequest('DELETE', `/autor/${id}`);
    displayResponse('autorDeleteResponse', {}, data, status);
});

// ===== LIVRO CRUD =====

// CREATE Livro
document.getElementById('livroCreateForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const body = {
        titulo: formData.get('titulo'),
        autor: formData.get('autor'),
        isbn: formData.get('isbn'),
        quantidadeDisponivel: parseInt(formData.get('quantidadeDisponivel'))
    };
    
    const { data, status } = await makeRequest('POST', '/livro', body);
    displayResponse('livroCreateResponse', body, data, status);
    
    if (status >= 200 && status < 300) {
        storage.livro.push(data);
        e.target.reset();
    }
});

// READ Livro - Todos
document.getElementById('livroGetAll').addEventListener('click', async () => {
    const { data, status } = await makeRequest('GET', '/livro');
    displayResponse('livroReadResponse', {}, data, status);
    
    if (status >= 200 && status < 300) {
        storage.livro = Array.isArray(data) ? data : [data];
        displayRecordsList('livroRecordsList', storage.livro);
    }
});

// READ Livro - Por ID
document.getElementById('livroGetById').addEventListener('click', async () => {
    const id = document.getElementById('livroGetId').value;
    if (!id) return alert('Digite um ID');
    
    const { data, status } = await makeRequest('GET', `/livro/${id}`);
    displayResponse('livroReadResponse', {}, data, status);
});

// UPDATE Livro
document.getElementById('livroUpdateForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const id = formData.get('id');
    
    const body = {};
    if (formData.get('titulo')) body.titulo = formData.get('titulo');
    if (formData.get('autor')) body.autor = formData.get('autor');
    if (formData.get('isbn')) body.isbn = formData.get('isbn');
    if (formData.get('quantidadeDisponivel')) body.quantidadeDisponivel = parseInt(formData.get('quantidadeDisponivel'));
    
    const { data, status } = await makeRequest('PUT', `/livro/${id}`, body);
    displayResponse('livroUpdateResponse', body, data, status);
});

// DELETE Livro
document.getElementById('livroDeleteBtn').addEventListener('click', async () => {
    const id = document.getElementById('livroDeleteId').value;
    if (!id) return alert('Digite um ID');
    
    if (!confirm('Tem certeza que deseja excluir este livro?')) return;
    
    const { data, status } = await makeRequest('DELETE', `/livro/${id}`);
    displayResponse('livroDeleteResponse', {}, data, status);
});

// ===== EMPRESTIMO CRUD =====

// CREATE Emprestimo
document.getElementById('emprestimoCreateForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const body = {
        cliente: formData.get('cliente'),
        livro: formData.get('livro'),
        dataEmprestimo: formData.get('dataEmprestimo'),
        dataDevolucaoPrevista: formData.get('dataDevolucaoPrevista')
    };
    
    const { data, status } = await makeRequest('POST', '/emprestimo', body);
    displayResponse('emprestimoCreateResponse', body, data, status);
    
    if (status >= 200 && status < 300) {
        storage.emprestimo.push(data);
        e.target.reset();
    }
});

// READ Emprestimo - Todos
document.getElementById('emprestimoGetAll').addEventListener('click', async () => {
    const { data, status } = await makeRequest('GET', '/emprestimo');
    displayResponse('emprestimoReadResponse', {}, data, status);
    
    if (status >= 200 && status < 300) {
        storage.emprestimo = Array.isArray(data) ? data : [data];
        displayRecordsList('emprestimoRecordsList', storage.emprestimo);
    }
});

// READ Emprestimo - Por ID
document.getElementById('emprestimoGetById').addEventListener('click', async () => {
    const id = document.getElementById('emprestimoGetId').value;
    if (!id) return alert('Digite um ID');
    
    const { data, status } = await makeRequest('GET', `/emprestimo/${id}`);
    displayResponse('emprestimoReadResponse', {}, data, status);
});

// UPDATE Emprestimo
document.getElementById('emprestimoUpdateForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const id = formData.get('id');
    
    const body = {};
    if (formData.get('cliente')) body.cliente = formData.get('cliente');
    if (formData.get('livro')) body.livro = formData.get('livro');
    if (formData.get('dataEmprestimo')) body.dataEmprestimo = formData.get('dataEmprestimo');
    if (formData.get('dataDevolucaoPrevista')) body.dataDevolucaoPrevista = formData.get('dataDevolucaoPrevista');
    
    const { data, status } = await makeRequest('PUT', `/emprestimo/${id}`, body);
    displayResponse('emprestimoUpdateResponse', body, data, status);
});

// DELETE Emprestimo
document.getElementById('emprestimoDeleteBtn').addEventListener('click', async () => {
    const id = document.getElementById('emprestimoDeleteId').value;
    if (!id) return alert('Digite um ID');
    
    if (!confirm('Tem certeza que deseja excluir este empréstimo?')) return;
    
    const { data, status } = await makeRequest('DELETE', `/emprestimo/${id}`);
    displayResponse('emprestimoDeleteResponse', {}, data, status);
});

// ===== MULTA CRUD =====

// CREATE Multa
document.getElementById('multaCreateForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const body = {
        cliente: formData.get('cliente'),
        valor: parseFloat(formData.get('valor')),
        motivo: formData.get('motivo')
    };
    
    const { data, status } = await makeRequest('POST', '/multa', body);
    displayResponse('multaCreateResponse', body, data, status);
    
    if (status >= 200 && status < 300) {
        storage.multa.push(data);
        e.target.reset();
    }
});

// READ Multa - Todos
document.getElementById('multaGetAll').addEventListener('click', async () => {
    const { data, status } = await makeRequest('GET', '/multa');
    displayResponse('multaReadResponse', {}, data, status);
    
    if (status >= 200 && status < 300) {
        storage.multa = Array.isArray(data) ? data : [data];
        displayRecordsList('multaRecordsList', storage.multa);
    }
});

// READ Multa - Por ID
document.getElementById('multaGetById').addEventListener('click', async () => {
    const id = document.getElementById('multaGetId').value;
    if (!id) return alert('Digite um ID');
    
    const { data, status } = await makeRequest('GET', `/multa/${id}`);
    displayResponse('multaReadResponse', {}, data, status);
});

// UPDATE Multa
document.getElementById('multaUpdateForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const id = formData.get('id');
    
    const body = {};
    if (formData.get('cliente')) body.cliente = formData.get('cliente');
    if (formData.get('valor')) body.valor = parseFloat(formData.get('valor'));
    if (formData.get('motivo')) body.motivo = formData.get('motivo');
    
    const { data, status } = await makeRequest('PUT', `/multa/${id}`, body);
    displayResponse('multaUpdateResponse', body, data, status);
});

// DELETE Multa
document.getElementById('multaDeleteBtn').addEventListener('click', async () => {
    const id = document.getElementById('multaDeleteId').value;
    if (!id) return alert('Digite um ID');
    
    if (!confirm('Tem certeza que deseja excluir esta multa?')) return;
    
    const { data, status } = await makeRequest('DELETE', `/multa/${id}`);
    displayResponse('multaDeleteResponse', {}, data, status);
});

// Utility function to display records list
function displayRecordsList(containerId, records) {
    const container = document.getElementById(containerId);
    
    if (!records || records.length === 0) {
        container.innerHTML = '<p>Nenhum registro encontrado.</p>';
        return;
    }
    
    container.innerHTML = records.map(record => {
        const recordStr = Object.entries(record)
            .map(([key, value]) => `<strong>${key}:</strong> ${value}`)
            .join(', ');
        return `<div class="record-item">${recordStr}</div>`;
    }).join('');
}