import axios from "axios";
import { useEffect, useState } from "react";
import Form from "./components/Form";
import Post from "./components/Post";

const urlBaseServer = "http://localhost:3000";

function App() {
  const [titulo, setTitulo] = useState("");
  const [imgSrc, setImgSRC] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');  // Nuevo estado para manejar errores

  const getPosts = async () => {
    try {
      const { data: posts } = await axios.get(urlBaseServer + "/posts");
      setPosts([...posts]);
      setError('');  // Limpia el mensaje de error si la solicitud es exitosa
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);  // Maneja el mensaje de error desde el backend
      } else {
        setError('Error al cargar los posts');
      }
    }
  };

  const agregarPost = async () => {
    const post = { titulo, url: imgSrc, descripcion };
    try {
        await axios.post(urlBaseServer + "/posts", post);
        getPosts();
        // Limpiar los campos de entrada después de agregar el post
        setTitulo('');
        setImgSRC('');
        setDescripcion('');
    } catch (error) {
        console.error('Error al agregar el post', error);
    }
  };

  // este método se utilizará en el siguiente desafío
  const like = async (id) => {
    await axios.put(urlBaseServer + `/posts/like/${id}`);
    getPosts();
  };

  // este método se utilizará en el siguiente desafío
  const eliminarPost = async (id) => {
    try {
      await axios.delete(urlBaseServer + `/posts/${id}`);
      
      // Actualizar el estado de posts eliminando el post con el id correspondiente
      setPosts(posts.filter(post => post.id !== id));

    } catch (error) {
      console.error('Error al eliminar el post', error);
    }
};


  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="App">
      <h2 className="py-5 text-center">&#128248; Like Me &#128248;</h2>
      <div className="row m-auto px-5">
        <div className="col-12 col-sm-4">
          <Form
            titulo={titulo}           // Pasar el estado de titulo
            imgSrc={imgSrc}           // Pasar el estado de imgSrc
            descripcion={descripcion}  // Pasar el estado de descripcion
            setTitulo={setTitulo}
            setImgSRC={setImgSRC}
            setDescripcion={setDescripcion}
            agregarPost={agregarPost}
          />
        </div>
        <div className="col-12 col-sm-8 px-5 row posts align-items-start">
          {/* Mostrar mensaje de error si existe */}
          {error && <p className="error-message">{error}</p>} 
  
          {/* Mostrar mensaje si no hay posts */}
          {posts.length === 0 && !error && (
            <p className="no-posts-message">No se encontraron publicaciones</p>
          )}
  
          {/* Mostrar los posts */}
          {posts.map((post, i) => (
            <Post
              key={i}
              post={post}
              like={like}
              eliminarPost={eliminarPost}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
