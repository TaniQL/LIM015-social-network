export const postCollection = (post, userName, photo, email) => firebase.firestore().collection('posts').add({
  user: userName,
  text: post,
  photo,
  email,
  heart: [],
  timePost: firebase.firestore.FieldValue.serverTimestamp(),
});

// Función para traer la postCollection
export const getCollection = () => firebase.firestore().collection('posts').orderBy('timePost', 'desc');

// Función para traer todos los posts de firestore
export const getPost = (id) => firebase.firestore().collection('posts').doc(id).get();

// Función que crea la colección de usuarios
export const postUserCollection = (usuario, email) => firebase.firestore().collection('user').add({
  usuario,
  email,
});

// Función que trae la collección de usuarios
export const getUserCollection = () => firebase.firestore().collection('user');

// Función para eliminar posts
export const deletePost = (id) => firebase.firestore().collection('posts').doc(id).delete();

// Función para editar posts
export const editPost = (id, updatePost) => firebase.firestore().collection('posts').doc(id).update({ text: updatePost });

// Funcion para dar like
export const editHeart = (id, heart) => firebase.firestore().collection('posts').doc(id).update({ heart });
