const formImagen = document.getElementById('formSubirImagen')

formImagen.addEventListener('submit', async (e) => {
  e.preventDefault() // Prevenir que se refresque la pagina o otros situaciones por defecto

  const formData = new FormData(formImagen); // Recibe un formulario por defecto

  // enviar la Data al API
  /* fetch -> heramienta para simplificar la comunicacion en tre FRONT y BACKEND para una peticion */
  const res = await fetch('http://localhost:3000/upload', { 
    method: 'POST',
    body: formData
  });

  // Verifica que la data se enviaron los datos
  if (res.ok) {
    const data = await res.json()
    alert(data.message)
  } else {
    alert('Error al subir la imagen')
  }
})
