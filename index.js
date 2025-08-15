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
    getRoute(type, champions).then(championsByType => {
        console.log(`Campeões do tipo ${type}:`, championsByType);
    });
}

async function getRoute(type, champions) {
    const typechampions = champions.filter(champion => champion.roles.includes(type));
    return typechampions;
}
        

    

        