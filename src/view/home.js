export const home = () => {
  const viewHome = `<section>
  <h1>ONLY CATS</h1>
  <p>Conecta con otras personas amantes de los gatos en una web completamente tematizada.
    Comparte experiencias, fotos y más. Únete</p>
  <nav>
    <ul>
  
      <li>
        <a href="#/registrate">Regístrate</a>
      </li>
  
      <li>
        <a href="#/iniciasesion">Iniciar Sesión</a>
      </li>
    </ul>
  </nav>
  </section>`;
  const divElement = document.createElement('div');
  divElement.innerHTML = viewHome;
  return divElement;
};
