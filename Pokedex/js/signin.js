window.onload = init;

function init() {
    document.querySelector('.btn-secondary').addEventListener('click', () => {
        window.location.href = 'login.html';
    });

    document.querySelector('.btn-primary').addEventListener('click', signin);
}

const signin = () => {
    const mail = document.getElementById('input-mail').value;
    const name = document.getElementById('input-name').value;
    const pass = document.getElementById('input-password').value;

    console.log(mail, name, pass);

    axios({
        method: 'POST',
        url: 'http://localhost:3000/user/signin',
        data: {
            user_name: name,
            user_mail: mail,
            user_password: pass
        }
    }).then(res => {
        console.log(res);
        window.location.href = 'login.html';
    }).catch(err => {
        console.error(err);
        alert('An error occurred during registration. Please try again.');
    });


}