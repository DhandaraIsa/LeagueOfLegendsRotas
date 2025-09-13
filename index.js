$(document).ready(async function() {
    const champions = await getChampions();

});

async function getChampions() {
    let apiUrl = 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/pt_br/v1/champion-summary.json';
    let championsList = [];
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        championsList = data.slice(1);
    } catch (error) {
        console.error('Erro ao buscar dados dos campeões:', error);
    }
    return championsList;
}

async function callchampions(type) {
    const champions = await getChampions();
    const championsByType = await getRoute(type, champions);
    listChampions(championsByType);
    
    // getRoute(type, champions).then(championsByType => {
    //     console.log(`Campeões do tipo ${type}:`, championsByType);
    // });
}

async function getRoute(type, champions) {
    const typechampions = champions.filter(champion => champion.roles.includes(type));
    return typechampions;
}

async function listChampions(champions) {
    let card = $('.card-champions');
    card.empty(); // Limpa os cards existentes
    const url = 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/';

    champions.forEach(champion => {
        let cardHtml = `
            <div class="card">
                <img src="${url}${champion.id}.png" alt="${champion.name}">   
                <div class="">
                    <p>${champion.name}</p>
                    <p>${champion.description}</p>
                </div>
            </div>
        `;
        card.append(cardHtml);
        
    });
}

 $('#searchInput').on('keyup', function() {
    var valorInput = $(this).val();
    var quantidadeCaracteres = valorInput.length;
    $('#contador').text(quantidadeCaracteres);
    if (quantidadeCaracteres >= 3) {
        searchChampion(valorInput);
    }
  });

  async function searchChampion(name) {
    const champions = await getChampions();
    const filteredChampions = filterChampionsByName(name, champions);
    listChampions(filteredChampions);

  }

function filterChampionsByName(query, champions) {
    return champions.filter(champion =>
        champion.name.toLowerCase().includes(query.toLowerCase())
    );
}

        