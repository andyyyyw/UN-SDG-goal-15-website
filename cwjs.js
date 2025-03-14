let intro = document.querySelector('.intro');
let logoSpan = document.querySelectorAll('.logo');

window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        logoSpan.forEach((span, idx) => {
            setTimeout(() => {
                span.classList.add('active');
            }, (idx + 1) * 200);
        });
        setTimeout(() => {
            logoSpan.forEach((span, idx) => {
                setTimeout(() => {
                    span.classList.remove('active');
                    intro.classList.add('fade');
                }, (idx + 1) * 50);
            });
        }, 3000);
        setTimeout(() => {
            intro.style.top = '-100vh';
        }, 3300);
    });
});
document.addEventListener("DOMContentLoaded", function() {
    var catImg = document.querySelector('.cat-img');
    

    catImg.addEventListener('animationend', function() {

        setTimeout(function() {
            catImg.style.animation = 'catPopDown 1s forwards';
        }, 2000);
    });


    catImg.style.animation = 'catPopUp 1s forwards';
});