import React from 'react';

class Header extends React.Component {
  render() {
    return (
      <header className="bg-secondary text-light text-center p-3 border-bottom border-2 border-primary">
        <img src="/img/n1circle.png" alt="LOGO NÚMERO 1" width="48" height="48" className="d-block mx-auto mb-2" />
        <h3 className="m-0">Mi aplicación</h3>
      </header>
    );
  }
}

export default Header;