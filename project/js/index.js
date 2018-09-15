import '../sass/index.scss';

const navToggler = document.querySelector('.navbaricon');
const navb = document.getElementById('nav');
const logo = document.getElementById('logo');

eventListeners();
function eventListeners(){
   navToggler.addEventListener('click', openNav);
}

function openNav(e){
   e.preventDefault();
   if (navb.classList.contains('open')){

   navb.classList.remove('open');
   logo.style.display = 'block';

   } else{
   logo.style.display = 'none';
   navb.classList.add('open');

   }
}
