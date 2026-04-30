import { createIcons, icons } from 'lucide';
import { supabase } from './supabaseClient.js';

createIcons({ icons });

// --- UI HELPERS ---
const toggleBtn = document.getElementById('mobile-menu-toggle');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('sidebar-overlay');

if(toggleBtn && sidebar) {
    toggleBtn.addEventListener('click', () => {
        sidebar.classList.remove('-translate-x-full');
        if(overlay) overlay.classList.remove('hidden');
    });
}

if(overlay) {
    overlay.addEventListener('click', () => {
        sidebar.classList.add('-translate-x-full');
        overlay.classList.add('hidden');
    });
}

// --- NAVIGATION ---
document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        // Reset Styles
        document.querySelectorAll('.nav-btn').forEach(b => {
            b.classList.remove('bg-blue-50', 'text-blue-700', 'dark:bg-blue-900/20', 'dark:text-blue-400');
            b.classList.add('text-slate-600', 'dark:text-zinc-400');
        });
        
        // Active Style
        btn.classList.remove('text-slate-600', 'dark:text-zinc-400');
        btn.classList.add('bg-blue-50', 'text-blue-700', 'dark:bg-blue-900/20', 'dark:text-blue-400');
        
        // Tab Switch
        document.querySelectorAll('.tab-content').forEach(c => c.classList.add('hidden'));
        const target = document.getElementById(`tab-${btn.dataset.tab}`);
        if(target) target.classList.remove('hidden');
        
        // Close mobile sidebar if open
        if(window.innerWidth < 768 && sidebar) {
            sidebar.classList.add('-translate-x-full');
            if(overlay) overlay.classList.add('hidden');
        }

        if(btn.dataset.tab === 'services') fetchServicesManager();
    });
});

// --- AUTH ---
async function checkAuth() {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
        // Simple check, redirect if not logged in
        const { error } = await supabase.auth.getSession();
        // Allow mock mode bypass if configured in client, else redirect
        if (!error || !error.message.includes("não configurado")) {
             window.location.href = '/admin/login.html';
        }
    }
}

document.getElementById('logout-btn')?.addEventListener('click', async () => {
    await supabase.auth.signOut();
    window.location.href = '/admin/login.html';
});

// --- ORDERS LOGIC ---
let allOrders = [];
let currentFilter = 'all';

async function fetchOrders() {
    const { data, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
    if (data) {
        allOrders = data;
        renderOrders();
        updateStats();
    }
}

// Realtime
const channel = supabase.channel('admin-orders');
if(channel) {
    channel.on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, () => {
        fetchOrders(); // Reload all to be safe and simple
    }).subscribe();
}

function renderOrders() {
    const tbody = document.getElementById('orders-table-body');
    if(!tbody) return;

    const filtered = currentFilter === 'all' ? allOrders : allOrders.filter(o => o.status === currentFilter);

    if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" class="px-6 py-8 text-center text-slate-500 text-sm">Nenhum pedido encontrado.</td></tr>`;
        return;
    }

    tbody.innerHTML = filtered.map(order => {
        const date = new Date(order.created_at).toLocaleDateString('pt-PT', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
        
        let statusBadge = '';
        if (order.status === 'pendente') statusBadge = '<span class="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-500">Pendente</span>';
        else if (order.status === 'em_andamento') statusBadge = '<span class="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-500">Em Andamento</span>';
        else if (order.status === 'concluido') statusBadge = '<span class="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500">Concluído</span>';

        const servicesNames = Array.isArray(order.services) ? order.services.map(s => s.name).join(', ') : '-';
        const isPromo = order.is_promo === true;

        return `
        <tr class="table-row-hover border-b border-slate-50 dark:border-zinc-800/50 transition-colors">
            <td class="px-6 py-4">
                <div class="font-medium text-slate-900 dark:text-white">${order.client_name}</div>
                <div class="text-xs text-slate-500">${order.client_contact}</div>
            </td>
            <td class="px-6 py-4">
                <div class="text-sm text-slate-600 dark:text-zinc-300 max-w-[200px] truncate" title="${servicesNames}">${servicesNames}</div>
                ${isPromo ? '<span class="text-[10px] text-purple-600 dark:text-purple-400 font-bold flex items-center gap-1 mt-0.5"><i data-lucide="tag" class="w-3 h-3"></i> Promo</span>' : ''}
            </td>
            <td class="px-6 py-4 text-xs text-slate-500">${date}</td>
            <td class="px-6 py-4">${statusBadge}</td>
            <td class="px-6 py-4 text-right">
                <div class="flex justify-end gap-2">
                    <select onchange="window.updateStatus(${order.id}, this.value)" class="bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-xs text-slate-700 dark:text-zinc-300 rounded px-2 py-1 outline-none cursor-pointer focus:border-blue-500">
                        <option value="pendente" ${order.status === 'pendente' ? 'selected' : ''}>Pendente</option>
                        <option value="em_andamento" ${order.status === 'em_andamento' ? 'selected' : ''}>Em Andamento</option>
                        <option value="concluido" ${order.status === 'concluido' ? 'selected' : ''}>Concluído</option>
                    </select>
                    <a href="https://wa.me/${order.client_contact.replace(/\D/g,'')}" target="_blank" class="p-1.5 bg-green-50 text-green-600 border border-green-200 rounded hover:bg-green-100 transition-colors" title="WhatsApp">
                        <i data-lucide="message-circle" class="w-4 h-4"></i>
                    </a>
                </div>
            </td>
        </tr>
        `;
    }).join('');
    
    createIcons({ icons });
}

function updateStats() {
    const today = new Date().toDateString();
    const todayCount = allOrders.filter(o => new Date(o.created_at).toDateString() === today).length;
    const pendingCount = allOrders.filter(o => o.status === 'pendente').length;

    document.getElementById('stats-today').textContent = todayCount;
    document.getElementById('stats-pending').textContent = pendingCount;
}

document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => {
            b.classList.remove('bg-slate-100', 'text-slate-900', 'dark:bg-zinc-800', 'dark:text-white');
            b.classList.add('text-slate-500', 'dark:text-zinc-400');
        });
        btn.classList.remove('text-slate-500', 'dark:text-zinc-400');
        btn.classList.add('bg-slate-100', 'text-slate-900', 'dark:bg-zinc-800', 'dark:text-white');
        currentFilter = btn.dataset.filter;
        renderOrders();
    });
});

window.updateStatus = async (id, newStatus) => {
    await supabase.from('orders').update({ status: newStatus }).eq('id', id);
    // Realtime will handle refresh
};

// --- SERVICES MANAGER ---
let allServices = [];

async function fetchServicesManager() {
    const { data } = await supabase.from('services').select(`*, sub_services (*)`).order('id', { ascending: true });
    if (data) {
        allServices = data;
        renderServicesManager();
    }
}

function renderServicesManager() {
    const container = document.getElementById('services-manager-list');
    if(!container) return;

    container.innerHTML = allServices.map(service => `
        <div class="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-lg p-4 flex flex-col h-full shadow-sm hover:shadow-md transition-shadow">
            <div class="flex items-start justify-between mb-3">
                <div class="flex items-center gap-3">
                    <div class="p-2 bg-slate-50 dark:bg-zinc-800 rounded-md text-slate-700 dark:text-zinc-300">
                        <i data-lucide="${service.icon}" class="w-5 h-5"></i>
                    </div>
                    <div>
                        <h4 class="font-semibold text-slate-900 dark:text-white text-sm">${service.title}</h4>
                        <p class="text-xs text-slate-500">${service.sub_services.length} opções</p>
                    </div>
                </div>
                <button onclick="window.editService('${service.id}')" class="text-slate-400 hover:text-blue-600 transition-colors">
                    <i data-lucide="pencil" class="w-4 h-4"></i>
                </button>
            </div>
            
            <div class="space-y-1 mt-auto pt-3 border-t border-slate-100 dark:border-zinc-800/50">
                ${service.sub_services.slice(0, 3).map(sub => `
                    <div class="flex justify-between text-xs text-slate-500 dark:text-zinc-400">
                        <span>${sub.name}</span>
                        <span class="font-mono text-slate-700 dark:text-zinc-300">${sub.price === 'Sob Consulta' ? 'Consulta' : sub.price}</span>
                    </div>
                `).join('')}
                ${service.sub_services.length > 3 ? `<div class="text-[10px] text-slate-400 text-center pt-1">+ ${service.sub_services.length - 3} outros</div>` : ''}
            </div>
        </div>
    `).join('');
    createIcons({ icons });
}

window.openNewServiceModal = () => {
    document.getElementById('edit-service-id').value = '';
    document.getElementById('service-edit-form').reset();
    document.getElementById('sub-services-container').innerHTML = '';
    window.addSubServiceField();
    document.getElementById('edit-service-modal').classList.remove('hidden');
};

window.closeEditModal = () => {
    document.getElementById('edit-service-modal').classList.add('hidden');
};

window.editService = (id) => {
    const service = allServices.find(s => s.id == id);
    if(!service) return;

    document.getElementById('edit-service-id').value = service.id;
    document.getElementById('edit-service-title').value = service.title;
    document.getElementById('edit-service-icon').value = service.icon;
    document.getElementById('edit-service-image').value = service.image;
    document.getElementById('edit-service-desc').value = service.description;

    const subContainer = document.getElementById('sub-services-container');
    subContainer.innerHTML = '';
    service.sub_services.forEach(sub => window.addSubServiceField(sub));
    document.getElementById('edit-service-modal').classList.remove('hidden');
};

window.addSubServiceField = (data = { name: '', price: '', is_promo: false }) => {
    const container = document.getElementById('sub-services-container');
    const div = document.createElement('div');
    div.className = 'flex gap-2 items-center sub-service-row bg-slate-50 dark:bg-zinc-800/50 p-2 rounded border border-slate-100 dark:border-zinc-700/50';
    
    div.innerHTML = `
        <input type="text" placeholder="Nome" value="${data.name}" class="sub-name flex-1 bg-transparent border-b border-slate-200 dark:border-zinc-700 px-2 py-1 text-xs focus:border-blue-500 outline-none text-slate-700 dark:text-zinc-200">
        <input type="text" placeholder="Preço" value="${data.price}" class="sub-price w-20 bg-transparent border-b border-slate-200 dark:border-zinc-700 px-2 py-1 text-xs focus:border-blue-500 outline-none text-slate-700 dark:text-zinc-200 text-right">
        <button type="button" onclick="this.parentElement.remove()" class="text-red-400 hover:text-red-600 p-1"><i data-lucide="trash-2" class="w-3 h-3"></i></button>
    `;
    container.appendChild(div);
    createIcons({ icons });
};

window.saveService = async () => {
    const id = document.getElementById('edit-service-id').value;
    const title = document.getElementById('edit-service-title').value;
    const icon = document.getElementById('edit-service-icon').value;
    const image = document.getElementById('edit-service-image').value;
    const description = document.getElementById('edit-service-desc').value;

    const subRows = document.querySelectorAll('.sub-service-row');
    const subServices = Array.from(subRows).map(row => ({
        name: row.querySelector('.sub-name').value,
        price: row.querySelector('.sub-price').value === 'Sob Consulta' ? 'Sob Consulta' : parseFloat(row.querySelector('.sub-price').value) || 'Sob Consulta',
        is_promo: false // Simplificado para admin
    })).filter(s => s.name);

    const serviceData = { title, icon, image, description };
    let serviceId = id;

    if (id && id !== '') {
        await supabase.from('services').update(serviceData).eq('id', id);
    } else {
        const { data } = await supabase.from('services').insert([serviceData]).select();
        if(data) serviceId = data[0].id;
    }

    if (serviceId) {
        if (id) await supabase.from('sub_services').delete().eq('service_id', serviceId);
        const subPayload = subServices.map(s => ({ service_id: serviceId, name: s.name, price: s.price, is_promo: s.is_promo }));
        if(subPayload.length > 0) await supabase.from('sub_services').insert(subPayload);
    }

    window.closeEditModal();
    fetchServicesManager();
};

window.deleteService = async () => {
    const id = document.getElementById('edit-service-id').value;
    if(!id) return;
    if(confirm('Excluir este serviço permanentemente?')) {
        await supabase.from('sub_services').delete().eq('service_id', id);
        await supabase.from('services').delete().eq('id', id);
        window.closeEditModal();
        fetchServicesManager();
    }
};

// --- PROMO ---
const promoForm = document.getElementById('promo-form');
async function loadPromoSettings() {
    const { data } = await supabase.from('promo_settings').select('*').single();
    if (data) {
        document.getElementById('promo-active').checked = data.is_active;
        document.getElementById('promo-title').value = data.title || '';
        document.getElementById('promo-discount').value = data.discount_percent || 20;
        if (data.end_date) {
            const d = new Date(data.end_date);
            d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
            document.getElementById('promo-date').value = d.toISOString().slice(0, 16);
        }
    }
}

if (promoForm) {
    promoForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = document.getElementById('save-promo-btn');
        const originalText = btn.innerHTML;
        btn.innerHTML = 'Salvando...';
        
        const payload = {
            id: 1,
            is_active: document.getElementById('promo-active').checked,
            title: document.getElementById('promo-title').value,
            discount_percent: parseInt(document.getElementById('promo-discount').value),
            end_date: new Date(document.getElementById('promo-date').value).toISOString()
        };

        await supabase.from('promo_settings').upsert(payload);
        alert('Configurações salvas com sucesso.');
        btn.innerHTML = originalText;
    });
}

// Init
checkAuth().then(() => {
    fetchOrders();
    loadPromoSettings();
});
