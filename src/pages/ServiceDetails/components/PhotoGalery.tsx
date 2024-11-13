import { useState } from "react";
import { Col, Modal, Row, Image } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import PreviewGroup from "antd/es/image/PreviewGroup";

const PhotoGallery = ({
  photos,
  photoGallerySize,
}: {
  photos: string[];
  photoGallerySize: number;
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  return (
    <>
      <div className="mt-5 flex flex-wrap gap-4">
        {photos.slice(0, photoGallerySize).map((url: string, index: number) => (
          <div
            key={index}
            className="w-36 h-36 bg-white border border-gray-300 flex justify-center items-center cursor-pointer hover:shadow-md"
          >
            <img
              alt={`photo-${index}`}
              src={url}
              className="w-full h-full object-contain"
              onClick={() => setPreviewImage(url)} // Open image preview on click
            />
          </div>
        ))}

        {photos.length > photoGallerySize && (
          <div
            className="w-36 h-36 bg-white border border-gray-300 flex justify-center items-center cursor-pointer hover:shadow-md"
            onClick={() => setIsModalVisible(true)}
          >
            <PlusOutlined className="text-2xl" />
          </div>
        )}
      </div>

      <Modal
        title="Photo Gallery"
        open={isModalVisible}
        footer={null}
        onCancel={() => {
          setIsModalVisible(false);
          setPreviewImage(null);
        }}
        width={800}
      >
        <PreviewGroup>
          <Row gutter={[16, 16]}>
            {photos.map((url, index) => (
              <Col key={index} span={6}>
                <Image
                  alt={`photo-${index}`}
                  src={url}
                  onClick={() => setPreviewImage(url)}
                  style={{ cursor: "pointer" }}
                />
              </Col>
            ))}
          </Row>
        </PreviewGroup>
      </Modal>

      {previewImage && (
        <Modal
          open={!!previewImage && !isModalVisible}
          footer={null}
          onCancel={() => setPreviewImage(null)}
        >
          <img alt="Preview" src={previewImage} className="w-full h-auto" />
        </Modal>
      )}
    </>
  );
};

export default PhotoGallery;
