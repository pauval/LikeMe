function Form({ titulo, imgSrc, descripcion, setTitulo, setImgSRC, setDescripcion, agregarPost }) {
  const isFormValid = titulo && imgSrc && descripcion;  // Verifica que todos los campos estén llenos

  return (
    <div className="form">
      <div className="mb-2">
        <h6>Agregar post</h6>
        <label>Título</label>
        <input
          type="text"
          value={titulo}  // Usar la prop titulo para el valor del input
          onChange={(event) => setTitulo(event.target.value)}
          className="form-control"
        />
      </div>
      <div className="mb-2">
        <label>URL de la imagen</label>
        <input
          type="text"
          value={imgSrc}  // Usar la prop imgSrc para el valor del input
          onChange={(event) => setImgSRC(event.target.value)}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label>Descripción</label> <br />
        <textarea
          value={descripcion}  // Usar la prop descripcion para el valor del textarea
          onChange={(event) => setDescripcion(event.target.value)}
          className="form-control"
        ></textarea>
      </div>
      <div className="d-flex">
        <button
          onClick={agregarPost}
          className="btn btn-light m-auto"
          disabled={!isFormValid}  // Desactiva el botón si los campos no están llenos
        >
          Agregar
        </button>
      </div>
    </div>
  );
}

export default Form;
