import ProductList from "../components/ProductList";
import styled from "styled-components";
import ProductForm from "../components/ProductForm";
import useSWR from "swr";
// import { useState } from "react";

const Heading = styled.h1`
  text-align: center;
  color: var(--color-nemo);
`;
const heading = "Add a new Fish";

export default function HomePage() {
  //Refactoring
  const { mutate } = useSWR("/api/products");

  async function handleAddProduct(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const productData = Object.fromEntries(formData);

    const response = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      console.error(response.status);
      return;
    }

    mutate();

    event.target.reset();
  }

  return (
    <>
      <Heading>
        <span role="img" aria-label="A fish">
          🐠
        </span>
        Fish Shop
      </Heading>
      <ProductForm onSubmit={handleAddProduct} heading={heading} />
      <hr />
      <ProductList />
    </>
  );
}
