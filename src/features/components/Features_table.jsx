import { useState } from "react";
import { useEffect } from "react";
import { getFeatures } from "../services/features_service";
import { Table } from "./Table";
import { Comment } from "../../comments/components/Comment";
import "../assets/features.css";

export function FeaturesTable({
  features,
  setFeatures,
  pageOptionsList,
  pageOptions,
  setPageOptions,
}) {
  const [pagination, setPagination] = useState({});
  const [isLoading, setIsloading] = useState(true);
  const [featureId, setFeatureId] = useState("");
  const [newComment, setNewComment] = useState(false)

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getFeatures(pageOptions);
        setFeatures(data);
        if (data.length > 0) {
          setPagination(data[0].pagination);
        }
        setIsloading(false);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [pageOptions]);

  if (isLoading) {
    return <div className="loader">Loading...</div>;
  } else {

    const props = {
      "features": features,
      "pagination": pagination,
      "pageOptionsList": pageOptionsList,
      "setPageOptions": setPageOptions,
      "newComment": newComment,
      "setNewComment": setNewComment,
      "featureId": featureId,
      "setFeatureId": setFeatureId
    }

    const commentProps = {
      "featureId": featureId,
      "setFeatureId": setFeatureId,
      "newComment": newComment,
      "setNewComment": setNewComment 
    }

    return (
      <div>
        <Table {...props} />
        { newComment && <Comment {...commentProps}/> }
      </div>
    );
  }
}
