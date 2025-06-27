import { instructorService } from '../service/instructorService.js';
import { showGrid, bindForm } from '../utils/domUtilsInstructor.js';

const gridBody = document.getElementById('instructor-grid-body');
const newBtn = document.getElementById('new-instructor-btn');
const filterInput = document.getElementById('filter-specialty-input');
const filterBtn = document.getElementById('filter-specialty-btn');
const seeMoreBtn = document.getElementById('see-more-instructors-btn');
const modalEl = document.getElementById('instructorModal');
const modal = new bootstrap.Modal(modalEl);
const form = document.getElementById('instructor-form');
const formTitle = document.getElementById('instructorModalLabel');
let showingAll = false;

export async function initInstructorModule() {
    await loadAndRender();

    // Nuevo Instructor
    newBtn.addEventListener('click', () => {
        form.reset();
        formTitle.textContent = 'Nuevo Instructor';
        modal.show();
    });

    // Filtrar por especialidad
    filterBtn.addEventListener('click', () => {
        loadAndRender(filterInput.value);
    });

    // CRUD via form
    bindForm(form, async dto => {
        try {
            if (dto.id_instructor) await instructorService.update(dto);
            else await instructorService.create(dto);
            modal.hide();
            await loadAndRender();
        } catch (e) { alert(e.message); }
    });

    // Ver más / Ver menos
    seeMoreBtn.addEventListener('click', () => {
        const cols = gridBody.querySelectorAll('.col-md-6.col-lg-3');
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
}

async function loadAndRender(filter = '') {
    let list = await instructorService.getAll();
    if (filter) {
        list = list.filter(i => i.specialties.toLowerCase().includes(filter.toLowerCase()));
    }
    const total = showGrid(gridBody, list, {
        onEdit: loadForEdit,
        onDelete
    });
    // Mostrar botón solo si >12
    seeMoreBtn.style.display = total > 8 ? 'inline-block' : 'none';
    seeMoreBtn.textContent = 'Ver más';
    showingAll = false;
}

async function loadForEdit(id) {
    const dto = await instructorService.getById(id);
    form.id_instructor.value = dto.id_instructor;
    form.name.value = dto.name;
    form.specialties.value = dto.specialties;
    formTitle.textContent = `Editar Instructor #${id}`;
    modal.show();
}

async function onDelete(id) {
    if (!confirm(`¿Eliminar instructor #${id}?`)) return;
    await instructorService.delete(id);
    await loadAndRender();
}
