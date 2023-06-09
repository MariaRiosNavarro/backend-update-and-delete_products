import useSWR from "swr";
import { useRouter } from "next/router";
import { ProductCard } from "./Product.styled";
import { StyledLink } from "../Link/Link.styled";
import ProductForm from "../ProductForm";
import Comments from "../Comments";
import Button from "../Button/Button.styled";
import { useState } from "react";

const heading = "Edit the fisch";

export default function Product() {
  // Create a state called isEditMode and initialize it with false.
  const [isEditMode, setIsEditMode] = useState(false);

  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading, mutate } = useSWR(`/api/products/${id}`);
  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!data) {
    return;
  }

  //Update handle Function
  async function handleEditProduct(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const productData = Object.fromEntries(formData);

    const response = await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });

    if (response.ok) {
      mutate();
    }
  }
  //Delete Function
  async function handleDeleteProduct() {
    const response = await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      router.push("/");
    }
  }

  return (
    <>
      <ProductCard>
        <h2>{data.name}</h2>
        <p>Description: {data.description}</p>
        <p>
          Price: {data.price} {data.currency}
        </p>
        {data.reviews.length > 0 && <Comments reviews={data.reviews} />}
        <StyledLink href="/">Back to all</StyledLink>
        {/* In the return statement, add a <button> */}
        <div>
          <Button
            type="button"
            onClick={() => {
              setIsEditMode(!isEditMode);
            }}
          >
            Edit Product
          </Button>
          <Button
            type="button"
            onClick={() => handleDeleteProduct(id)}
            disabled={isEditMode}
          >
            delete Product
          </Button>
          {/* In the return statement, display the ProductForm component 
          depending on the isEditMode state (Hint: isEditMode && ...). */}
          {isEditMode && (
            <ProductForm onSubmit={handleEditProduct} heading={heading} />
          )}
        </div>
      </ProductCard>
      <StyledLink href="/">Back to all</StyledLink>
    </>
  );
}
