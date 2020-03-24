const mostrarTablaDeUsuarios = () => {
  fetch(`https://tp-js-2-api-wjfqxquokl.now.sh/users`)
    .then(data => data.json())
    .then(respuesta => {
      const baseDeDatosContactos = document.querySelector(
        "#informacion-contactos"
      );
      console.log(respuesta);

      const mostrarUsuarios = respuesta.map(usuario => {
        return `
      <tr id="detalle-usuarios">
        <td><input type="checkbox"></td>
        <td>${usuario.fullname}</td>
        <td>${usuario.email}</td>
        <td>${usuario.address}</td>
        <td>${usuario.phone}</td>
        <td>
        
         <i class="material-icons edit" title="Edit">&#xE254;</i>
         <i class="material-icons delete" id="${usuario.id}" title="Delete">&#xE872;</i>
        
        </td> 
      </tr>
        `;
      });

      baseDeDatosContactos.innerHTML = mostrarUsuarios;

      const deleteIcon = document.getElementsByClassName("delete");

      for (let i = 0; i < deleteIcon.length; i++) {
        
        deleteIcon[i].onclick = e => {
          let userToDelete = e.target.id;
          deleteUser(userToDelete);
           };
      }
    });
};

mostrarTablaDeUsuarios();

const addEmployeeButton = document.querySelector("#add-employee");
const modalAddEmployee = document.querySelector(
  "#modal-add-employee-container"
);

addEmployeeButton.onclick = () => {
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

  const form = document.querySelector("#formulario-add-employee");
  const addNewUser = (form.onsubmit = e => {
    e.preventDefault();
    const nombreAdd = nameInput.value;
    const emailAdd = emailInput.value;
    const addressAdd = addressTextarea.value;
    const phoneAdd = phoneInput.value;

    const addToDataBase = fetch("https://tp-js-2-api-wjfqxquokl.now.sh/users", {
      method: "POST",
      body: JSON.stringify({
        fullname: `${nombreAdd}`,
        email: `${emailAdd}`,
        address: `${addressAdd}`,
        phone: `${phoneAdd}`
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        modalAddEmployee.classList.add("nomostrar");
        mostrarTablaDeUsuarios();
      });
  });

  closeModal.onclick = () => {
    modalAddEmployee.classList.add("nomostrar");
  };

  closeButton.onclick = () => {
    modalAddEmployee.classList.add("nomostrar");
  };
  addButton.onkeypress = e => {
    if (e.keyCode == 13) {
      addNewUser();
    }
  };
};

const formFiltrar = document.forms[0];
const submit = formFiltrar.elements[0];

formFiltrar.onsubmit = e => {
  e.preventDefault();
  filtrarUsuarios(submit.value);
};

const filtrarUsuarios = dato => {
  fetch(`https://tp-js-2-api-wjfqxquokl.now.sh/users?search=${dato}`)
    .then(data => data.json())
    .then(respuesta => {
      const baseDeDatosContactos = document.querySelector(
        "#informacion-contactos"
      );

      const mostrarUsuarios = respuesta.map(usuario => {
        return `
      <tr id="detalle-usuarios">
        <td><input type="checkbox"></td>
        <td>${usuario.fullname}</td>
        <td>${usuario.email}</td>
        <td>${usuario.address}</td>
        <td>${usuario.phone}</td>
        <td>
        <i class="material-icons edit" title="Edit">&#xE254;</i>
        <i class="material-icons delete" title="Delete">&#xE872;</i>
        </td>
      </tr>
        `;
      });

      baseDeDatosContactos.innerHTML = mostrarUsuarios;
    });
};


const deleteUser = () => {
  const modalDelete = document.querySelector(
    "#modal-delete-employee-container"
  );
  
  fetch(`https://tp-js-2-api-wjfqxquokl.now.sh/users`)
    .then(data => data.json())
    .then(respuesta => {

  modalDelete.classList.remove("nomostrar");
  
  const deleteConfirmationModal = respuesta.map(user => { 
    return `
    <div id="modal-delete-employee" class="no mostrar">
  <div>
  <h4>Delete Employee</h4>
  <button id="close"> ×
  </button>
</div>
<div id="modal-delete-body">
  <p>
  Are you sure you want to delete these Records?

  This action cannot be undone.
</p>
</div>
<div id="footer-modal-add-employee">
        <input type="button" class="button button-cancel" value="Cancel">
        <input type="submit" id="${user.id}" class="button delete-button" value="Delete">
      </div
</div>

`
});
modalDelete.innerHTML = deleteConfirmationModal;
  const closeButton = document.querySelector("#close");
  const closeModal = document.querySelector(".button-cancel");
  const deleteConfirmation = document.querySelector(".delete-button");
  console.log(deleteConfirmation)
  closeModal.onclick = () => {
    modalDelete.classList.add("nomostrar");
  };

  closeButton.onclick = () => {
    modalDelete.classList.add("nomostrar");
  };

  deleteConfirmation.onclick = userToDelete => {
    console.log(userToDelete)
    fetch(`https://tp-js-2-api-wjfqxquokl.now.sh/${userToDelete}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        console.log("hola")
      })
  }
  
})
};





//  const mostrarUsuarios = respuesta.map(usuario => {
//         return `
//       <tr id="detalle-usuarios">
//         <td><input type="checkbox"></td>
//         <td>${usuario.fullname}</td>
//         <td>${usuario.email}</td>
//         <td>${usuario.address}</td>
//         <td>${usuario.phone}</td>
//         <td>
//         <i class="material-icons edit" title="Edit">&#xE254;</i>
//         <i class="material-icons delete" title="Delete">&#xE872;</i>
//         </td>
//       </tr>
//         `;
//       });

//       baseDeDatosContactos.innerHTML = mostrarUsuarios;