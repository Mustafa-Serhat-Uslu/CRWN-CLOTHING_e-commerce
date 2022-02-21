import React from "react";
import { Route } from "react-router-dom";

import { fetchCollectionsStart } from "../../../redux/shop/shop.actions";

import CollectionsOverviewContainer from "../../collections-overview/collections-overview.container";
import CollectionPageContainer from "../collection/collection.container";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const ShopPage = ({ match }) => {

  const dispatch = useDispatch();
  
  useEffect(() => { //watchOut for double rendering
    dispatch(fetchCollectionsStart());
  }, [dispatch]);

  return (
    <div className='shop-page'>
      <Route
        exact
        path={`${match.path}`}
        component={CollectionsOverviewContainer}
      />
      <Route
        path={`${match.path}/:collectionId`}
        component={CollectionPageContainer}
      />
    </div>
  );
};

export default ShopPage;