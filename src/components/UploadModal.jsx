import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { Modal, Form, Input, Button, Upload, Select } from "antd";

const firebaseConfig = {
  apiKey: "AIzaSyBcm7LwmgXHX-2LnWzaybUzuUy1GsjN5l8",
  authDomain: "upload-storage-nj.firebaseapp.com",
  projectId: "upload-storage-nj",
  storageBucket: "upload-storage-nj.appspot.com",
  messagingSenderId: "470398372734",
  appId: "1:470398372734:web:f94220590546776878412f",
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
    const photoUrl = `https://firebasestorage.googleapis.com/v0/b/upload-storage-nj.appspot.com/o/photos%2F${filename}?alt=media`;
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
            <Select.Option value="🐬">Dolphin → 🐬</Select.Option>
            <Select.Option value="🦊">Fox → 🦊</Select.Option>
            <Select.Option value="🐨">Koala → 🐨</Select.Option>
            <Select.Option value="🐸">Frog → 🐸</Select.Option>
            <Select.Option value="🦁">Lion → 🦁</Select.Option>
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
