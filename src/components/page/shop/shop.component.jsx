import React from "react";

import CollectionsOverview from "../../collections-overview/collections-overview.component";

import { selectCollections } from "../../../redux/shop/shop.selectors";

const ShopPage = ({ collections }) => (
  <div className="shop-page">
    <CollectionsOverview />
  </div>
);

export default ShopPage;