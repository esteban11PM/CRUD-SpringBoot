import { registrationService } from '../service/registrationService.js';
import { clientService } from '../service/clientService.js';
import { classService } from '../service/classService.js';
import { showGrid, bindForm } from '../utils/domUtilsRegister.js';

const gridBody = document.getElementById('reg-grid-body');
const filterInput = document.getElementById('filter-reg-input');
const filterBtn = document.getElementById('filter-reg-btn');
const formModalEl = document.getElementById('class-reg-modal');
const formModal = new bootstrap.Modal(formModalEl);
const form = document.getElementById('class-form');
const title = document.getElementById('classModalLabel');
const seeMoreBtn = document.getElementById('see-more-register-btn');
const clientSelect = document.getElementById('client-select');
const classSelect = document.getElementById('instructor-select'); // reutilizamos este select
const clientFilter = document.getElementById('client-filter');
let allClients = [];
let allClasses = [];

let showingAll = false;

export async function initRegistrationModule() {
    allClients = await clientService.getAll();
    allClasses = await classService.getAll();

    renderOptions(clientSelect, allClients, c => `${c.first_name} ${c.last_name}`, c => c.id_client);
    renderOptions(classSelect, allClasses, c => `${c.type}`, c => c.id_class);

    clientFilter.addEventListener('input', () => {
        const q = clientFilter.value.toLowerCase();
        const filtered = allClients.filter(c =>
            `${c.first_name} ${c.last_name}`.toLowerCase().includes(q)
        );
        renderOptions(clientSelect, filtered, c => `${c.first_name} ${c.last_name}`, c => c.id_client);
    });


    filterBtn.addEventListener('click', () => {
        loadAndRender(filterInput.value);
    });

    bindForm(form, async dto => {
        try {
            dto.client_id = Number(dto.client_id);
            dto.class_id = Number(dto.class_id);

            if (dto.id_classRegistration) {
                await registrationService.update(dto);
            } else {
                await registrationService.create(dto);
            }

            formModal.hide();
            await loadAndRender();
        } catch (e) {
            alert(e.message);
        }
    });


    // Ver más / Ver menos
    seeMoreBtn.addEventListener('click', () => {
        const cols = gridBody.querySelectorAll('.col-md-4');
        if (!showingAll) {
            cols.forEach((col, i) => {
                if (i >= 8) { col.classList.remove('hidden-card'); col.classList.add('show-card'); }
            });
            setTimeout(() => gridBody.lastElementChild?.scrollIntoView({ behavior: 'smooth', block: 'end' }), 300);
            seeMoreBtn.textContent = 'Ver menos';
        } else {
            cols.forEach((col, i) => {
                if (i >= 8) { col.classList.remove('show-card'); col.classList.add('hidden-card'); }
            });
            setTimeout(() => document.querySelector('.team').scrollIntoView({ behavior: 'smooth' }), 300);
            seeMoreBtn.textContent = 'Ver más';
        }
        showingAll = !showingAll;
    });

    await loadAndRender();
}

async function loadAndRender(filter = '') {
    let list = await registrationService.getAll();

    if (filter) {
        list = list.filter(r =>
            r.client_full_name.toLowerCase().includes(filter.toLowerCase()) ||
            r.class_type.toLowerCase().includes(filter.toLowerCase())
        );
    }

    const total = showGrid(gridBody, list, {
        onEdit: loadForEdit,
        onDelete
    });

    seeMoreBtn.style.display = total > 8 ? 'inline-block' : 'none';
    seeMoreBtn.textContent = 'Ver más';
    showingAll = false;
}

async function loadForEdit(id) {
    const dto = await registrationService.getById(id);
    form.elements.id_classRegistration.value = dto.id_classRegistration;
    form.elements.client_id.value = dto.client_id;
    form.elements.class_id.value = dto.class_id;
    title.textContent = `Editar Registro #${dto.id_classRegistration}`;
    formModal.show();
}

async function onDelete(id) {
    if (!confirm('¿Deseas eliminar este registro?')) return;
    await registrationService.delete(id);
    await loadAndRender();
}

function renderOptions(select, list, labelFn, valueFn) {
    select.innerHTML = list
        .map(item => `<option value="${valueFn(item)}">${labelFn(item)}</option>`)
        .join('');
}
