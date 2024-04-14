import { useState } from "react";
import { IconChevronLeft } from "@tabler/icons-react";
import { IconChevronRight } from "@tabler/icons-react";

const magTypeFilters = ["md", "ml", "ms", "mw", "me", "mi", "mb", "mlg"];

export function Table({
  features,
  pagination,
  pageOptionsList,
  setPageOptions,
  newComment,
  setNewComment,
  setFeatureId,
}) {
  const [magType, setMagType] = useState("");

  function handlePrevClick() {
    const $current_page = document.querySelector(".current_page");

    if (pageOptionsList.page > 1) {
      pageOptionsList.page -= 1;
      setPageOptions(() => ({
        ...pageOptionsList,
      }));

      if ($current_page) $current_page.value = pageOptionsList.page;
    }
  }

  function handleNextClick() {
    if (pageOptionsList.page < pagination.last_page) {
      const $current_page = document.querySelector(".current_page");

      pageOptionsList.page += 1;
      setPageOptions(() => ({
        ...pageOptionsList,
      }));

      if ($current_page) $current_page.value = pageOptionsList.page;
    }
  }

  function handleSelectFilter(e) {
    pageOptionsList.magType = e.target.value;
    setMagType(e.target.value);
    setPageOptions(() => ({
      ...pageOptionsList,
    }));
  }

  function handlePageRequest(e) {
    if (e.target === document.activeElement) {
      document.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          if (e.target.value !== "" && e.target.value !== "0") {
            pageOptionsList[`${e.target.name}`] = e.target.value;
            setPageOptions(() => ({
              ...pageOptionsList,
            }));
          }
        }
      });
    }
  }

  function showCommentBox(e) {
    if (newComment) {
      setFeatureId(e.target.textContent); // Update the feature ID if the comment box is already showed
    } else {
      setFeatureId(e.target.textContent);
      setNewComment(!newComment);
    }
  }

  setTimeout(() => {
    const nextBtn = document.querySelector("#nextBtn");
    const prevBtn = document.querySelector("#prevBtn");

    if (features.length > 0) {
      if (pagination.current_page === 1 && prevBtn) {
        prevBtn.className = "disabled";
        prevBtn.disabled = true;
      } else {
        prevBtn.className = "";
        prevBtn.disabled = false;
      }

      if (pagination.current_page === pagination.last_page && nextBtn) {
        nextBtn.className = "disabled";
        nextBtn.disabled = true;
      } else {
        nextBtn.className = "";
        nextBtn.disabled = false;
      }
    }
  }, 1);

  return (
    <div className="data">
      <div className="filter">
        <span>filter by mag type </span>
        <select name="magType" onChange={handleSelectFilter}>
          {magTypeFilters.map((magType, key) => {
            return (
              <option key={key} value={magType}>
                {magType}
              </option>
            );
          })}
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>External ID</th>
            <th>Magnitude</th>
            <th>Place</th>
            <th>Time</th>
            <th>Tsunami</th>
            <th>Mag type</th>
            <th>Title</th>
            <th>Longitude</th>
            <th>Latitude</th>
            <th>Exteranl url</th>
          </tr>
        </thead>
        <tbody>
          {features.length === 0 && <tr>No records found for {magType}</tr>}
          {features.length > 0 &&
            features.map((feature) => {
              return feature.data.map((item, key) => {
                return (
                  <tr key={key}>
                    <td onClick={showCommentBox}>{item.id}</td>
                    <td>{item.type}</td>
                    <td>{item.attributes.external_id}</td>
                    <td>{item.attributes.magnitude}</td>
                    <td>{item.attributes.place}</td>
                    <td>{item.attributes.time || "null"}</td>
                    <td>{item.attributes.tsunami}</td>
                    <td>{item.attributes.mag_type}</td>
                    <td>{item.attributes.title}</td>
                    <td>{item.attributes.coordinates.longitude}</td>
                    <td>{item.attributes.coordinates.latitude}</td>
                    <td>{item.links.external_url}</td>
                  </tr>
                );
              });
            })}
        </tbody>
      </table>
      {features.length > 0 && (
        <div className="table-footer">
          <div className="pagination">
            <div className="pagination-info">
              <div className="currentPage">
                <span>Current page:</span>
                <input
                  type="text"
                  name="page"
                  className="current_page"
                  defaultValue={
                    features.length > 0 ? pagination.current_page : 0
                  }
                  onChange={handlePageRequest}
                />
              </div>
              <div className="perPage">
                <span>Per page:</span>
                <input
                  type="text"
                  name="per_page"
                  defaultValue={features.length > 0 ? pagination.per_page : 0}
                  onChange={handlePageRequest}
                />
              </div>
              <div>
                <span>
                  Last page: {features.length > 0 ? pagination.last_page : 0}
                </span>
              </div>
              <div>
                <span>Total: {features.length > 0 ? pagination.total : 0}</span>
              </div>
            </div>
            <div className="pagination-actions">
              <button id="prevBtn" onClick={handlePrevClick} disabled={true}>
                <IconChevronLeft stroke={2} />
              </button>
              <button id="nextBtn" onClick={handleNextClick}>
                <IconChevronRight stroke={2} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
