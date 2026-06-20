import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { Container, Spinner } from "react-bootstrap";
import { db } from "../firebase/firebaseConfig";
import type { Product } from "../types/Product";
import ItemList from "./ItemList";

const ItemListContainer = () => {
  const { category } = useParams<{ category: string }>();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);

      let productsRef = collection(db, "pokemons");

      const productsQuery = category
        ? query(productsRef, where("category", "==", category))
        : productsRef;

      const snapshot = await getDocs(productsQuery);

      const productsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Product[];

      setProducts(productsData);
      setLoading(false);
    };

    getProducts();
  }, [category]);

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" />
        <p>Loading products...</p>
      </Container>
    );
  }

  if (products.length === 0) {
    return (
      <Container className="mt-5 text-center">
        <h2>No hay productos disponibles</h2>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <ItemList products={products} />
    </Container>
  );
};

export default ItemListContainer;