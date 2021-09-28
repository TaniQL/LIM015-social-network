/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-console */
import { signOutUser, onAuthStateChanged } from '../firebase/firebase-auth.js';
import {
  postCollection, getCollection, deletePost, getPost, editPost, editHeart,
} from '../firebase/firebase-firestore.js';

const userStateCheck = () => {
  onAuthStateChanged((user) => {
    if (user !== null && user.emailVerified) {
      window.location.hash = '#/onlycats';
    } else if (user === null) {
      window.location.hash = '';
    }
  });
};

export const pageOnlyCats = () => {
  userStateCheck();
  const localUser = JSON.parse(localStorage.getItem('user'));
  const imgDefault = 'https://pbs.twimg.com/profile_images/1101458340318568448/PpkA2kQh_400x400.jpg';
  const photo = (localUser.photoURL === null) ? imgDefault : localUser.photoURL;
  const displayName = localUser.displayName;
  const email = localUser.email;
  let id = ' ';
  let editStatus = false;
  const pageOcView = `
  <div class="page-container">
    <header class = "header-container">
      <img src="./img/only-cats.png" "alt='only-cats' class="page-title">
      <i class="fas fa-sign-out-alt" id="sign-out"></i>
      <i class="fas fa-cat" style="display:none"></i>
    </header>
    <main class="scroll-container">
      <div class="label-container">
        <button class="label-btn meme">Memes</button>
        <button class="label-btn vet">Vet Cat</button>
        <button class="label-btn foodie">Foodie Cat</button>
      </div>
      <div>
        <section class="profile-post publish" >
          <div class="container-photo">
              <img src="${photo}" "alt='picture' class="profile-photo">
          </div>
          <section class="section-profile" >
            <textarea class="text-input" id="text-input" placeholder="¿Miau esta pasando?"></textarea>
            <div class="post-icon">
              <i class="fas fa-image"></i>
              <button class="post-button hide" id="cancel-button" type="submit">Cancelar</button>
              <button class="post-button" id="post-button" type="submit">Meow</button>

            </div>
          </section>
        </section>

        <section  id="other-post">
        </section>
    </main>
  </div>`;

  const sectionElement = document.createElement('section');
  sectionElement.classList.add('container-box');
  sectionElement.innerHTML = pageOcView;
  // -----Botones del Post
  const btnPublish = sectionElement.querySelector('#post-button');
  const textInput = sectionElement.querySelector('#text-input');

  // -------- Leer Posts (R) --------

  const readPosts = () => {
    getCollection().onSnapshot((querySnapshot) => {
      const newPost = sectionElement.querySelector('#other-post');
      newPost.innerHTML = ' ';
      querySnapshot.forEach((doc) => {
        const dataContent = doc.data();
        newPost.innerHTML += `
        <section class="profile-post">
          <div class="container-photo">
            <img src="${dataContent.photo}" "alt='picture' class="profile-photo">
          </div>
          <section class="section-post">
            <p class="name-input"> ${dataContent.user} </p>
            <p readonly class="text-output">${dataContent.text}</p>
            <button class="btn-heart"><i class="fab fa-gratipay" id="${doc.id}"></i></button>
          </section>
          <div class="update-post  ${(dataContent.email === localUser.email) ? ' ' : 'hide'}">
            <button class="btn-delete"><i class="fas fa-trash" id="${doc.id}"></i></button>
            <button class="btn-edit"><i class="fas fa-edit" id="${doc.id}"></i></button>
          </div>
        </section> `;
      });

      // -------- Eliminar Posts (D) --------
      const btnDelete = sectionElement.querySelectorAll('.btn-delete');
      btnDelete.forEach((btn) => {
        btn.addEventListener('click', async (e) => {
          const result = confirm('¿En serio quieres borrar el post?');
          if (result === true) {
            await deletePost(e.target.id);
            console.log('Document successfully deleted!');
            window.alert('¡El post ha sido borrado con éxito!');
          }
        });
      });

      // -------- Editar Posts (U) --------
      const btnEdit = sectionElement.querySelectorAll('.btn-edit');
      btnEdit.forEach((btn) => {
        btn.addEventListener('click', async (e) => {
          const postSeleccionado = await getPost(e.target.id);
          // Para saber lo que dice el post => console.log(postText.value);
          textInput.value = postSeleccionado.data().text;
          editStatus = true;
          // data del post => console.log(postSeleccionado);
          // id del post => console.log(postSeleccionado.id);
          id = postSeleccionado.id;
          btnPublish.innerText = 'Editar';
          sectionElement.querySelector('.hide').style.display = 'block';
          // console.log(x);
        });
      });

    });
  };

  btnPublish.addEventListener('click', () => {
    // EditStatus sera falso cuando no exista un post, y recien se este creando
    if (textInput.value.length !== 0) {
      if (editStatus === false) {
        // Crear un post (C)
        postCollection(textInput.value, displayName, photo, email)
          .then(() => {
            textInput.value = ' ';
            console.log('Posteado con exito');
          })
          .catch((error) => {
            console.error('Error al añadir documento: ', error);
          });
      } else {
        editPost(id, textInput.value)
          .then(() => {
            textInput.value = ' ';
            console.log('editanding');
            btnPublish.innerText = 'Meow';
            sectionElement.querySelector('.hide').style.display = 'none';
          })
          .catch((error) => {
            console.error('Error al editar documento: ', error);
          });
      }
    } else {
      alert('pon un texto oye');
    }
  });
  readPosts();

  // ------------------ Salir de la página --------------------
  const signOut = sectionElement.querySelector('#sign-out');
  signOut.addEventListener('click', (e) => {
    e.preventDefault();
    const result = confirm('¿En serio quieres salir?');
    if (result === true) {
      signOutUser()
        .then(() => {
          window.location.hash = '';
          window.localStorage.clear();
        });
    }
  });

  return sectionElement;
};
