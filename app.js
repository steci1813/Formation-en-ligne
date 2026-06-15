const STORAGE_KEY = 'formation-etude-marche-v1';
const PROGRESS_KEY = 'formation-etude-marche-progress-v1';

const defaultData = {
  course: {
    title: 'Étude de marché',
    subtitle: 'Comprendre son marché, valider son idée et construire une offre cohérente avant de se lancer.',
    instructor: 'Formation en ligne',
    whatsapp: '',
    welcome: "Bonjour à tous 👋\n\nBienvenue dans ce nouveau cours en ligne consacré à l’étude de marché. Après le marketing digital, on passe maintenant à une étape essentielle : comprendre son marché, ses clients, ses concurrents et les opportunités avant de prendre des décisions.\n\nTous les cours, ressources et livrables seront désormais organisés ici. Pensez à consulter chaque module, suivre les consignes et déposer vos livrables dans les délais."
  },
  modules: [
    {
      id: uid(),
      title: 'Introduction à l’étude de marché',
      objective: 'Comprendre pourquoi une étude de marché est indispensable avant de lancer une activité, un produit ou un service.',
      duration: '1h15',
      status: 'Publié',
      videoUrl: '',
      content: ['Définition simple d’une étude de marché', 'Différence entre intuition, hypothèse et donnée', 'Les erreurs fréquentes au lancement d’un projet'],
      resources: [{ title: 'Modèle de fiche idée', url: '' }],
      deliverable: 'Fiche idée + premières hypothèses'
    },
    {
      id: uid(),
      title: 'Définir son offre et ses hypothèses',
      objective: 'Clarifier ce que l’on veut vendre, à qui, pourquoi et avec quelle promesse.',
      duration: '1h30',
      status: 'Publié',
      videoUrl: '',
      content: ['Problème client', 'Solution proposée', 'Hypothèses à vérifier', 'Critères de validation'],
      resources: [{ title: 'Canvas de validation d’idée', url: '' }],
      deliverable: 'Tableau des hypothèses à tester'
    },
    {
      id: uid(),
      title: 'Identifier la cible et construire un persona',
      objective: 'Passer d’une cible vague à un profil client concret et exploitable.',
      duration: '1h30',
      status: 'Publié',
      videoUrl: '',
      content: ['Segmentation', 'Persona', 'Besoins, freins, motivations', 'Situations d’achat'],
      resources: [{ title: 'Template persona', url: '' }],
      deliverable: 'Persona principal'
    },
    {
      id: uid(),
      title: 'Analyser la concurrence',
      objective: 'Comprendre les acteurs déjà présents et identifier une place claire sur le marché.',
      duration: '1h45',
      status: 'Publié',
      videoUrl: '',
      content: ['Concurrents directs et indirects', 'Prix, offres, positionnement', 'Forces et faiblesses', 'Opportunités de différenciation'],
      resources: [{ title: 'Tableau benchmark concurrence', url: '' }],
      deliverable: 'Benchmark de 3 à 5 concurrents'
    },
    {
      id: uid(),
      title: 'Construire un questionnaire d’enquête',
      objective: 'Rédiger des questions utiles pour collecter des réponses fiables auprès de la cible.',
      duration: '1h30',
      status: 'Publié',
      videoUrl: '',
      content: ['Questions ouvertes et fermées', 'Biais à éviter', 'Structure du questionnaire', 'Choix des canaux de diffusion'],
      resources: [{ title: 'Exemple de questionnaire', url: '' }],
      deliverable: 'Questionnaire prêt à diffuser'
    },
    {
      id: uid(),
      title: 'Synthèse et décision finale',
      objective: 'Transformer les informations collectées en décision : poursuivre, ajuster ou abandonner.',
      duration: '2h00',
      status: 'Brouillon',
      videoUrl: '',
      content: ['Lire les résultats', 'Identifier les signaux forts', 'Ajuster son offre', 'Présenter une synthèse claire'],
      resources: [{ title: 'Plan de synthèse finale', url: '' }],
      deliverable: 'Rapport synthèse étude de marché'
    }
  ],
  students: [],
  submissions: []
};

let state = loadState();
let progress = loadProgress();

const els = {
  brandTitle: document.getElementById('brandTitle'),
  courseTitle: document.getElementById('courseTitle'),
  courseSubtitle: document.getElementById('courseSubtitle'),
  welcomeMessage: document.getElementById('welcomeMessage'),
  moduleCount: document.getElementById('moduleCount'),
  livrableCount: document.getElementById('livrableCount'),
  studentCount: document.getElementById('studentCount'),
  modules: document.getElementById('modules'),
  adminModules: document.getElementById('adminModules'),
  studentTable: document.getElementById('studentTable'),
  submissionLivrable: document.getElementById('submissionLivrable'),
  searchInput: document.getElementById('searchInput'),
  statusFilter: document.getElementById('statusFilter'),
  courseForm: document.getElementById('courseForm'),
  moduleForm: document.getElementById('moduleForm'),
  studentForm: document.getElementById('studentForm'),
  submissionForm: document.getElementById('submissionForm'),
  progressFill: document.getElementById('progressFill'),
  progressText: document.getElementById('progressText'),
  toast: document.getElementById('toast')
};

function uid() {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);
}

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return structuredClone(defaultData);
  try {
    return mergeWithDefaults(JSON.parse(saved));
  } catch {
    return structuredClone(defaultData);
  }
}

function mergeWithDefaults(data) {
  return {
    course: { ...defaultData.course, ...(data.course || {}) },
    modules: Array.isArray(data.modules) ? data.modules : defaultData.modules,
    students: Array.isArray(data.students) ? data.students : [],
    submissions: Array.isArray(data.submissions) ? data.submissions : []
  };
}

function loadProgress() {
  try { return JSON.parse(localStorage.getItem(PROGRESS_KEY)) || {}; }
  catch { return {}; }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state, null, 2));
}

function saveProgress() {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress, null, 2));
}

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function nlToList(value = '') {
  return String(value).split('\n').map(item => item.trim()).filter(Boolean);
}

function parseResources(value = '') {
  return nlToList(value).map(line => {
    const [title, url = ''] = line.split('|').map(part => part.trim());
    return { title, url };
  });
}

function showToast(message) {
  els.toast.textContent = message;
  els.toast.classList.add('show');
  setTimeout(() => els.toast.classList.remove('show'), 2200);
}

function render() {
  renderCourse();
  renderModules();
  renderAdminModules();
  renderSubmissionsSelect();
  renderStudents();
  renderProgress();
}

function renderCourse() {
  const { course } = state;
  document.title = `${course.title} — Formation en ligne`;
  els.brandTitle.textContent = course.title;
  els.courseTitle.textContent = course.title;
  els.courseSubtitle.textContent = course.subtitle;
  els.welcomeMessage.textContent = course.welcome;
  els.moduleCount.textContent = state.modules.length;
  els.livrableCount.textContent = state.modules.filter(module => module.deliverable).length;
  els.studentCount.textContent = state.students.length;

  els.courseForm.title.value = course.title;
  els.courseForm.subtitle.value = course.subtitle;
  els.courseForm.instructor.value = course.instructor;
  els.courseForm.whatsapp.value = course.whatsapp;
  els.courseForm.welcome.value = course.welcome;
}

function filteredModules() {
  const q = (els.searchInput.value || '').toLowerCase().trim();
  const status = els.statusFilter.value;
  return state.modules.filter(module => {
    const haystack = [module.title, module.objective, module.deliverable, ...(module.content || []), ...(module.resources || []).map(r => r.title)].join(' ').toLowerCase();
    const matchesQ = !q || haystack.includes(q);
    const matchesStatus = status === 'all' || module.status === status;
    return matchesQ && matchesStatus;
  });
}

function renderModules() {
  const modules = filteredModules();
  if (!modules.length) {
    els.modules.innerHTML = '<div class="empty-state">Aucun module trouvé.</div>';
    return;
  }
  els.modules.innerHTML = modules.map((module, index) => {
    const checked = progress[module.id] ? 'checked' : '';
    const content = (module.content || []).slice(0, 4).map(item => `<li>${escapeHtml(item)}</li>`).join('');
    const resources = (module.resources || []).filter(r => r.title).map(resource => {
      const title = escapeHtml(resource.title);
      return resource.url ? `<a class="link-btn" href="${escapeHtml(resource.url)}" target="_blank" rel="noreferrer">${title}</a>` : `<span class="muted">${title}</span>`;
    }).join(' · ');
    const video = module.videoUrl ? `<a class="btn ghost" href="${escapeHtml(module.videoUrl)}" target="_blank" rel="noreferrer">Voir la vidéo</a>` : '';
    return `
      <article class="course-card">
        <div class="card-top">
          <span class="badge ${module.status === 'Brouillon' ? 'draft' : ''}">${escapeHtml(module.status)}</span>
          <span class="muted">Module ${index + 1} · ${escapeHtml(module.duration || 'Durée libre')}</span>
        </div>
        <h3>${escapeHtml(module.title)}</h3>
        <p>${escapeHtml(module.objective)}</p>
        ${content ? `<ul>${content}</ul>` : ''}
        ${module.deliverable ? `<p><strong>Livrable :</strong> ${escapeHtml(module.deliverable)}</p>` : ''}
        ${resources ? `<p><strong>Ressources :</strong><br>${resources}</p>` : ''}
        <div class="card-footer">
          <label class="check-row"><input type="checkbox" data-progress-id="${module.id}" ${checked}> Marquer comme terminé</label>
          ${video}
        </div>
      </article>`;
  }).join('');
}

function renderProgress() {
  const published = state.modules.filter(module => module.status === 'Publié');
  const done = published.filter(module => progress[module.id]).length;
  const pct = published.length ? Math.round((done / published.length) * 100) : 0;
  els.progressFill.style.width = `${pct}%`;
  els.progressText.textContent = `${pct}%`;
}

function renderAdminModules() {
  if (!state.modules.length) {
    els.adminModules.innerHTML = '<div class="empty-state">Aucun module. Ajoute ton premier cours.</div>';
    return;
  }
  els.adminModules.innerHTML = state.modules.map((module, index) => `
    <div class="admin-item">
      <div>
        <h4>${index + 1}. ${escapeHtml(module.title)}</h4>
        <p>${escapeHtml(module.objective)}</p>
        <p><strong>${escapeHtml(module.status)}</strong> · ${escapeHtml(module.duration || 'Durée libre')} · Livrable : ${escapeHtml(module.deliverable || '—')}</p>
      </div>
      <div class="icon-actions">
        <button class="mini-btn" data-toggle-status="${module.id}">${module.status === 'Publié' ? 'Mettre en brouillon' : 'Publier'}</button>
        <button class="mini-btn" data-duplicate="${module.id}">Dupliquer</button>
        <button class="mini-btn danger" data-delete-module="${module.id}">Supprimer</button>
      </div>
    </div>`).join('');
}

function renderSubmissionsSelect() {
  const deliverables = state.modules.filter(module => module.deliverable);
  els.submissionLivrable.innerHTML = deliverables.map(module => `<option value="${module.id}">${escapeHtml(module.deliverable)}</option>`).join('');
}

function renderStudents() {
  const rows = state.students.map(student => {
    const latest = [...state.submissions].reverse().find(item => item.studentName.toLowerCase() === student.name.toLowerCase());
    const done = Number(student.progress || 0);
    return `<tr>
      <td><strong>${escapeHtml(student.name)}</strong></td>
      <td>${escapeHtml(student.contact || '—')}</td>
      <td>${done}%</td>
      <td>${latest ? `${escapeHtml(latest.deliverableTitle)}<br><small>${escapeHtml(latest.createdAt)}</small>` : '—'}</td>
      <td><button class="mini-btn danger" data-delete-student="${student.id}">Supprimer</button></td>
    </tr>`;
  }).join('');

  const submissionOnly = state.submissions
    .filter(item => !state.students.some(student => student.name.toLowerCase() === item.studentName.toLowerCase()))
    .map(item => `<tr>
      <td><strong>${escapeHtml(item.studentName)}</strong><br><small>Dépôt non relié à la liste élèves</small></td>
      <td>${escapeHtml(item.contact || '—')}</td>
      <td>—</td>
      <td>${escapeHtml(item.deliverableTitle)}<br><small>${escapeHtml(item.createdAt)}</small></td>
      <td>—</td>
    </tr>`).join('');

  els.studentTable.innerHTML = rows + submissionOnly || '<tr><td colspan="5" class="muted">Aucun élève ni dépôt pour le moment.</td></tr>';
}

function downloadFile(filename, text) {
  const blob = new Blob([text], { type: 'application/json;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function setActiveView(viewId) {
  document.querySelectorAll('.view').forEach(view => view.classList.remove('active-view'));
  document.getElementById(viewId).classList.add('active-view');
  document.querySelectorAll('.nav-link').forEach(btn => btn.classList.toggle('active', btn.dataset.view === viewId));
}

document.querySelectorAll('.nav-link').forEach(btn => {
  btn.addEventListener('click', () => setActiveView(btn.dataset.view));
});

els.searchInput.addEventListener('input', renderModules);
els.statusFilter.addEventListener('change', renderModules);

document.addEventListener('change', event => {
  const id = event.target.dataset.progressId;
  if (!id) return;
  progress[id] = event.target.checked;
  saveProgress();
  renderProgress();
});

els.courseForm.addEventListener('submit', event => {
  event.preventDefault();
  const form = new FormData(els.courseForm);
  state.course = {
    title: form.get('title').trim() || defaultData.course.title,
    subtitle: form.get('subtitle').trim(),
    instructor: form.get('instructor').trim(),
    whatsapp: form.get('whatsapp').trim(),
    welcome: form.get('welcome').trim()
  };
  saveState();
  render();
  showToast('Infos du cours sauvegardées');
});

els.moduleForm.addEventListener('submit', event => {
  event.preventDefault();
  const form = new FormData(els.moduleForm);
  state.modules.push({
    id: uid(),
    title: form.get('title').trim(),
    objective: form.get('objective').trim(),
    content: nlToList(form.get('content')),
    duration: form.get('duration').trim(),
    status: form.get('status'),
    videoUrl: form.get('videoUrl').trim(),
    resources: parseResources(form.get('resources')),
    deliverable: form.get('deliverable').trim()
  });
  saveState();
  els.moduleForm.reset();
  render();
  showToast('Module ajouté');
});

els.studentForm.addEventListener('submit', event => {
  event.preventDefault();
  const form = new FormData(els.studentForm);
  state.students.push({
    id: uid(),
    name: form.get('name').trim(),
    contact: form.get('contact').trim(),
    progress: 0
  });
  saveState();
  els.studentForm.reset();
  render();
  showToast('Élève ajouté');
});

els.submissionForm.addEventListener('submit', event => {
  event.preventDefault();
  const form = new FormData(els.submissionForm);
  const module = state.modules.find(item => item.id === form.get('livrableId'));
  state.submissions.push({
    id: uid(),
    studentName: form.get('studentName').trim(),
    contact: form.get('contact').trim(),
    livrableId: form.get('livrableId'),
    deliverableTitle: module?.deliverable || 'Livrable',
    submissionText: form.get('submissionText').trim(),
    createdAt: new Date().toLocaleString('fr-FR')
  });

  const existing = state.students.find(student => student.name.toLowerCase() === form.get('studentName').trim().toLowerCase());
  if (!existing) {
    state.students.push({ id: uid(), name: form.get('studentName').trim(), contact: form.get('contact').trim(), progress: 0 });
  }

  saveState();
  els.submissionForm.reset();
  render();
  showToast('Dépôt enregistré');
});

document.getElementById('copyStudentMessage').addEventListener('click', async () => {
  const text = `${state.course.welcome}\n\nLien du site : [à remplacer par ton lien]\n${state.course.whatsapp ? `Groupe WhatsApp : ${state.course.whatsapp}` : ''}`.trim();
  await navigator.clipboard.writeText(text);
  showToast('Message copié');
});

document.getElementById('exportData').addEventListener('click', () => {
  downloadFile('formation-etude-marche-data.json', JSON.stringify(state, null, 2));
});

document.getElementById('importData').addEventListener('change', event => {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      state = mergeWithDefaults(JSON.parse(reader.result));
      saveState();
      render();
      showToast('Données importées');
    } catch {
      showToast('Fichier JSON invalide');
    }
  };
  reader.readAsText(file);
});

document.getElementById('resetData').addEventListener('click', () => {
  if (!confirm('Réinitialiser toutes les données locales ?')) return;
  state = structuredClone(defaultData);
  progress = {};
  saveState();
  saveProgress();
  render();
  showToast('Site réinitialisé');
});

els.adminModules.addEventListener('click', event => {
  const toggleId = event.target.dataset.toggleStatus;
  const duplicateId = event.target.dataset.duplicate;
  const deleteId = event.target.dataset.deleteModule;

  if (toggleId) {
    const module = state.modules.find(item => item.id === toggleId);
    module.status = module.status === 'Publié' ? 'Brouillon' : 'Publié';
    saveState();
    render();
    showToast('Statut modifié');
  }

  if (duplicateId) {
    const module = state.modules.find(item => item.id === duplicateId);
    state.modules.push({ ...structuredClone(module), id: uid(), title: `${module.title} — copie`, status: 'Brouillon' });
    saveState();
    render();
    showToast('Module dupliqué');
  }

  if (deleteId) {
    if (!confirm('Supprimer ce module ?')) return;
    state.modules = state.modules.filter(item => item.id !== deleteId);
    delete progress[deleteId];
    saveState();
    saveProgress();
    render();
    showToast('Module supprimé');
  }
});

els.studentTable.addEventListener('click', event => {
  const id = event.target.dataset.deleteStudent;
  if (!id) return;
  state.students = state.students.filter(student => student.id !== id);
  saveState();
  render();
  showToast('Élève supprimé');
});

render();
