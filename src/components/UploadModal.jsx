import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { Modal, Form, Input, Button, Upload, Select } from "antd";
import fox from "./avatars/fox.jpg";
import cat from "./avatars/cat.jpg";
import raccoon from "./avatars/raccoon.jpg";
import zebra from "./avatars/zebra.jpg";
import panda from "./avatars/panda.jpg";

const firebaseConfig = {
  apiKey: "AIzaSyC3axfbGmwFpFKpkyBqgCr2TRlN__yTolA",
  authDomain: "image-loader-nj.firebaseapp.com",
  projectId: "image-loader-nj",
  storageBucket: "image-loader-nj.appspot.com",
  messagingSenderId: "260378560798",
  appId: "1:260378560798:web:6e6d79937f48363133610f",
};

export default function UploadModal({ setShowUpload, setPhotoList }) {
  const handleNewPhoto = (values) => {
    console.log(values);
    const app = initializeApp(firebaseConfig);
    const storage = getStorage(app);
    const filename = values.photo.file.name;
    const imageRef = ref(storage, `photos/${filename}`);
    uploadBytes(imageRef, values.photo.file.originFileObj)
      .then(() => console.log("upload successful"))
      .catch((err) => console.error(err));
    const photoUrl = `https://firebasestorage.googleapis.com/v0/b/image-loader-nj.appspot.com/o/photos%2F${filename}?alt=media`;
    let newPhotoObj = values;
    newPhotoObj.photo = photoUrl;
    fetch(`${process.env.REACT_APP_ENDPOINT}/photos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPhotoObj),
    })
      .then((results) => results.json())
      .then((newListOfPhotos) => {
        setPhotoList(newListOfPhotos);
        closeModal();
      })
      .catch(alert);
  };
  const closeModal = () => setShowUpload(false);
  return (
    <Modal title="Upload Image" open={true} footer={null} onCancel={closeModal}>
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={handleNewPhoto}
      >
        <Form.Item label="User Name" name="username">
          <Input required />
        </Form.Item>
        <Form.Item label="Avatar" name="avatar">
          <Select>
            <Select.Option value={fox}>Fox</Select.Option>
            <Select.Option value={cat}>Cat</Select.Option>
            <Select.Option value={panda}>Panda</Select.Option>
            <Select.Option value={raccoon}>Raccoon</Select.Option>
            <Select.Option value={zebra}>Zebra</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Photo" name="photo">
          <Upload listType="picture-card">
            +<br />
            Upload
          </Upload>
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input.TextArea rows={4} required />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Upload Image
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
