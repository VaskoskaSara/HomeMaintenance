import { Image, Spin, Table, Typography } from "antd";
import { Content } from "antd/es/layout/layout";
import Column from "antd/es/table/Column";
import { useParams } from "react-router-dom";
import { getFetcher } from "src/api/apiQuery";
import AppWrapper from "src/pages/common/AppWrapper/AppWrapper";
import { ApiResponse } from "src/pages/RegisterPage/RegisterPage.props";
import useSWR from "swr";
import PhotoGallery from "./PhotoGalery";

const ReviewsComponent = () => {
  const { id } = useParams();
  const { Title } = Typography;

  const { data: reviews, isLoading } = useSWR<ApiResponse<any>>(
    `api/user/reviews/${id}`,
    getFetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  if (isLoading) {
    return (
      <AppWrapper>
        <Content className="self-center content-center">
          <Spin size="large" tip="Loading..." />
        </Content>
      </AppWrapper>
    );
  }

  return (
    <Table<any> dataSource={reviews?.data} className="m-10">
      <Column
        title="Customer"
        dataIndex="fullName"
        key="fullName"
        render={(text: string, record: any) => (
          <span className="flex">
            <Image width={50} src={record.avatar} />
            <Title level={4} className="ml-2 self-center">{text}</Title>
          </span>
        )}
      />
      <Column title="Comment" dataIndex="comment" key="comment" />
      <Column title="Ratings" dataIndex="ratings" key="ratings" />
      <Column title="Images" dataIndex="photos" key="photos" 
      render={(text: string[]) => (
          <PhotoGallery photos={text} photoGallerySize={3}/>
      )}/>
    </Table>
  );
};

export default ReviewsComponent;
