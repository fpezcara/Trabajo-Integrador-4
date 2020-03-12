fetch(`https://tp-js-2-api-wjfqxquokl.now.sh/users`)
.then(data => data.json())
.then(respuesta => {
    const baseDeDatosContactos = document.querySelector('#informacion-contactos')
    const mostrarUsuarios = respuesta.map( usuario=> {
        return `
        <td><input type="checkbox"></td>
        <td>${usuario.fullname}</td>
        <td>${usuario.email}</td>
        <td>${usuario.address}</td>
        <td>${usuario.phone}</td>
        <td>
            <a href="" class="edit">
                <i class="material-icons" title="Edit">&#xE254;</i>
            </a>
            <a href="" class="delete">
                <i class="material-icons" title="Delete">&#xE872;</i>
            </a>
        </td> 
        `
    }) 
       
    
    baseDeDatosContactos.innerHTML = mostrarUsuarios;
    console.log(respuesta)
})


const modalAddEmployee = document.querySelector('#modal-add-usuario');

const addEmployee = modalAddEmployee.onclick = () => {
    
};


// fetch(`https://tp-js-2-api-wjfqxquokl.now.sh/users`, {
//     method: 'POST',
//     body: JSON.stringify({
        
//     })

// })
// .then(data => data.json())
// .then(respuesta => {
//     const baseDeDatosContactos = document.querySelector('#informacion-contactos')
//     const mostrarUsuarios = respuesta.map( usuario=> {
//         return `
//         <td><input type="checkbox"></td>
//         <td>${usuario.fullname}</td>
//         <td>${usuario.email}</td>
//         <td>${usuario.address}</td>
//         <td>${usuario.phone}</td>
//         <td>
//             <a href="" class="edit">
//                 <i class="material-icons" title="Edit">&#xE254;</i>
//             </a>
//             <a href="" class="delete">
//                 <i class="material-icons" title="Delete">&#xE872;</i>
//             </a>
//         </td> 
//         `
//     }) 
       
    
//     baseDeDatosContactos.innerHTML = mostrarUsuarios;
//     console.log(respuesta)
// })}

// modal-agregar-usuario