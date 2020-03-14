const mostrarUsuarios = () => { 
  fetch(`https://tp-js-2-api-wjfqxquokl.now.sh/users`)
  .then(data => data.json())
  .then(respuesta => {
    const baseDeDatosContactos = document.querySelector("#informacion-contactos");

    let datosUsuarios = ``
    const mostrarUsuarios = respuesta.map(usuario => {
      return datosUsuarios += `
      <div id="detalle-usuarios">
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
      </div>
        `;
    });

    baseDeDatosContactos.innerHTML = mostrarUsuarios;
  });
}

const addEmployeeButton = document.querySelector("#add-employee");
const modalAddEmployee = document.querySelector(
  "#modal-add-employee-container"
);

const abrirAddEmployee = (addEmployeeButton.onclick = () => {
  modalAddEmployee.classList.remove("nomostrar");
  modalAddEmployee.innerHTML = `
    <div id="modal-add-employee">
    <form id="formulario-add-employee" action="">
      <div id="header-modal-add-employee">
        <h4>Add Employee</h4>
        <button id="close">                ×
        </button>
      </div>
      <div id="body-modal-add-employee">
        <div id="name-body-add-employee" class="container-input-add-employee">
          <label for="Name">Name</label>
          <input type="text" name="" maxlength="50" id="input-name" required />
        </div>
        <div id="email-body-add-employee" class="container-input-add-employee">
          <label for="Email">Email</label>
          <input type="email" name="" maxlength="60" id="input-email" required />
        </div>
        <div id="address-body-add-employee" class="container-input-add-employee">
          <label for="Address">Address</label>
          <textarea name="" id="textarea-address" cols="23" rows="2"></textarea>
        </div>
        <div id="phone-body-add-employee" class="container-input-add-employee">
          <label for="Phone">Phone</label>
          <input type="number" name="" id="input-phone" required />
        </div>
      </div>
      <div id="footer-modal-add-employee">
        <input type="button" class="button button-cancel" value="Cancel">
        <input type="submit" class="button submit-add-employee" value="Add">
      </div>
    </form>
  </div>
    `;
  const closeButton = document.querySelector("#close");
  const closeModal = document.querySelector(".button-cancel");
  const addButton = document.querySelector(".submit-add-employee");
  const nameInput = document.querySelector("#input-name");
  const emailInput = document.querySelector("#input-email");
  const addressTextarea = document.querySelector("#textarea-address");
  const phoneInput = document.querySelector("#input-phone");

  // addButton.onclick = e => {

  //   }
  // }

  const form = document.querySelector("#formulario-add-employee");
  const addNewUser = (form.onsubmit = e => {
    e.preventDefault();
    const nombreAdd = nameInput.value;
    const emailAdd = emailInput.value;
    const addressAdd = addressTextarea.value;
    const phoneAdd = phoneInput.value;

    const addToDataBase = fetch('https://tp-js-2-api-wjfqxquokl.now.sh/users', {
      method: 'POST',
      body: JSON.stringify({
        fullname: `${nombreAdd}`,
        email: `${emailAdd}`,
        address: `${addressAdd}`,
        phone: `${phoneAdd}`
      }),
      headers: {
        'Content-Type': "application/json"
      }
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      modalAddEmployee.classList.add("nomostrar")
      mostrarUsuarios()
    })
  });

  closeModal.onclick = () => {
    modalAddEmployee.classList.add("nomostrar");
  };

  closeButton.onclick = () => {
    modalAddEmployee.classList.add("nomostrar");
  };
  addButton.onkey = e => {
    if (e.keyCode == 13) {
      addNewUser()
      }
  };
});

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
