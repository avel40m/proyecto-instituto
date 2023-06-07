function consultas(e){
    e.preventDefault();

    if (e.target[2].value == '') {
      Swal.fire({
          icon: 'error',
          title:'Error al enviar',
          text: 'No se pudo enviar el mensaje, completar el campo mensaje.',
          showConfirmButton: false,
          timer: 2500
        })
    } else {
      Swal.fire({
          icon: 'success',
          title:'Mensaje enviado',
          text: 'En la proximas 24 hs recibiras un correo respondiendote tu consulta.',
          showConfirmButton: false,
          timer: 2500
        })
        fetch('http://localhost:3000/send-message',{
          method: 'post',
          headers: {
            'content-type':'application/json'
          },
          body: JSON.stringify({
            username:e.target[0].value,
            email:e.target[1].value,
            message: e.target[2].value
          })
        })
        e.target[0].value = ''
        e.target[1].value = ''
        e.target[2].value = ''
    }
}