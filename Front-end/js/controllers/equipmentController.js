// js/controllers/equipmentController.js
import { equipmentService } from '../service/equipmentService.js';
import { showGrid, bindForm } from '../utils/domUtils.js';

const equipmentModalEl = document.getElementById('equipmentModal');
const equipmentModal = new bootstrap.Modal(equipmentModalEl);
const gridBody = document.getElementById('equipment-grid-body');
const form = document.getElementById('equipment-form');
const formTitle = document.getElementById('equipmentModalLabel');
const cancelBtn = document.getElementById('cancel-btn');
const newBtn = document.getElementById('new-equipment-btn');
const searchInput = document.getElementById('search-equipment-id');
const searchBtn = document.getElementById('search-equipment-btn');
const seeMoreBtn = document.getElementById('see-more-btn');
let showingAll = false;

export async function initEquipmentModule() {
    await loadAndRender();

    // Enlaza el form
    bindForm(form, onSubmit);

    // Botón “Nuevo Equipo”
    newBtn.addEventListener('click', () => {
        form.reset();
        formTitle.textContent = 'Nuevo Equipo';
        equipmentModal.show();
    });

    // Botón “Buscar por ID”
    searchBtn.addEventListener('click', async () => {
        const id = +searchInput.value;
        if (!id) return alert('Ingresa un ID válido');
        try {
            const dto = await equipmentService.getById(id);
            showGrid(gridBody, [dto], { onEdit: loadForEdit, onDelete });
        } catch (e) {
            alert(e.message);
        }
    });

    //Comportamiento del botón ver mas o ver menos
    seeMoreBtn.addEventListener('click', () => {
        const hiddenCols = gridBody.querySelectorAll('.col-md-4');

        if (!showingAll) {
            hiddenCols.forEach((col, i) => {
                if (i >= 9) {
                    col.classList.remove('hidden-card');
                    col.classList.add('show-card');
                }
            });
            // Scroll al último elemento (última ficha)
            setTimeout(() => {
                const lastVisible = gridBody.lastElementChild;
                lastVisible?.scrollIntoView({ behavior: 'smooth', block: 'end' });
            }, 300);
            
            seeMoreBtn.textContent = 'Ver menos';
            showingAll = true;
        } else {
            hiddenCols.forEach((col, i) => {
                if (i >= 9) {
                    col.classList.remove('show-card');
                    col.classList.add('hidden-card');
                }
            });
            // Scroll hacia arriba al contenedor principal
            setTimeout(() => {
                document.getElementById('equipment-crud')
                    .scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 300);

            seeMoreBtn.textContent = 'Ver más';
            showingAll = false;
        }
    });
}

async function loadAndRender() {
    try {
        const list = await equipmentService.getAll();
        const total = showGrid(gridBody, list, { onEdit: loadForEdit, onDelete });

        // Mostrar u ocultar botón según la cantidad
        if (total > 9) {
            seeMoreBtn.style.display = 'inline-block';
            seeMoreBtn.textContent = 'Ver más';
            showingAll = false;
        } else {
            seeMoreBtn.style.display = 'none';
        }
    } catch (e) {
        alert(e.message);
    }
}

async function loadForEdit(id) {
    try {
        const dto = await equipmentService.getById(id);
        form.id_equipment.value = dto.id_equipment;
        form.name.value = dto.name;
        form.location.value = dto.location;
        form.area_id.value = dto.area_id;
        formTitle.textContent = `Editar Equipo #${id}`;
        equipmentModal.show();
    } catch (e) {
        alert(e.message);
    }
}

async function onSubmit(dto) {
    try {
        if (dto.id_equipment) {
            await equipmentService.update(dto);
        } else {
            await equipmentService.create(dto);
        }
        equipmentModal.hide();
        form.reset();
        await loadAndRender();
    } catch (e) {
        alert(e.message);
    }
}

async function onDelete(id) {
    if (!confirm(`¿Eliminar equipo #${id}?`)) return;
    await equipmentService.delete(id);
    await loadAndRender();
}
