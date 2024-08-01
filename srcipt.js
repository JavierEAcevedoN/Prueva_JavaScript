let cursos = [
    {
        nombre: "Curso de ingles",
        descripcion: "Curso de ingles de basico a avanzado",
        contenido: "Nivel A1, Nivel A2, Nivel B1, Nivel B2, Nivel C1",
    },
    {
        nombre: "Curso de programacion",
        descripcion:
            "Curso en donde aprendera los fundamentos de la programacion y algunos lenguajes",
        contenido: "Fundamentos de programacion, Python, HTML, CSS, JavaScript",
    },
];
const btnAgregar = document.getElementById("btn_agregar");
const btnEditar = document.getElementById("btn_editar");
const btnEliminar = document.getElementById("btn_eliminar");
btnAgregar.addEventListener("click", async () => {
    const agregarCurso = {};
    const datos = await ejecutarCargarCursos();
    agregarCurso.nombre = prompt("Ingresa el nombre del curso");
    agregarCurso.descripcion = prompt("Ingresa la descripcion del curso");
    agregarCurso.contenido = prompt("Ingresa el contenido del curso");
    if (agregarCurso.nombre.length === 0 ||
        agregarCurso.descripcion.length === 0 ||
        agregarCurso.contenido.length === 0) {
            alert("No se puede ingresar campos vacios")
            return
    }
    datos.push(agregarCurso)
    mostrarCursos()
    return
});
btnEditar.addEventListener("click", async () => {
    const editarCurso = {};
    let index = -1;
    const datos = await ejecutarCargarCursos();
    index = Number(prompt("Ingresa el numero del curso")-1)
    if (0 <= index && index < datos.length) {
        editarCurso.nombre = prompt("Ingresa el nombre del curso");
        editarCurso.descripcion = prompt("Ingresa la descripcion del curso");
        editarCurso.contenido = prompt("Ingresa el contenido del curso");
        if (editarCurso.nombre.length === 0 ||
            editarCurso.descripcion.length === 0 ||
            editarCurso.contenido.length === 0) {
                alert("No se puede ingresar campos vacios")
                return
        }
        for (let i = 0; i < datos.length; i++) {
            if (i===index) {
                datos[i].nombre = editarCurso.nombre
                datos[i].descripcion = editarCurso.descripcion
                datos[i].contenido = editarCurso.contenido
                mostrarCursos()
                return
            }
        }
    } else {
        alert("Ese Nº de curso no es valido")
        return
    }
});
btnEliminar.addEventListener("click", async () => {
    let index = -1;
    const datos = await ejecutarCargarCursos();
    if (datos.length <= 1) {
        alert("No se pueden eliminar mas cursos")
        return
    }
    index = Number(prompt("Ingresa el numero del curso")-1)
    if (0 <= index && index <= datos.length) {
        for (let i = 0; i < datos.length; i++) {
            if (i===index) {
                datos.splice(i,1)
                mostrarCursos()
                return
            }
        }
    } else {
        alert("Ese Nº de curso no es valido")
        return
    }
});
const cargarCursos = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (!cursos.length <= 0) {
                resolve(cursos);
            } else {
                reject(new Error("No se pudieron cargar los cursos"));
            }
        }, 2000);
    });
};
const ejecutarCargarCursos = async () => {
    const resultado = await cargarCursos();
    return resultado;
};
const mostrarCursos = async () => {
    const datos = await ejecutarCargarCursos();
    let cursos = "";
    let index = 0;
    datos.forEach((curso) => {
        index++
        cursos += `
        <div class="curso">
            <h2 class="titulo">${curso.nombre}</h2>
            <h3 class="t_descripcion">Descripcion</h3>
            <p class="descripcion">${curso.descripcion}</p>
            <h3 class="t_contenido">contenido</h3>
            <p class="contenido">${curso.contenido}</p>
            <h3 class="t_numero">Nº del curso</h3>
            <p class="numero">${index}</p>
        </div>
        `;
    });
    document.getElementById("contenedor_cursos_disponibles").innerHTML = cursos;
};
mostrarCursos();