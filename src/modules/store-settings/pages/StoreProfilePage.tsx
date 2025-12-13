import { Card, Row, Col, Button, Tag, Image, Space } from "antd";
import {
  EditOutlined,
  MailOutlined,
  PhoneOutlined,
  GlobalOutlined,
  EnvironmentOutlined,
  ShopOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { showModal } from "../../../app/features/modalSlice";
import UpdateStoreProfile from "../components/UpdateStoreProfile";
import { useGetStoreSettingsQuery } from "../api/storeSettingsEndPoints";

const StoreProfilePage = () => {
  const { data, isLoading } = useGetStoreSettingsQuery<any>({});
  const dispatch = useDispatch();

  const store = data?.data;

  if (isLoading) {
    return <div className="text-center py-20">Loading store profile...</div>;
  }

  if (!store) {
    return (
      <div className="text-center py-20 text-red-500">Store data not found</div>
    );
  }

  return (
    <div className="p-4 md:p-8 space-y-6">
      {/* Header */}
      <Card className="rounded-2xl shadow-lg border-0 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-5">
            <Image
              src={store.logo}
              alt={store.name}
              width={90}
              height={90}
              className="rounded-full border-4 border-white shadow-md"
              preview={false}
            />

            <div>
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <ShopOutlined className="text-blue-600" />
                {store.name}
              </h1>

              <p className="text-gray-600 mt-1">
                {store.store_type} Store • {store.city}
              </p>

              <Space size="small" className="mt-2">
                <Tag color="blue">{store.prefix}</Tag>
                {store.is_affiliated_store && (
                  <Tag color="green">Affiliated</Tag>
                )}
              </Space>
            </div>
          </div>

          <Button
            size="large"
            type="primary"
            icon={<EditOutlined />}
            className="rounded-lg shadow-md"
            onClick={() =>
              dispatch(
                showModal({
                  title: "Update Store Profile",
                  content: <UpdateStoreProfile />,
                })
              )
            }
          >
            Update Store Profile
          </Button>
        </div>
      </Card>

      {/* Info Sections */}
      <Row gutter={[20, 20]}>
        {/* Basic Info */}
        <Col xs={24} md={12}>
          <Card
            title="Basic Information"
            className="rounded-xl hover:shadow-lg transition"
          >
            <InfoRow
              icon={<EnvironmentOutlined />}
              label="Address"
              value={store.address}
            />
            <InfoRow
              icon={<MailOutlined />}
              label="Email"
              value={store.contact_email}
            />
            <InfoRow
              icon={<PhoneOutlined />}
              label="Phone"
              value={store.phone_number}
            />
            <InfoRow
              icon={<GlobalOutlined />}
              label="Website"
              value={
                <a
                  href={store.website_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600"
                >
                  {store.website_url}
                </a>
              }
            />
          </Card>
        </Col>

        {/* Store Details */}
        <Col xs={24} md={12}>
          <Card
            title="Store Details"
            className="rounded-xl hover:shadow-lg transition"
          >
            <InfoRow
              label="Established"
              value={dayjs(store.established_date).format("DD MMM YYYY")}
            />
            <InfoRow label="Tax ID" value={store.tax_id} />
            <InfoRow label="Founder" value={store.founder || "Not specified"} />
            <InfoRow
              label="Return Policy"
              value={store.return_policy || "N/A"}
            />
          </Card>
        </Col>

        {/* Social Links */}
        <Col xs={24} md={12}>
          <Card
            title="Social Media"
            className="rounded-xl hover:shadow-lg transition"
          >
            <InfoRow label="Facebook" value={store.facebook_url || "N/A"} />
            <InfoRow label="Twitter" value={store.twitter_url || "N/A"} />
            <InfoRow label="LinkedIn" value={store.linkedin_url || "N/A"} />
          </Card>
        </Col>

        {/* Attendance Info */}
        <Col xs={24} md={12}>
          <Card
            title="Attendance Integration"
            className="rounded-xl hover:shadow-lg transition"
          >
            <InfoRow
              label="API URL"
              value={store.attendance_base_api_url || "N/A"}
            />
            <InfoRow
              label="Device ID"
              value={store.attendance_device_id || "N/A"}
            />
            <InfoRow
              label="Weekend Days"
              value={
                store.weekend_days.length > 0
                  ? store.weekend_days.join(", ")
                  : "None"
              }
            />
          </Card>
        </Col>
      </Row>

      {/* Description */}
      {store.description && (
        <Card title="Description" className="rounded-xl shadow-sm">
          {store.description}
        </Card>
      )}
    </div>
  );
};

export default StoreProfilePage;

/* -------------------------------- */
/* Reusable Info Row Component */
/* -------------------------------- */
const InfoRow = ({
  icon,
  label,
  value,
}: {
  icon?: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) => (
  <div className="flex justify-between items-start py-2 border-b last:border-b-0">
    <span className="text-gray-500 flex items-center gap-2">
      {icon}
      {label}
    </span>
    <span className="font-medium text-right">{value}</span>
  </div>
);
