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
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);  
  const [currentPostId, setCurrentPostId] = useState(null);  

  const getPosts = async () => {
    try {
      const { data: posts } = await axios.get(urlBaseServer + "/posts");
      setPosts([...posts]);
      setError('');  
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message); 
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
        setTitulo('');
        setImgSRC('');
        setDescripcion('');
    } catch (error) {
        console.error('Error al agregar el post', error);
    }
  };


  const editarPost = async (id) => {
    const postActual = posts.find(post => post.id === id);
    
    const updatedPost = { 
      titulo, 
      url: imgSrc, 
      descripcion, 
      likes: postActual.likes
    };
    
    try {
      await axios.put(urlBaseServer + `/posts/${id}`, updatedPost);
      getPosts();
      setTitulo('');
      setImgSRC('');
      setDescripcion('');
      setIsEditing(false); 
    } catch (error) {
      console.error('Error al editar el post', error);
    }
  };
  

  const cargarDatosParaEditar = (post) => {
    setTitulo(post.titulo);
    setImgSRC(post.img);
    setDescripcion(post.descripcion);
    setCurrentPostId(post.id);
    setIsEditing(true);  
  };

  const like = async (id) => {
    await axios.put(urlBaseServer + `/posts/like/${id}`);
    getPosts();
  };

  const eliminarPost = async (id) => {
    try {
      await axios.delete(urlBaseServer + `/posts/${id}`);
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
            titulo={titulo}
            imgSrc={imgSrc}
            descripcion={descripcion}
            setTitulo={setTitulo}
            setImgSRC={setImgSRC}
            setDescripcion={setDescripcion}
            agregarPost={isEditing ? () => editarPost(currentPostId) : agregarPost}
            isEditing={isEditing} 
          />
        </div>
        <div className="col-12 col-sm-8 px-5 row posts align-items-start">
          {error && <p className="error-message">{error}</p>} 
          {posts.length === 0 && !error && (
            <p className="no-posts-message">No se encontraron publicaciones</p>
          )}
          {posts.map((post, i) => (
            <Post
              key={i}
              post={post}
              like={like}
              eliminarPost={eliminarPost}
              cargarDatosParaEditar={cargarDatosParaEditar} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
