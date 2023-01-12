import { initializeApp } from "firebase/app";
import { getFirestore, addDoc, getDocs, getDoc, collection, doc } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAWItBUovmaDF2ru6eUoChoy1kfOtJE77A",
    authDomain: "proyectoreact-73f37.firebaseapp.com",
    projectId: "proyectoreact-73f37",
    storageBucket: "proyectoreact-73f37.appspot.com",
    messagingSenderId: "1025466101682",
    appId: "1:1025466101682:web:d77a9a3632d6d47f1fbeab"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const db = getFirestore();

const crearBDD = async () => {
    const promise = await fetch('./json/productos.json')
    const productos = await promise.json()
    productos.forEach(async (prod) => {
        await addDoc(collection(db, "productos"), {
            nombre: prod.nombreProducto,
            descripcion: prod.descripcionProducto,
            precio: prod.precioProducto,
            idCategoria: prod.idCategoria,
            stock: prod.stock,
            img: prod.imgProducto
        })
    })
}

const getProductos = async () => {
    const productos = await getDocs(collection(db, "productos"))
    const items = productos.docs.map (prod => {
        return {...prod.data(), id: prod.id}
    })
    return items
}

const getProducto = async (id) =>{
    const producto = await getDoc(doc(db, "productos", id))
    const item = {...producto.data(), id: producto.id }
    return item
}

export { crearBDD, getProductos, getProducto }