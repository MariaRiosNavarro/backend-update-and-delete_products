import dbConnect from "../../../db/connect";
import Product from "../../../db/models/Product";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "GET") {
    const product = await Product.findById(id).populate("reviews");

    if (!product) {
      return response.status(404).json({ status: "Not Found" });
    }

    response.status(200).json(product);
  }

  //UPDATE REQUEST with PUT

  // /api/products/[id].js
  if (request.method === "PUT") {
    await Product.findByIdAndUpdate(id, {
      $set: request.body,
    });
    // Find the Product by its ID and update the content that is part of the request body!
    response
      .status(200)
      .json({ status: `Product ${id} successfully updated!` });
    // If successful, you'll receive an OK status code.
    return;
  }

  //DELETE ROUTE

  if (request.method === "DELETE") {
    await Product.findByIdAndDelete(id);
    response.status(200).json({ status: "Product successfully deleted." });
  }
  return;
}
