let params = new URL(document.location).searchParams;
let userName = params.get("username").toString();
let banner = document.querySelector('.bienvenido')
console.log(userName);
console.log(banner);
banner.innerHTML = `Bienevenid@ ${userName}`
