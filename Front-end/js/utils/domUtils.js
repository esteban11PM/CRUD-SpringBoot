/**
 * Renderiza un array de items como fichas en un grid Bootstrap.
 * @param {HTMLElement} container  — el <div class="row"> donde inyectar.
 * @param {Array<Object>} items   — tus DTOs de Equipment.
 * @param {{onEdit:fn,onDelete:fn}} handlers
 */
export function showGrid(container, items, { onEdit, onDelete }) {
    container.innerHTML = '';
    items.forEach((item, index) => {
        const col = document.createElement('div');
        col.className = 'col-md-4';
        if (index >= 9) col.classList.add('hidden-card');
        col.innerHTML = `
            <div class="card h-100">
            <div class="card-body d-flex flex-column feature-item">
                <h5 class="card-title">${item.name}</h5>
                <h6 class="card-subtitle mb-2 text-muted">Área: ${item.area_name}</h6>
                <p class="card-text mb-4"><strong>Ubicación:</strong> ${item.location}</p>
                <div class="mt-auto d-flex justify-content-between">
                <button class="btn btn-sm btn-warning edit-btn" data-id="${item.id_equipment}">✏️ Editar</button>
                <button class="btn btn-sm btn-danger del-btn"  data-id="${item.id_equipment}">🗑️ Eliminar</button>
                </div>
            </div>
            </div>`;
        container.appendChild(col);
    });

    // enlaza eventos
    container.querySelectorAll('.edit-btn')
        .forEach(b => b.addEventListener('click', () => onEdit(+b.dataset.id)));
    container.querySelectorAll('.del-btn')
        .forEach(b => b.addEventListener('click', () => onDelete(+b.dataset.id)));

    return items.length;
}


/**
 * Enlaza un form para capturar submit y pasarlo a callback como objeto.
 * @param {HTMLFormElement} form 
 * @param {(data: Object) => void} callback 
 */
export function bindForm(form, callback) {
    form.addEventListener('submit', e => {
        e.preventDefault();
        // reconstruye DTO
        const data = Object.fromEntries(new FormData(form).entries());
        // convierte strings a números donde toque
        if (data.id_equipment) data.id_equipment = +data.id_equipment;
        if (data.area_id) data.area_id = +data.area_id;
        callback(data);
    });
}
