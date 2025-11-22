function displayNoti(content){
    let notification = document.getElementById('notification');
    notification.innerHTML = content
}

function signIn() {
    let username = document.getElementById('usernameInput').value;
    let password = document.getElementById('passInput').value;

    if (!username || !password){
        displayNoti('Please fill out all the spaces')
        return;
    }

    let users = JSON.parse(localStorage.getItem('users') || '[]')

    let user = null;
    for (let i = 0; i < users.length; i++){
        if (users[i].username === username && users[i].password === password){
            user = users[i];
            break;
        }
    }
    
    if (user){
        displayNoti('Log In successful!')
        localStorage.setItem('currentUser', username);
        setTimeout(() => window.location.href = 'index.html', 1500);
    } else{
        displayNoti('Username or password is incorrect');
    }
}

function signUp() {
    console.log(11);
    
    let username = document.getElementbyId('usernameInput').value;
    let password = document.getElementById('passInput').value;
    let repeatPassword = document.getElementById('repeatPassInput').value;

    if (!username || !password || !repeatPassword){
        displayNoti('Please fill out all the spce')
        return;
    }
    
    if (password !== repeatPassword){
        displayNoti('Password don\'t match!')
        return;
    }

    let users = JSON.parse(localStorage.getItem('users') || '[]');

    let exists = false;
    for (let i = 0; i < users.length; i++){
        if (users[i].username === username){
            exists = true;
            break;
        }
    }
    let passwordExists = false;
    let userPass = null;
    for (let i = 0; i < users.length; i++){
        if (users[i].password === password){
            passwordExists = true;
            userPass = users[i].username;
            break;
        }
    }
    if (exists){
        displayNoti('Username already exists');
        return;
    }
    if (passwordExists){
        displayNoti('Password already used by' + userPass)
    }

    users.push({username,password});
    localStorage.setItem('users', JSON.stringify(users));

    displayNoti('Register successful!')
}