import { classService } from '../service/classService.js';
import { instructorService } from '../service/instructorService.js';
import { clientService } from '../service/clientService.js';
import { showGrid, bindForm } from '../utils/domUtilsClass.js';

import { registrationService } from '../service/registrationService.js';
const regModalEl = document.getElementById('class-reg-modal');
const regModal = new bootstrap.Modal(regModalEl);
const clientFilter = document.getElementById('client-filter');
const clientSelect = document.getElementById('client-select');
const confirmRegBtn = document.getElementById('confirm-register-btn');

let currentClassId;     // guardamos la clase a la que nos registramos
let allClients = [];    // cache de clientes para filtrar

const gridBody = document.getElementById('class-grid-body');
const newBtn = document.getElementById('new-class-btn');
const filterInput = document.getElementById('filter-specialty-input');
const filterBtn = document.getElementById('filter-specialty-btn');
const seeMoreBtn = document.getElementById('see-more-class-btn');
const modalEl = document.getElementById('class-modal');
const modal = new bootstrap.Modal(modalEl);
const form = document.getElementById('class-form');
const formTitle = document.getElementById('classModalLabel');
const instructorSelect = document.getElementById('instructor-select');

let showingAll = false;

export async function initClassModule() {
    // 1) Carga instructores para el select
    const instructors = await instructorService.getAll();
    instructorSelect.innerHTML = instructors
        .map(i => `<option value="${i.id_instructor}">${i.name}</option>`)
        .join('');

    // 2) CRUD: nuevo
    newBtn.addEventListener('click', () => {
        form.reset();
        form.elements.id_class.value = '';
        formTitle.textContent = 'Nueva Clase';
        modal.show();
    });

    // 3) Filtro por tipo de clase
    filterBtn.addEventListener('click', () => {
        loadAndRender(filterInput.value);
    });

    // 4) Bind del form (create / update)
    bindForm(form, async dto => {
        try {
            // convertir tipos

            dto.max_capacity = Number(dto.max_capacity);
            dto.instructor_id = Number(dto.instructor_id);
            // schedule ya viene en formato yyyy-MM-ddTHH:mm
            // duration en formato HH:mm
            dto.schedule = dto.schedule + ':00Z';
            if (dto.id_class) await classService.update(dto);
            else await classService.create(dto);
            modal.hide();
            await loadAndRender();
        } catch (e) {
            alert(e.message);
        }
    });

    // 5) “Ver más / Ver menos”
    seeMoreBtn.addEventListener('click', () => {
        const cols = gridBody.querySelectorAll('.col-md-6.col-lg-3');
        if (!showingAll) {
            cols.forEach((col, i) => {
                if (i >= 8) col.classList.replace('hidden-card', 'show-card');
            });
            setTimeout(() => gridBody.lastElementChild?.scrollIntoView({ behavior: 'smooth', block: 'end' }), 300);
            seeMoreBtn.textContent = 'Ver menos';
        } else {
            cols.forEach((col, i) => {
                if (i >= 8) col.classList.replace('show-card', 'hidden-card');
            });
            setTimeout(() => document.querySelector('.team').scrollIntoView({ behavior: 'smooth', block: 'start' }), 300);
            seeMoreBtn.textContent = 'Ver más';
        }
        showingAll = !showingAll;
    });

    // Cargamos todos los clientes para el filtro
    allClients = await clientService.getAll();
    clientSelect.innerHTML = allClients
        .map(c => `<option value="${c.id_client}">
                ${c.first_name} ${c.last_name}
            </option>`)
        .join('');

    // Filtrado en vivo
    clientFilter.addEventListener('input', () => {
        const q = clientFilter.value.toLowerCase();
        clientSelect.innerHTML = allClients
            .filter(c => (`${c.first_name} ${c.last_name}`).toLowerCase().includes(q))
            .map(c => `<option value="${c.id_client}">
                ${c.first_name} ${c.last_name}
                </option>`)
            .join('');
    });

    // se termina de crear el registro entre el cliente y la clase
    // al hacer click en el botón de confirmar
    confirmRegBtn.addEventListener('click', async () => {
        try {
            if (!currentClassId || !clientSelect.value) {
                return alert('Debes seleccionar un cliente');
            }
            // Creamos el registro
            await registrationService.create({
                class_id: currentClassId,
                client_id: Number(clientSelect.value)
            });
            regModal.hide();
            // Redirigimos a la página de registros
            window.location.href = 'registros.html';
        } catch (e) {
            alert(e.message);
        }
    });

    // 6) Carga inicial
    await loadAndRender();
}

async function loadAndRender(filter = '') {
    let list = await classService.getAll();
    if (filter) {
        list = list.filter(c => c.type.toLowerCase().includes(filter.toLowerCase()));
    }
    const total = showGrid(gridBody, list, {
        onEdit: loadForEdit,
        onDelete
    });
    // Botón aparece si hay >12
    seeMoreBtn.style.display = total > 8 ? 'inline-block' : 'none';
    seeMoreBtn.textContent = 'Ver más';
    showingAll = false;

    //filtra las personas registradas para seleccionar
    gridBody.querySelectorAll('.register-btn')
        .forEach(b => b.addEventListener('click', () => {
            currentClassId = +b.dataset.idClass;  // tu template debe usar data-id-class
            clientFilter.value = '';
            clientSelect.value = '';
            regModal.show();
        }));

}


async function loadForEdit(id) {
    const dto = await classService.getById(id);
    form.elements.id_class.value = dto.id_class;
    form.elements.type.value = dto.type;
    form.elements.max_capacity.value = dto.max_capacity;
    // convertir OffsetDateTime a yyyy-MM-ddTHH:mm
    form.elements.schedule.value = dto.schedule.slice(0, 16);
    form.elements.duration.value = dto.duration;
    form.elements.instructor_id.value = dto.instructor_id;
    formTitle.textContent = `Editar Clase #${id}`;
    modal.show();
}

async function onDelete(id) {
    if (!confirm(`¿Eliminar clase #${id}?`)) return;
    await classService.delete(id);
    await loadAndRender();
}
