export function showGrid(container, items, { onEdit, onDelete }) {
    container.innerHTML = '';
    items.forEach((item, index) => {
        const col = document.createElement('div');
        col.className = 'col-md-4';
        if (index >= 9) col.classList.add('hidden-client');
        col.innerHTML = `
        <div class="card position-relative h-100 p-3">
            <div class="card-body d-flex flex-column">
            <h5 class="card-title">${item.first_name} ${item.last_name}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${item.membership_type}</h6>
            <p class="card-text mb-1"><strong>Tel:</strong> ${item.phone || '-'}</p>
            <p class="card-text mb-1"><strong>Inicio:</strong> ${item.membership_start_date}</p>
            <p class="card-text mb-1"><strong>Fin:</strong> ${item.membership_end_date}</p>
            <div class="mt-auto d-flex justify-content-between">
                <button class="btn btn-sm btn-warning edit-btn" data-id="${item.id_client}">✏️ Editar</button>
                <button class="btn btn-sm btn-danger del-btn"  data-id="${item.id_client}">🗑️ Eliminar</button>
            </div>
            </div>
        </div>`;
        container.appendChild(col);
    });
    container.querySelectorAll('.edit-btn')
        .forEach(b => b.addEventListener('click', () => onEdit(+b.dataset.id)));
    container.querySelectorAll('.del-btn')
        .forEach(b => b.addEventListener('click', () => onDelete(+b.dataset.id)));

    return items.length;
}
export function bindForm(form, callback) {
    form.addEventListener('submit', e => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(form).entries());
        // convertir números
        if (data.id_client) data.id_client = +data.id_client;
        data.membership_id = +data.membership_id;
        callback(data);
    });
}
