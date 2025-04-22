export function showGrid(container, items, { onEdit, onDelete }) {
    container.innerHTML = '';
    items.forEach((item, i) => {
        const col = document.createElement('div');
        col.className = 'col-md-6 col-lg-3 wow fadeInUp';
        col.setAttribute('data-wow-delay', `${0.2 * (i + 1)}s`);
        if (i >= 8) col.classList.add('hidden-card');
        col.innerHTML = `
        <div class="team-item position-relative h-100">
            <div class="team-img position-relative text-center p-4" style="font-size:3rem; z-index:1;">
                <h2 class="mb-2">${item.type}</h2>
                <div class="team-icon">
                    <button class="btn btn-sm btn-warning edit-btn " data-id="${item.id_class}"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-sm btn-danger del-btn"  data-id="${item.id_class}"><i class="fas fa-trash"></i></button>
                </div>
            </div>
            <div class="team-content-carta text-center p-3">
                <p class="mb-2"><strong>Instructor:</strong>${item.instructor_name}</p>
                <p class="mb-1"><strong>Horario:</strong> ${item.schedule.replace('T', ' ')}</p>
                <p class="mb-1"><strong>Duración:</strong> ${item.duration}</p>
                <p class="mb-1"><strong>Capacidad:</strong> ${item.max_capacity}</p>
                <button class="btn btn-success register-btn" data-id-class="${item.id_class}">
                    Incribirme
                </button>
            </div>
            
        </div>`;
        container.appendChild(col);
    });

    // enlazar eventos
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

        // convertir a número si corresponde
        if (data.id_class) data.id_class = +data.id_class;
        if (data.instructor_id) data.instructor_id = +data.instructor_id;

        callback(data);
    });
}

/* <div class="d-grid mt-3">
    <button class="btn btn-success register-btn" data-id-class="${item.id_class}">
        🚀 Registrarme
    </button>
</div>// */