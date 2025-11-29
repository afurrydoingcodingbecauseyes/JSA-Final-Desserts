// Hàm hiển thị thông báo lên trang
function displayNoti(content) {
    let notification = document.getElementById('notification');
    if (notification) notification.innerHTML = content;
}

// Hàm đăng nhập tài khoản
function signIn() {
    let username = document.getElementById('usernameInput').value;
    let password = document.getElementById('passInput').value;

    // Kiểm tra dữ liệu đầu vào
    if (!username || !password) {
        displayNoti('Please fill out all the spaces')
        return;
    }

    // Lấy danh sách user từ localStorage
    let users = JSON.parse(localStorage.getItem('users') || '[]')

    // Tìm user trong danh sách đăng ký
    let user = null;
    for (let i = 0; i < users.length; i++) {
        if (users[i].username === username && users[i].password === password) {
            user = users[i];
            break;
        }
    }

    // Kiểm tra đăng nhập thành công hay không
    if (user) {
        displayNoti('Log In successful!')
        localStorage.setItem('currentUser', username);
        setTimeout(() => window.location.href = 'index.html', 1500);
    } else {
        displayNoti('Username or password is incorrect');
    }
}

// Hàm đăng ký tài khoản
function signUp() {
    console.log(11);

    // Lấy dữ liệu từ form
    let username = document.getElementById('usernameInput').value;
    let password = document.getElementById('passInput').value;
    let repeatPassword = document.getElementById('repeatPassInput').value;

    // Kiểm tra dữ liệu
    if (!username || !password || !repeatPassword) {
        displayNoti('Please fill out all the spaces')
        return;
    }

    // Kiểm tra mật khẩu có trùng nhau không
    if (password !== repeatPassword) {
        displayNoti('Passwords don\'t match!')
        return;
    }

    let users = JSON.parse(localStorage.getItem('users') || '[]');

    // Kiểm tra username đã tồn tại chưa
    let exists = false;
    for (let i = 0; i < users.length; i++) {
        if (users[i].username === username) {
            exists = true;
            break;
        }
    }
    // Nếu tồn tại thì thông báo lỗi
    if (exists) {
        displayNoti('Username already exists');
        return;
    }

    // Thêm user mới vào danh sách và lưu lại localStorage
    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));

    // Set current user and redirect
    localStorage.setItem('currentUser', username);

    // Đăng ký thành công sẽ tự vào trang chính
    displayNoti('Register successful!')
    setTimeout(() => window.location.href = 'index.html', 1500);
}