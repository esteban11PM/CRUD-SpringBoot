export function showGrid(container, items, { onEdit, onDelete }) {
    container.innerHTML = '';
    items.forEach((item, index) => {
        const col = document.createElement('div');
        col.className = 'col-md-6 col-lg-3 wow fadeInUp';
        col.setAttribute('data-wow-delay', `${0.2 * (index + 1)}s`);
        if (index >= 8) col.classList.add('hidden-card');

        // Emoji aleatorio
        const emojis = ['🏋️‍♂️', '🤸‍♀️', '🚴‍♂️', '🤼‍♂️'];
        const emoji = emojis[index % emojis.length];

        col.innerHTML = `
        <div class="team-item position-relative h-100">
            <div class="team-img position-relative text-center p-4" style="font-size:3rem; z-index:1;">
            ${emoji}
            <div class="team-icon">
                <button class="btn btn-sm btn-warning edit-btn " data-id="${item.id_instructor}"><i class="fas fa-edit"></i></button>
                <button class="btn btn-sm btn-danger del-btn"  data-id="${item.id_instructor}"><i class="fas fa-trash"></i></button>
            </div>
            </div>
            <div class="team-content-carta text-center p-3">
            <h4>${item.name}</h4>
            <p class="mb-0">${item.specialties}</p>
        </div>
        </div>`;
        container.appendChild(col);
    });

    // Enlazar eventos
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
        if (data.id_instructor) data.id_instructor = +data.id_instructor;
        callback(data);
    });
}