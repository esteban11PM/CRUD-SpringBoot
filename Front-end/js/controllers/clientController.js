import { membershipService } from '../service/membershipService.js';
import { paymentService } from '../service/paymentSevice.js';
import { clientService } from '../service/clientService.js';
import { showGrid, bindForm } from '../utils/domUtilsClient.js';

const formSection = document.getElementById('client-form-section');
const gridSection = document.getElementById('client-grid-section');
const form = document.getElementById('client-form');
const membershipSelect = document.getElementById('membership-select');
const newBtn = document.getElementById('new-client-btn');
const filterInput = document.getElementById('filter-name-input');
const filterBtn = document.getElementById('filter-name-btn');
const gridBody = document.getElementById('client-grid-body');
const paymentSelect = document.getElementById('payment-select');
const seeMoreClientsBtn = document.getElementById('see-more-clients-btn');
let showingAllClients = false;

let memberships = [];

export async function initClientModule() {
    // 1) Carga membresías y guarda array
    memberships = await membershipService.getAll();
    membershipSelect.innerHTML = memberships
        .map(m => `<option value="${m.id_membership}">${m.name}</option>`)
        .join('');

    //Fill medios de pago "quemados"
    const methods = ['Efectivo', 'Tarjeta', 'Transferencia'];
    paymentSelect.innerHTML = methods
        .map(m => `<option value="${m}">${m}</option>`)
        .join('');


    // 2) Cuando el usuario seleccione una membresía, calcula fechas
    membershipSelect.addEventListener('change', onMembershipChange);

    //cuando el usuario seleccione un medio de pago
    
    
    
    
    // 3) Enlaza el form
    bindForm(form, onSubmit);
    paymentSelect.addEventListener('change', onPaymentChange);
    
    // 3) Botón “Nuevo Registro”
    newBtn.addEventListener('click', () => {
        form.reset();
        form.elements.id_client.value = '';
        form.elements.id_payment.value = '';
        // rellena la fecha de pago de inmediato:
        onPaymentChange();
        Modal.show();
        showForm(true);
    });

    // 4) Filtro por nombre
    filterBtn.addEventListener('click', () => {
        loadAndRender(filterInput.value);
    });

    // 5) Carga inicial de clientes
    await loadAndRender();

    seeMoreClientsBtn.addEventListener('click', () => {
        const cols = gridBody.querySelectorAll('.col-md-4');

        if (!showingAllClients) {
            // Mostrar las cards ocultas (a partir de la 10ª)
            cols.forEach((col, i) => {
                if (i >= 9) {
                    col.classList.remove('hidden-client');
                    col.classList.add('show-client');
                }
            });
            // Scroll suave al final
            setTimeout(() => {
                gridBody.lastElementChild
                    ?.scrollIntoView({ behavior: 'smooth', block: 'end' });
            }, 300);

            seeMoreClientsBtn.textContent = 'Ver menos';
            showingAllClients = true;
        } else {
            // Ocultar de nuevo las cards a partir de la 10ª
            cols.forEach((col, i) => {
                if (i >= 9) {
                    col.classList.remove('show-client');
                    col.classList.add('hidden-client');
                }
            });
            // Scroll suave al inicio del grid
            setTimeout(() => {
                document.getElementById('client-grid-section')
                    .scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 300);

            seeMoreClientsBtn.textContent = 'Ver más';
            showingAllClients = false;
        }
    });
}

async function loadAndRender(filterName = '') {
    const list = filterName
        ? await clientService.getByName(filterName)
        : await clientService.getAll();

    const total = showGrid(gridBody, list, {
        onEdit: loadForEdit,
        onDelete
    });

    if (total > 9) {
        seeMoreClientsBtn.style.display = 'inline-block';
        seeMoreClientsBtn.textContent = 'Ver más';
        showingAllClients = false;
    } else {
        seeMoreClientsBtn.style.display = 'none';
    }           // oculta el form y muestra el grid
}

function showForm(show = true) {
    formSection.style.display = show ? 'block' : 'none';
    gridSection.style.display = show ? 'none' : 'block';
}

async function loadForEdit(id) {
    const dto = await clientService.getById(id);
    form.elements.id_client.value = dto.id_client;
    form.elements.first_name.value = dto.first_name;
    form.elements.last_name.value = dto.last_name;
    form.elements.phone.value = dto.phone || '';
    form.elements.membership_start_date.value = dto.membership_start_date;
    form.elements.membership_end_date.value = dto.membership_end_date;
    form.elements.membership_id.value = dto.membership_id;
    showForm(true);
}

async function onSubmit(dto) {
    let clientId;

    // 1) Guardar o actualizar client y obtener ID
    if (dto.id_client) {
        await clientService.update(dto);
        clientId = dto.id_client;
    } else {
        const created = await clientService.create(dto);
        clientId = created.id_client;
    }
    // console.log(clientService.create(dto));
    // 2) Registrar el pago
    const paymentDTO = {
        client_id: clientId,
        amount: parseFloat(form.elements.amount.value),
        payment_date: form.elements.payment_date.value,
        payment_method: form.elements.payment_method.value
    };
    console.log('PAYMENT DTO:', paymentDTO);

    await paymentService.create(paymentDTO);

    // 3) Volver al grid
    showForm(false);
    await loadAndRender();
}

async function onDelete(id) {
    if (!confirm(`¿Eliminar cliente #${id}?`)) return;
    await clientService.delete(id);
    await loadAndRender();
}

// Esta función se ejecuta cuando el usuario cambia la membresía
// y calcula las fechas de inicio y fin
function onMembershipChange() {
    const today = new Date();

    // Formato ISO (YYYY-MM-DD)
    const start = today.toISOString().split('T')[0];

    const endDate = new Date(today);
    endDate.setMonth(endDate.getMonth() + 1); // Duración quemada de un mes
    const end = endDate.toISOString().split('T')[0];

    // Rellenar campos ocultos
    form.elements.membership_start_date.value = start;
    form.elements.membership_end_date.value = end;
}

// Esta función se ejecuta cuando el usuario cambia el medio de pago

function onPaymentChange() {
    const today = new Date();

    // Formato ISO (YYYY-MM-DD)
    const paymentDate = today.toISOString().split('T')[0];

    // Rellenar campos ocultos
    form.elements.payment_date.value = paymentDate;
}

