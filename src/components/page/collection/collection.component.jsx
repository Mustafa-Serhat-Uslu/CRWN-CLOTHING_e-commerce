import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import CollectionItem from "../../collection-item/collection-item.component";

import { selectCollection } from "../../../redux/shop/shop.selectors";

import "./collection.styles.scss";

// Match comes from Route from App.js
const CollectionPage = () => {
  const {collectionId} = useParams(); // destructuring all parameters to get collectionId, al log as not unmounted wont rerun 
  const collection = useSelector(selectCollection(collectionId)); // shop/collections/SNEAKERS(collectionId)/item/0-1-2... // 

  // ! bc we r using reselect momoization, useSelector wont regather values each time component re-renders

  const { title, items } = collection;
  return (  
    <div className="collection-page">
      <h2 className="title">{title}</h2>
      <div className="items">
        {items.map((item) => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default CollectionPage;
