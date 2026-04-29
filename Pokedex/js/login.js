window.onload = init;

function init() {

    if(localStorage.getItem("token")) window.location.href = 'pokedex.html';

    document.querySelector('.btn-secondary').addEventListener('click', () => {
        window.location.href = 'signin.html';
    });

    document.querySelector('.btn-primary').addEventListener('click', login);
}

const login = () => {
    const mail = document.getElementById('input-mail').value;
    const pass = document.getElementById('input-password').value;

    axios({
        method: 'POST',
        url: 'http://localhost:3000/user/login',
        data: {
            user_mail: mail,
            user_password: pass
        }
    }).then(res => {
        console.log(res.data);
        if(res.data.code === 200) {
            localStorage.setItem('token', res.data.token);
            alert("Inicio de sesión exitoso");
            window.location.href = 'pokedex.html';
        }else{
            alert("Contraseña y/o correo electrónico incorrectos");
        }

    }).catch(err => {
        console.error(err);
        alert('An error occurred during login. Please try again.');
    });


}