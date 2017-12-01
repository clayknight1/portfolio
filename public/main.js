function hamburgerHandler() {
    document.getElementById('side-nav').style.right = '0';
}

function closeNavHandler() {
    document.getElementById('side-nav').style.right = '-400px';
}

document.getElementById('hamburger').onclick = hamburgerHandler;
document.getElementById('close-nav').onclick = closeNavHandler;
