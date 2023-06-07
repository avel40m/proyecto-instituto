function generarPDF(lastname,firsName,city,province,email) {

  const ventana = window.open('', '', 'width=800,height=600');

   const contenidoHTML = `
    <html>
      <head>
        <title>Mi PDF generado con JavaScript</title>
      </head>
      <body>
      <div style="display:flex;justify-content: center;align-items: center;">
      <h1 style="font-size: 20px;">Instituto Nuevos Horizontes</h1>
      <img width:"150" src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQbfl4ubwso7pJzzYmt_Pf8dwTTgG3Ktwl3LqmRjbMpTFc0gJhK" alt="instituto" />
  </div>
   <h1 style="font-family: monospace;text-align: center;text-decoration: underline;">Inscripcion al curso</h1>
   <h3>Datos del alumnos: </h3>
   <ul>
      <li>Apellido: ${lastname}</li>
      <li>Nombre: ${firsName}</li>
      <li>Provincia: ${province}</li>
      <li>Ciudad: ${city}</li>
      <li>Email: ${email}</li>
    </ul>  
    <div style="
  display: flex;
  justify-content: space-around;
  margin-top: 3rem;
  font-weight: bold;
">
        <p style="
  border-top: 2px solid;
  padding-top: 5px;
">FIRMA DEL INSTITUTO</p>
        <p style="
  border-top: 2px solid;
  padding-top: 5px;
">FIRMA DEL ALUMNO</p>
    </div>
      </body>
    </html>
  `;

  // Escribe el contenido HTML en la nueva ventana
  ventana.document.open();
  ventana.document.write(contenidoHTML);
  ventana.document.close();

  // Espera a que se cargue completamente el contenido de la ventana
  ventana.onload = function () {
    // Imprime la ventana en formato PDF
    ventana.print();
  };
}

// Llama a la función para generar el PDF
generarPDF();
