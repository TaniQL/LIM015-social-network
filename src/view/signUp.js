/* eslint-disable no-console */
export const signUp = () => {
  const viewSignUp = `
    <div  class="home-container">
      <h2>Regístrate</h2>
      <form id="signup-form">
        <div>
          <input id="signup-username" type="text" placeholder="Nombre de usuario">
        </div>
        <div>
          <input id="signup-email" type="text" placeholder="Correo electrónico">
        </div>
        <div>
          <input id="signup-password" type="password" placeholder="Contraseña">
        </div>

        <button type="submit" id="create-account" class="start-button"> Crear cuenta </button>
      </form>
      <ul class="home-list">
        <li>
          <a href="#/SignIn">¿Tiene cuenta? Inicia con ella</a>
        </li>
      </ul>
    </div>`;
  const sectionElement = document.createElement('section');
  sectionElement.classList.add('container-box');
  sectionElement.innerHTML = viewSignUp;

  const signupForm = sectionElement.querySelector('#signup-form');
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    /*  const signupUsername = sectionElement.querySelector('#signup-username').value; */
    const signupEmail = sectionElement.querySelector('#signup-email').value;
    const signupPassword = sectionElement.querySelector('#signup-password').value;
    firebase.auth()
      .createUserWithEmailAndPassword(signupEmail, signupPassword)
      .then((userCredential) => {
        console.log(userCredential);
        console.log('registrado');
      });
  });
  return sectionElement;
};
