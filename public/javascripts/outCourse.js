function bajarme(){
    const elemento = event.target;
    const parametro = elemento.getAttribute('data-parametro');
    Swal.fire({
        title: '¿Quiere darse de baja del curso?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, quiero'
      }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )

            fetch(`http://localhost:3000/delete-course/${parametro}`,{method:'DELETE'}).catch(err => console.error(err));
            
            setTimeout(() => {
                window.location.href = "http://localhost:3000/my-courses";
            },3000)
        }
      })
}