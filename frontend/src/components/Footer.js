import React from 'react';

export default function Footer() {
  return (
    <footer className="anm-footer">
      <div className="container">
        <div className="row g-4">
          <div className="col-md-5">
            <h3>Animemos Nuestro Metro</h3>
            <p>Un espacio para cuidarnos entre todos. No estás solo/a.</p>
          </div>
          <div className="col-md-4">
            <h4>Contacto</h4>
            <p>Sede principal:<br />Cra 63 #103G-202</p>
            <p><a href="mailto:AyudaMetroMedellin@gmail.com">AyudaMetroMedellin@gmail.com</a></p>
            <p>
              <a href="tel:+573128733990">+57 312 8733990</a><br />
              <a href="tel:+573044175431">+57 304 4175431</a><br />
              <a href="tel:+573045217695">+57 304 5217695</a>
            </p>
          </div>
          <div className="col-md-3">
            <h4>Horario</h4>
            <p>Lunes a viernes<br />8:00 a.m. – 4:00 p.m.</p>
            <p>Sábados, domingos y feriados<br />9:00 a.m. – 2:00 p.m.</p>
          </div>
        </div>
        <p className="anm-foot-lema">Juntos podemos hacer del metro un lugar más humano, más empático y más seguro para todos.</p>
        <p className="anm-foot-copy">© {new Date().getFullYear()} Animemos Nuestro Metro. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
