export function showGrid(container, items, { onEdit, onDelete }) {
    container.innerHTML = '';
    items.forEach((item, index) => {
        const col = document.createElement('div');
        col.className = 'col-md-4';
        if (index >= 9) col.classList.add('hidden-client');
        col.innerHTML = `
        <div class="card h-100">
        <div class="card-body">
            <h5 class="card-title">${item.client_full_name}</h5>
            <h5 class="card-title">Clase: ${item.class_type}</h5>
            <div class="d-flex justify-content-between mt-auto">
            <button class="btn btn-sm btn-warning edit-btn" data-id="${item.id_classRegistration}">✏️</button>
            <button class="btn btn-sm btn-danger del-btn"  data-id="${item.id_classRegistration}">🗑️</button>
            </div>
        </div>
        </div>
`;
        container.appendChild(col);
    });

    // Enlazar eventos de edición y eliminación
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
        if (data.id_class_registration) data.id_class_registration = +data.id_class_registration;
        data.client_id = +data.client_id;
        data.class_id = +data.class_id;
        callback(data);
    });
}
