function Form({
  titulo,
  imgSrc,
  descripcion,
  setTitulo,
  setImgSRC,
  setDescripcion,
  agregarPost,
  isEditing,  
}) {

  const isFormValid = imgSrc.trim() !== "" && descripcion.trim() !== ""; 

  return (
    <div className="form">
      <div className="mb-2">
        <h6>{isEditing ? "Editar post" : "Agregar post"}</h6> 
        <label>Título</label>
        <input
          type="text"
          value={titulo}
          onChange={(event) => setTitulo(event.target.value)}
          className="form-control"
          disabled={isEditing} 
        />
      </div>
      <div className="mb-2">
        <label>URL de la imagen</label>
        <input
          type="text"
          value={imgSrc}
          onChange={(event) => setImgSRC(event.target.value)}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label>Descripción</label> <br />
        <textarea
          value={descripcion}
          onChange={(event) => setDescripcion(event.target.value)}
          className="form-control"
        ></textarea>
      </div>
      <div className="d-flex">
        <button 
          onClick={agregarPost} 
          className="btn btn-light m-auto"
          disabled={!isFormValid} 
        >
          {isEditing ? "Guardar cambios" : "Agregar"} 
        </button>
      </div>
    </div>
  );
}

export default Form;
