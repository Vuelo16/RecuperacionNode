const url ='https://recuperacion-node.onrender.com/api/persona'

const listarPersona = async () => {
    let body = document.getElementById('contenido-persona')
    if (body) {
        let mensaje = ''
        fetch(url) 
            .then(res => res.json())
            .then(function (data) {
                let listarPersona = data.personas
                listarPersona.map((persona) => {
                    mensaje += `<tr><td>${persona.documento}</td>` +
                        `<td>${persona.nombre}</td>` +
                        `<td>${persona.nota1}</td>` +
                        `<td>${persona.nota2}</td>` +
                        `<td>${persona.nota3}</td>` +
                        `<td>${persona.promedio = (persona.nota1 + persona.nota2 + persona.nota3)/3}</td>` +
                        `<td><a class="waves-effect waves-light btn modal-trigger" href="#modal1" onclick='editarPersona(${JSON.stringify(persona)})'>Editar</a>
                 <a class="waves-effect waves-light btn modal-trigger red" href="#" onclick='eliminarPersona("${persona._id}")'>Eliminar</a>
                </td></tr>`
                    body.innerHTML = mensaje
                })
            })
    }

}

listarPersona()

const registrarPersona = async () => {
    let documento = document.getElementById('documento').value
    let nombre = document.getElementById('nombre').value
    let nota1 = document.getElementById('nota1').value
    let nota2 = document.getElementById('nota2').value
    let nota3 = document.getElementById('nota3').value

    let persona = {
        documento: documento,
        nombre: nombre,
        nota1:nota1,
        nota2:nota2,
        nota3:nota3
    }

    const expresionNotas = /^[\d.]+$/
    const expresionNombre = /^[a-zA-Z0  ]+$/

    if(documento == '' || nombre == '' || nota1 == '' || nota2 == '' || nota3 == ''){
        Swal.fire({
            icon: "error",
            title: "No se aceptan campos vacíos",
            confirmButtonColor: "#45B39D"
        });
        return;
    }

    if(!expresionNombre.test(nombre)){
        Swal.fire({
            icon: "error",
            title: "Solo se aceptan letras en el nombre",
            confirmButtonColor: "#45B39D"
        });
        return;
    }
    if(!expresionNotas.test(documento)){
        Swal.fire({
            icon: "error",
            title: "Solo se aceptan numeros en el documento",
            confirmButtonColor: "#45B39D"
        });
        return;
    }

    if(!expresionNotas.test(nota1) || !expresionNotas.test(nota2) || !expresionNotas.test(nota3)){
        Swal.fire({
            icon: "error",
            title: "Solo se aceptan numeros en las notas",
            confirmButtonColor: "#45B39D"
        });
        return;
    }

    if(nota1 < 0 || nota1 >5 || nota2 < 0 || nota2 > 5 || nota3 < 0 || nota3 > 5){
        Swal.fire({
            icon: "error",
            title: "Solo se aceptan notas entre 0 y 5",
            confirmButtonColor: "#45B39D"
        });
        return;
    }

    

        fetch(url, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(persona),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
            .then(response => response.json())
            .then(json => {
                Swal.fire({
                    title: json.mensaje,
                    icon: 'success',
                    confirmButtonColor: "#45B39D"
            })
            .then(result => {
                if (result.isConfirmed) {
                    window.location.href = './listarPersona.html';
                }
            });
            });
    
}

const editarPersona = (persona) => {
    document.getElementById('_id').value = ''
    document.getElementById('documento').value = ''
    document.getElementById('nombre').value = ''
    document.getElementById('nota1').value = ''
    document.getElementById('nota2').value = ''
    document.getElementById('nota3').value = ''

    document.getElementById('_id').value = persona._id
    document.getElementById('documento').value = persona.documento
    document.getElementById('nombre').value = persona.nombre
    document.getElementById('nota1').value = persona.nota1
    document.getElementById('nota2').value = persona.nota2
    document.getElementById('nota3').value = persona.nota3
}

const actualizarPersona = async () => {
    
    let documento = document.getElementById('documento').value
    let nombre = document.getElementById('nombre').value
    let nota1 = document.getElementById('nota1').value
    let nota2 = document.getElementById('nota2').value
    let nota3 = document.getElementById('nota3').value

    let persona = {
        _id: document.getElementById('_id').value,
        documento: documento,
        nombre: nombre,
        nota1:nota1,
        nota2:nota2,
        nota3:nota3,
        tipoModificacion: 'Unitaria'
    }

    const expresionNotas = /^[\d.]+$/
    const expresionNombre = /^[a-zA-Z  ]+$/

    if(documento == '' || nombre == '' || nota1 == '' || nota2 == '' || nota3 == ''){
        Swal.fire({
            icon: "error",
            title: "No se aceptan campos vacíos",
            confirmButtonColor: "#45B39D"
        });
        return;
    }
    if(!expresionNombre.test(nombre)){
        Swal.fire({
            icon: "error",
            title: "Solo se aceptan letras en el nombre",
            confirmButtonColor: "#45B39D"
        });
        return;
    }
    if(!expresionNotas.test(documento)){
        Swal.fire({
            icon: "error",
            title: "Solo se aceptan numeros en el documento",
            confirmButtonColor: "#45B39D"
        });
        return;
    }

    if(!expresionNotas.test(nota1) || !expresionNotas.test(nota2) || !expresionNotas.test(nota3)){
        Swal.fire({
            icon: "error",
            title: "Solo se aceptan numeros en las notas",
            confirmButtonColor: "#45B39D"
        });
        return;
    }

    if(nota1 < 0 || nota1 >5 || nota2 < 0 || nota2 > 5 || nota3 < 0 || nota3 > 5){
        Swal.fire({
            icon: "error",
            title: "Solo se aceptan notas entre 0 y 5",
            confirmButtonColor: "#45B39D"
        });
        return;
    }

    console.log(persona)
        fetch(url, {
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify(persona),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
        .then(response => response.json())
        .then(json => {
            Swal.fire({
                title: json.mensaje,
                icon: 'success',
                confirmButtonColor: "#45B39D"
        })
        .then(result => {
            if (result.isConfirmed) {
                window.location.href = './listarPersona.html';
            }
        });
        });
    
    
}

const eliminarPersona = (_id) => {
    Swal.fire({
        title: "¿Eliminar Persona?",
        icon: 'warning',
        showCancelButton: true,
        confirmButton: "yes",
        confirmButtonColor: "#45B39D",
        cancelButtonColor: "#E74C3C "
    })
    .then((result) => {
        if (result.isConfirmed) {
        let persona = {
            _id: _id
        }
        fetch(url, {
            method: 'DELETE',
            mode: 'cors',
            body: JSON.stringify(persona),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
        
            .then(response => response.json()) 
            .then((json) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Eliminación exitosa'
                })
            })
            .then(result => {
                if (result.isConfirmed) {
                    window.location.reload();
                }
            })
        }
    });
}

if (document.querySelector('#btn-registrarPersona')) {
    document.querySelector('#btn-registrarPersona')
        .addEventListener('click', registrarPersona)
}

if (document.querySelector('#btn-actualizarPersona')) {
    document.querySelector('#btn-actualizarPersona')
        .addEventListener('click', actualizarPersona)
}
