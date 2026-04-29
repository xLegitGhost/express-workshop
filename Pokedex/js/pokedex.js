window.onload = init;
const API_URL = 'http://localhost:3000/';
let headers = {}

function init() {
    if(!localStorage.getItem('token')) {
        alert("No has iniciado sesión, serás redirigido a la página de inicio de sesión");
        window.location.href = 'login.html';
    }

    const token = localStorage.getItem('token');
    headers = {
        headers: {
            'Authorization': `Bearer ${token}` 
        }
    }

    loadPokemon(token);

}

const loadPokemon = async (token) => {
    await axios.get(API_URL + "pokemon", headers).then(res => {
        console.log(res.data);
        displayPokemon(res.data.data);
    }).catch(err => {
        console.error("Error: " + err);
        alert('Error getting pokemon data. Please try again.');
    });
}

function displayPokemon(pokemon) {
    let body = document.querySelector('body');
    for(let i = 0; i < 10; i++) {
        body.innerHTML += 
        `
        <h3>Pokemon ID: ${pokemon[i].pok_id}<h3/>
        <h3>Nombre: ${pokemon[i].pok_name}<h3/>
        `
    }
}