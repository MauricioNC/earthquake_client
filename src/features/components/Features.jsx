import { useState } from "react";
import { FeaturesTable } from "./Features_table";
import '../assets/features.css'

const pageOptionsList = {
  page: 1,
  per_page: 20,
  magType: "",
};

function Features() {
  const [features, setFeatures] = useState([]);
  const [pageOptions, setPageOptions] = useState(pageOptionsList);

  const props = {
    "features": features,
    "setFeatures": setFeatures,
    "pageOptionsList": pageOptionsList,
    "pageOptions": pageOptions,
    "setPageOptions": setPageOptions,
  }

  return (
    <FeaturesTable {...props} />
  );
}

export default Features;
