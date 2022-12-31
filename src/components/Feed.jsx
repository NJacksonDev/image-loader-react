import { useState, useEffect } from "react";
import { Button } from "antd";
import UploadModal from "./UploadModal";
import Header from "./Header";
import Post from "./Post";

export default function Feed({ setUser }) {
  const [photoList, setPhotoList] = useState();
  const [showUpload, setShowUpload] = useState(false);
  useEffect(() => {
    fetch(process.env.REACT_APP_ENDPOINT)
      .then((results) => results.json())
      .then((data) => setPhotoList(data))
      .catch(alert);
  }, [setPhotoList]);
  return (
    <section className="photo-feed">
      <Header setUser={setUser} />
      {!photoList ? (
        <p>Loading...</p>
      ) : (
        photoList.map((post) => (
          <Post setPhotoList={setPhotoList} post={post} key={post.photoId} />
        ))
      )}
      {showUpload ? (
        <UploadModal
          setPhotoList={setPhotoList}
          setShowUpload={setShowUpload}
        />
      ) : null}
      <Button
        onClick={() => setShowUpload(true)}
        className="fab"
        type="primary"
        shape="circle"
        size="large"
      >
        +
      </Button>
    </section>
  );
}
