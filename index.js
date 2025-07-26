const API_URL = 'https://rickandmortyapi.com/api/character';
let currentPage = 1;
let totalPages = 1;

const charactersContainer = document.getElementById('charactersContainer');
const message = document.getElementById('message');
const searchBtn = document.getElementById('searchBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

async function fetchCharacters(page = 1) {
  message.textContent = 'Cargando...';
  message.classList.remove('hidden');
  charactersContainer.innerHTML = '';

  const name = document.getElementById('searchInput').value.trim();
  const status = document.getElementById('statusFilter').value;
  const gender = document.getElementById('genderFilter').value;

  const params = new URLSearchParams({ page, name, status, gender });

try {
  const res = await fetch(`${API_URL}?${params}`);
  const data = await res.json();

  totalPages = data.info.pages;
  renderCharacters(data.results);
  updateButtons();

  message.classList.add('hidden');
} catch (err) {
  message.classList.add('hidden');
  showToast('No se encontraron resultados o hubo un error en la API.');
}

}

function renderCharacters(characters) {
  charactersContainer.innerHTML = characters.map(character => `
    <div class="bg-white/10 backdrop-blur-lg rounded-xl p-4 shadow-md border border-white/10">
      <img src="${character.image}" alt="${character.name}" class="rounded-xl w-full h-48 object-cover mb-4" />
      <h3 class="text-xl font-bold">${character.name}</h3>
      <p class="text-sm text-green-200">${character.status} - ${character.species}</p>
    </div>
  `).join('');
}

function updateButtons() {
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;
}

// Eventos
searchBtn.addEventListener('click', () => {
  currentPage = 1;
  fetchCharacters(currentPage);
});

prevBtn.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    fetchCharacters(currentPage);
  }
});

nextBtn.addEventListener('click', () => {
  if (currentPage < totalPages) {
    currentPage++;
    fetchCharacters(currentPage);
  }
});

function showToast(messageText) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');

  toastMsg.textContent = messageText;
  toast.classList.remove('opacity-0');
  toast.classList.add('opacity-100');

  setTimeout(() => {
    toast.classList.remove('opacity-100');
    toast.classList.add('opacity-0');
  }, 3000); // dura 3 segundos
}



// Inicial
fetchCharacters();
