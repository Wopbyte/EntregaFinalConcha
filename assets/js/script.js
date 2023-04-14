// bPerm valor del banner permanente - bProm valor del banner promocional - gGemas valor de gemas regaladas
const bPerm = 2000;
const bProm = 4000;
const gGemas = 6000;

//----------Creacion de clases----------

class Personaje {
    constructor(nombre, rareza, tipo, id, img) {
        this.nombre = nombre;
        this.rareza = rareza;
        this.tipo = tipo;
        this.id = id;
        this.img = img;
    }


    asignarId(array) {
        this.id = array.length;
    }
}

class PersonajeSesion {
    constructor(nombre, rareza, tipo, id, img) {
        this.nombre = nombre;
        this.rareza = rareza;
        this.tipo = tipo;
        this.id = id;
        this.img = img;
    }


    asignarId(array) {
        this.id = array.length;
    }
}

class Usuario {
    constructor(nombre, password, gemas, id) {
        this.nombre = nombre;
        this.password = password;
        this.gemas = parseInt(gemas);
        this.id = id;
        this.pjs = [];  //this.pjs = {};

    }

    agregarPj(personaje) {//(nombre, rareza, tipo, id, img) 
        //const nuevoPersonaje = new Personaje(array.nombre, array.rareza, array.tipo, array.id);
        //this.pjs.push(nuevoPersonaje); //this.pjs.push(nombre, rareza, tipo, id, img);
        //this.pjs.push(personaje); 
        //this.pjs[personaje.nombre, personaje.rareza, personaje.tipo, personaje.id, personaje.img] = personaje;
        this.pjs.push(personaje);
    }


    asignarId(array) {
        this.id = array.length;
    }

}

//----------Fin de Creacion de clases----------


//----------Relleno de clases-----------------

const personajes = [

    new Personaje('Low Demon', 'C', 'Fuego', 1, "./assets/img/lowDemon.png"),
    new Personaje('Wet Demon', 'R', 'Agua', 2, "./assets/img/wetDemon.png"),
    new Personaje('Human', 'C', 'Fuego', 3, "./assets/img/human.png"),
    new Personaje('Dark God ', 'UR', 'Oscuridad', 4, "./assets/img/darkGod.png"),
    new Personaje('Void Horn', 'SSR', 'Vacio', 5, "./assets/img/voidHorn.png")

]

const usuarios = [

    new Usuario('coder', '123445', 10000, 1),
    new Usuario('user1', '123', 0, 2),
    new Usuario('user2', '456', 2000, 3)

]

const mPersonaje = []// Array "Trampa" para mostrar los personajes de la sesion, ya que esta solo guarda el ultimo personaje y no el array completo

console.log(usuarios)
console.log(personajes)

//----------Fin de Relleno de clases-----------------


//----------Inicializar elementos DOM-----------------


const uLogin = document.getElementById('userLogin'),
    pLogin = document.getElementById('passLogin'),
    recordar = document.getElementById('recordarme'),
    uRegis = document.getElementById('userRegis'),
    pRegis = document.getElementById('passRegis'),
    btnLogin = document.getElementById('btnLogin'),
    btnRegis = document.getElementById('btnRegister'),
    btnOut = document.getElementById('btnLogout'),
    btnBanner = document.getElementById('btnBanPerm'),
    btnPj = document.getElementById('btnPersonajes'),
    btnElim = document.getElementById('btnEPjBanner'),
    btnBannerP = document.getElementById('btnBanProm'),
    cargarGemas = document.getElementById('cargaGemas'),
    btnCarga = document.getElementById('btnRecarga'),
    btnMostrar = document.getElementById('btnPjBanner'),
    btnMostrarP = document.getElementById('btnPjBannerP'),
    modalLogin = document.getElementById('modalLogin'),
    modalRegister = document.getElementById('modalRegister'),
    modalGemas = document.getElementById('modalGemas'),
    modalLog = new bootstrap.Modal(modalLogin),
    modalReg = new bootstrap.Modal(modalRegister),
    modalG = new bootstrap.Modal(modalGemas),
    uGemas = document.getElementById('pCurrency'),
    contMenu = document.getElementById('userMenu'),
    toggles = document.querySelectorAll('.toggles');


//


//----------Creacion de Funciones-----------------

//--------Funciones de sesiones---------
function guardarSesionUsuario(array, storage) {
    const usuario = new Usuario(array.nombre, array.password, array.gemas, array.id)
    storage.setItem('usuario', JSON.stringify(usuario))
    return storage;
}
//Guardamos los datos de sesion de personajes del usuario
function guardarSesionPersonajes(array, storage) {
    const personaje = new Personaje(array.nombre, array.rareza, array.tipo, array.id, array.img)
    storage.setItem('personaje', JSON.stringify(personaje))
    return storage;
}

//------------Recupera los datos de sesion del usuario-------------
function recuperarUsuario(storage) {
    let logUser = JSON.parse(storage.getItem('usuario'));
    return logUser;
}

//------------Recupera los datos de personaje de la sesion del usuario-------------
function recuperarPersonaje(storage) {

    userPjs = JSON.parse(storage.getItem('personaje'));
    return userPjs.pjs;
}


//-----------------Verifica si el usuario queda con la sesion abierta o no---------------
function sesionAbierta(usuario) {
    if (usuario) {
        mGemas(usuario);
        mostrarUser(toggles, 'd-none');
    }
}

sesionAbierta(recuperarUsuario(localStorage));

function mostrarUser(array, clase) {
    array.forEach(element => {
        element.classList.toggle(clase);
    });
}

function noSesion() {
    localStorage.clear();
    sessionStorage.clear();
}

//-------Fin de las sesiones--------

function loginGame() //Funcion para ingresar al menu de juego
{
    let indice = -1;
    indice = usuarios.findIndex(u => u.nombre === uLogin.value && u.password === pLogin.value);//guarda el indice de donde se encontro el usuario si no existe sigue en -1
    if (indice === -1) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Al parecer el usuario o contraseña son incorrectos'
        })
        uLogin.value = '';
        pLogin.value = '';
    }
    if (indice !== -1) {
        let timerInterval
        Swal.fire({
            title: 'Bienvenido/da ' + usuarios[indice].nombre,
            html: 'Estas siendo redireccionado, espera.....',
            timer: 1500,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading()
            },
            willClose: () => {
                clearInterval(timerInterval)
            }
        }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
                console.log('I was closed by the timer')
                modalLog.hide();
                //Muestro la informacion para usuarios logueados
                mostrarUser(toggles, 'd-none');
                limpiarHtml();
            }
        })

        guardarSesionUsuario(usuarios[indice], localStorage);
        mGemas(usuarios[indice]);
        //Se cierra la ventana de login

    }
    return { exito: indice !== -1, indice };
}


function nuevoUsuario() { //Crea un nuevo usuario

    let indice = -1;
    indice = usuarios.findIndex(u => u.nombre === uRegis.value);
    if (indice === -1) {

        const usuario = new Usuario(uRegis.value, pRegis.value, gGemas);
        usuarios.push(usuario);
        usuario.asignarId(usuarios);
        console.log(usuarios);
        Swal.fire("Usuario creado. Se le regalaron 6000 gemas!!")
        //Se cierra la ventana del registro
        modalReg.hide();
    }
    else {

        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Al parecer el usuario ya existe'
        })
        uRegis.value = "";
        pRegis.value = "";

    }


}

function limpiarHtml()
{
    contMenu.innerHTML = '';
}

function abonar(usuario) { //funcion para abonar gemas

    limpiarHtml();
    if (Number.isNaN(cargarGemas.value)) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El valor ingresado no es un numero'
        })
        cargarGemas.value = '';
    }
    else {
        usuario.gemas = parseInt(usuario.gemas) + parseInt(cargarGemas.value);
        Swal.fire("Carga realizada! Favor de refrescar la pagina")
        cargarGemas.value = '';
    }
    modalG.hide();
    mGemas(recuperarUsuario(localStorage));
    localStorage.setItem('usuario', JSON.stringify(usuario));

};

async function dataBannerProm() {
    const response = await fetch('./assets/js/data.json');
    const datos = await response.json();
    return await datos;
}

function gacha() { //devuelve un random del array personajes
    const random = Math.floor(Math.random() * personajes.length);
    return personajes[random];
}

async function gachaProm() { //devuelve un random del array personajes
    let pjProm = await dataBannerProm();
    const random = Math.floor(Math.random() * pjProm.length);
    return pjProm[random];
}

function mGemas(user) //Muestra las gemas que se tienen
{
    uGemas.innerHTML = ``;
    uGemas.innerHTML = `<span>${user.gemas}</span>`;
}



// Muestra los personajes del usuario. 
function mostrarPersonajes() { //Revisar el guardado de los personajes funcion bPermanente, ya que solo muestra el ultimo personaje comprado

    if (mPersonaje.length == 0) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Al parecer no tienes ningun personaje!'
        })
    }
    else {
        //let cont = 0;
        limpiarHtml();
        mPersonaje.forEach(personaje => {
            let html = `<div class="card cardGacha" id="tarjeta${personaje.nombre}">
                    <img src="${personaje.img}" alt="${personaje.nombre}" class="card-img-bottom" id="imgPersonaje">
                </div>`;
            console.log("Revisando el html: " + html)
            contMenu.innerHTML += html;
            /*cont += 1;
            console.log("contador: "+ cont)
            if(cont == 6)
            {
                let salto = document.createElement("br");
                contMenu.appendChild(salto);
                console.log("Revisando el html2: "+ contMenu)
                cont = 0;
            }*/
            // intento de salto de linea cada vez que llegue a los 6 
        });
    }

}


function mostrarPjBanner(array) {

    contMenu.innerHTML = '';
    array.forEach(personaje => {
        let html = `<div class="card cardPersonaje" id="tarjeta${personaje.nombre}">
                <img src="${personaje.img}" alt="${personaje.nombre}" class="card-img-bottom" id="imgPersonajes">
            </div>`;
        console.log("Revisando el html: " + html)
        contMenu.innerHTML += html;
    });
    mGemas(recuperarUsuario(localStorage));
}

async function mostrarPjBannerP() {
    let pjProm = await dataBannerProm();
    limpiarHtml();
    pjProm.forEach(personaje => {
        let html = `<div class="card cardPersonaje" id="tarjeta${personaje.nombre}">
                <img src="${personaje.img}" alt="${personaje.nombre}" class="card-img-bottom" id="imgPersonajes">
            </div>`;
        console.log("Revisando el html: " + html)
        contMenu.innerHTML += html;
    });
    mGemas(recuperarUsuario(localStorage));
}



function bPermanente(user) { //Compra el banner permanente y guarda el nuevo personaje
    limpiarHtml();
    if (user.gemas >= bPerm) {
        let nuevoPersonaje = gacha();
        Swal.fire({
            title: 'Jugaste el banner permanente!',
            text: 'se te descontaron: ' + bPerm + ' gemas',
            text: 'Has obtenido a: ' + nuevoPersonaje.nombre + ", de rareza " + nuevoPersonaje.rareza + ".",
            imageUrl: nuevoPersonaje.img,
            imageHeight: 200,
            imageAlt: 'Imagen del personaje conseguido'
        })
        user.gemas = parseInt(user.gemas) - bPerm;

        const pj = new Personaje(nuevoPersonaje.nombre, nuevoPersonaje.rareza, nuevoPersonaje.tipo, nuevoPersonaje.id, nuevoPersonaje.img);
        const currentUser = new Usuario(user.nombre, user.password, user.gemas, user.id);
        //guarda el personaje en el array "trampa"
        mPersonaje.push(new PersonajeSesion(nuevoPersonaje.nombre, nuevoPersonaje.rareza, nuevoPersonaje.tipo, nuevoPersonaje.id, nuevoPersonaje.img));
        //
        console.log(mPersonaje);
        console.log(pj);
        console.log(personajes);
        console.log(currentUser.agregarPj(pj)); // queda como undefined, no se ha encontrado solucion
        localStorage.setItem('usuario', JSON.stringify(currentUser));
        localStorage.setItem('personaje', JSON.stringify(pj));
    }
    else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Gemas insuficientes, tienes: ' + user.gemas + ' gemas'
        })
    }
    mGemas(user);

}

async function bPromocional(user) { //Compra el banner promocional y guarda el nuevo personaje
    limpiarHtml();
    if (user.gemas >= bProm) {
        let nuevoPersonaje = await gachaProm();
        Swal.fire({
            title: 'Jugaste el banner permanente!',
            text: 'se te descontaron: ' + bPerm + ' gemas',
            text: 'Has obtenido a: ' + nuevoPersonaje.nombre + ", de rareza " + nuevoPersonaje.rareza + ".",
            imageUrl: nuevoPersonaje.img,
            imageHeight: 200,
            imageAlt: 'Imagen del personaje conseguido'
        })
        user.gemas = parseInt(user.gemas) - bProm;


        const pj = new Personaje(nuevoPersonaje.nombre, nuevoPersonaje.rareza, nuevoPersonaje.tipo, nuevoPersonaje.id, nuevoPersonaje.img);
        const currentUser = new Usuario(user.nombre, user.password, user.gemas, user.id);
        //guarda el personaje en el array "trampa"
        mPersonaje.push(new PersonajeSesion(nuevoPersonaje.nombre, nuevoPersonaje.rareza, nuevoPersonaje.tipo, nuevoPersonaje.id, nuevoPersonaje.img));
        //
        console.log(mPersonaje);
        console.log(personajes);
        console.log("Personajes en la sesion:" + mPersonaje);
        console.log(pj);
        console.log(currentUser.agregarPj(pj)); // queda como undefined, no se ha encontrado solucion
        localStorage.setItem('usuario', JSON.stringify(currentUser));
        localStorage.setItem('personaje', JSON.stringify(pj));
    }
    else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Gemas insuficientes, tienes: ' + user.gemas + ' gemas'
        })
    }
    mGemas(user);

}

//----------Fin de Creacion de Funciones-----------------




//----------Inicio de interaccion con Usuario-----------------


//--------BOTONES----------------

//--------Ingresar al juego-------------
btnLogin.addEventListener('click', (e) => {
    e.preventDefault();

    if (!uLogin.value || !pLogin.value) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Todos los campos son requeridos'
        })
    } else {

        loginGame();
    }

});

//--------Registrarse en el juego-------------
btnRegis.addEventListener('click', (e) => {
    e.preventDefault();

    //Se valida que los campos esten con datos
    if (!uRegis.value || !pRegis.value) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Todos los campos son requeridos'
        })
    } else {

        nuevoUsuario();
    }
});


//--------Se recargan gemas del juego-------------
btnCarga.addEventListener('click', (e) => {
    e.preventDefault();

    if (!cargarGemas.value) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Todos los campos son requeridos'
        })
    } else {

        abonar(recuperarUsuario(localStorage));
    }
});

//--------Se sale del juego-------------
btnOut.addEventListener('click', (e) => {
    e.preventDefault();

    Swal.fire({
        title: 'Estas seguro de salir?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, sacame de aqui!'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Has salido con exito!'
            )
            mPersonaje.length = 0;
            noSesion();
            mostrarUser(toggles, 'd-none');
            uLogin.value = '';
            pLogin.value = '';
            uRegis.value = '';
            pRegis.value = '';
        }
    })
});


btnElim.addEventListener('click', () => {

    Swal.fire({
        title: 'Estas seguro',
        text: "Perderas todos tus personajes",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminalos!'
      }).then((result) => {
        if (result.isConfirmed) {
            mPersonaje.length = 0;
            limpiarHtml();
          Swal.fire(
            'Eliminados!',
            'Tus personajes fueron eliminados.',
            'success'
          )
        }
      })

});

//--------Muestra los personajes del jugador-------------
btnPj.addEventListener('click', () => {
    const usuario = recuperarUsuario(localStorage);
    mostrarPersonajes(usuario);


});

btnMostrar.addEventListener('click', () => {

    mostrarPjBanner(personajes);

});

btnMostrarP.addEventListener('click', () => {

    mostrarPjBannerP();

});

//------------Obteniene personajes para el jugador-------------
btnBanner.addEventListener('click', (e) => {
    e.preventDefault();

    bPermanente(recuperarUsuario(localStorage))

});

btnBannerP.addEventListener('click', (e) => {
    e.preventDefault();

    bPromocional(recuperarUsuario(localStorage))

});

// Derechos Reservados a Wladimir Ismael Concha Vargas