import { UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  FormInstance,
  Input,
  Upload,
  UploadFile
} from "antd";
import { useState } from "react";
import "../../../style.css";

function OptionalFieldsStep({ formData } : {formData : FormInstance<any>}) {
  const onValuesChange = (changedValues: any, allValues: any) => {
    const key = Object.keys(changedValues)[0];
    formData.setFieldValue(key, changedValues[key]);
  };

  const [profileImage, setProfileImage] =  useState<UploadFile | null>(null);

  const handleFileChange = ({ fileList }: { fileList: UploadFile[] }) => {
    if (fileList.length > 0) {
      setProfileImage(fileList[0]);
    } else {
      setProfileImage(null);
    }
  };

  const [photos, setPhotos] =  useState<UploadFile[]>([]);

  const handlePhotosChange = ({ fileList }: { fileList: UploadFile[] }) => {
    setPhotos(fileList);
  };

  return (
    <Form
      layout="vertical"
      form={formData}
      className="photos"
      onValuesChange={onValuesChange}
    >
      <Form.Item
        label="Upload your profile picture"
        name="avatar"
        getValueFromEvent={({ fileList }: { fileList: UploadFile[] }) =>
          fileList[0]
        }
      >
        <Upload
          name="avatar"
          fileList={
            profileImage ? [profileImage] : []
          }
          onChange={handleFileChange}
          listType="picture"
          maxCount={1}
          showUploadList={{ showRemoveIcon: true }}
        >
          <Button icon={<UploadOutlined />}>Upload Image</Button>
        </Upload>
      </Form.Item>
      {formData.getFieldValue("userType") !== "1" ? (
        <>
          <Form.Item
            label="Upload Multiple Images (max 10)"
            name="photos"
            getValueFromEvent={({ fileList }: { fileList: UploadFile[] }) =>
              fileList
            }
          >
            <Upload
              name="photos"
              fileList={photos}
              onChange={handlePhotosChange}
              listType="picture-card"
              maxCount={10}
              showUploadList={{ showRemoveIcon: true }}
              multiple
            >
              <Button icon={<UploadOutlined />}>Upload Image</Button>
            </Upload>
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input.TextArea rows={4} placeholder="Enter a brief description" />
          </Form.Item>
        </>
      ) : (
        <></>
      )}
    </Form>
  );
}

export default OptionalFieldsStep;