// import React from "react";
// import { useState,useEffect } from "react";

import React, { useState, useEffect } from "react";

function ProductProjectApi()
{

    const [project_id,setPorjectId] = useState([]);
    // return <h1>Hello  i am vishnu reddy<br />
    //     how are you
    // </h1>

    useEffect(() => 
      {
        fetch("https://dummyjson.com/products")
        .then((Response) => Response.json())
        .then((date) =>
            {
             setPorjectId(date);
           });
 
      },[]);

    return (
        <div>
            <h1>Product Project API</h1>
            <ul>
                {Array.isArray(project_id.products) && project_id.products.map((user) => (
                    <li key={user.id} style={{marginBottom: '30px', border: '1px solid #ccc', padding: '10px', borderRadius: '8px'}}>
                      <strong>ID:</strong> {user.id}<br />
                      <strong>Title:</strong> {user.title}<br />
                      <strong>Description:</strong> {user.description}<br />
                      <strong>Category:</strong> {user.category}<br />
                      <strong>Price:</strong> ${user.price}<br />
                      <strong>Discount %:</strong> {user.discountPercentage}<br />
                      <strong>Rating:</strong> {user.rating}<br />
                      <strong>Stock:</strong> {user.stock}<br />
                      <strong>Tags:</strong> {user.tags && user.tags.join(', ')}<br />
                      <strong>Brand:</strong> {user.brand}<br />
                      <strong>SKU:</strong> {user.sku}<br />
                      <strong>Weight:</strong> {user.weight}<br />
                      <strong>Dimensions:</strong> {user.dimensions && `W: ${user.dimensions.width}, H: ${user.dimensions.height}, D: ${user.dimensions.depth}`}<br />
                      <strong>Warranty:</strong> {user.warrantyInformation}<br />
                      <strong>Shipping:</strong> {user.shippingInformation}<br />
                      <strong>Availability:</strong> {user.availabilityStatus}<br />
                      <strong>Return Policy:</strong> {user.returnPolicy}<br />
                      <strong>Min Order Qty:</strong> {user.minimumOrderQuantity}<br />
                      <strong>Meta:</strong> Barcode: {user.meta && user.meta.barcode}, QR: <a href={user.meta && user.meta.qrCode} target="_blank" rel="noopener noreferrer">QR Link</a><br />
                      <strong>Created At:</strong> {user.meta && user.meta.createdAt}<br />
                      <strong>Updated At:</strong> {user.meta && user.meta.updatedAt}<br />
                      <strong>Thumbnail:</strong><br />
                      <img src={user.thumbnail} alt={user.title} width="100" /><br />
                      <strong>Images:</strong><br />
                      {user.images && user.images.map((img, idx) => (
                        <img key={idx} src={img} alt={user.title + ' img'} width="80" style={{marginRight: '5px'}} />
                      ))}<br />
                      <strong>Reviews:</strong>
                      <ul>
                        {user.reviews && user.reviews.map((review, idx) => (
                          <li key={idx}>
                            <strong>Rating:</strong> {review.rating}, <strong>Comment:</strong> {review.comment}, <strong>Reviewer:</strong> {review.reviewerName} ({review.reviewerEmail}), <strong>Date:</strong> {review.date}
                          </li>
                        ))}
                      </ul>
                    </li>
                ))}
            </ul>
        </div>


    );
   

}
export default ProductProjectApi;






