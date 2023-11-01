import React from "react";

const Newsitem = (props) => {

    let { title, description, imageurl, newsurl, author, date, source } =
      props;
    return (
      <div className="my-3">
        <div className="card" style={{ width: "18rem" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              position: "absolute",
              right: "0",
            }}
          >
            <span className="badge rounded-pill bg-danger">{source}</span>
          </div>

          <img src={ !imageurl ? "https://www.devdiscourse.com/remote.axd?https://devdiscourse.blob.core.windows.net/devnews/13_07_2023_15_52_28_1054857.png?width=920&format=jpeg": imageurl }

            className="card-img-top"
            alt="..."
          />
          
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text">
              <small className="text-muted">
                {" "}
                BY {!author ? "Unknwon" : author} on{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>
            <a
              href={newsurl}
              rel="noreferrer"
              target="_blank"
              className="btn btn-sm btn-dark"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
}

export default Newsitem;
