// registration auth
function store(){

    var name = document.getElementById('name');
    var password = document.getElementById('password');

    if(name.value.length == 0){
        alert('Lütfen email girin!');

    }else if(password.value.length == 0){
        alert('Lütfen şifre girin!');

    }else if(name.value.length == 0 && password.value.length == 0){
        alert('Lütfen email ve şifre girin!');

    }else{
        localStorage.setItem('name', name.value);
        localStorage.setItem('password', password.value);
        // alert('Hesabınız oluşturuldu.');
        window.location.href = '/index.html';
    }
}

//checking auth
function check(){
    var storedName = localStorage.getItem('name');
    var storedPassword = localStorage.getItem('password');

    var userName = document.getElementById('userName');
    var password = document.getElementById('password');

    if(userName.value == storedName && password.value == storedPassword){
        alert('Giriş yaptınız.');
        window.location.href = '/index.html';
    }else{
        alert('Giriş hatası!');
    }
}