import {
  Row,
  Col,
  Card,
  Input,
  Upload,
  Avatar,
  DatePicker,
  Switch,
  Typography,
  Divider,
  Modal,
  Select,
} from "antd";
import { useEffect, useState } from "react";
import { Form } from "../../../common/CommonAnt";
import { Form as AntForm } from "antd";
import dayjs from "dayjs";
import { UserOutlined } from "@ant-design/icons";
import {
  useGetStoreSettingsQuery,
  useUpdateStoreSettingsMutation,
} from "../api/storeSettingsEndPoints";

const { Title, Text } = Typography;

const storeTypes = ["Enterprise", "Company"];

const weekdays = [
  "Saturday",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];

const UpdateStoreProfile = () => {
  const { data } = useGetStoreSettingsQuery<any>({});
  const [update, { isLoading }] = useUpdateStoreSettingsMutation();

  const [form] = AntForm.useForm();

  const [imageFileList, setImageFileList] = useState<any[]>([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const store = data?.data;

  /* -------------------------------- */
  /* Prefill Form */
  /* -------------------------------- */
  useEffect(() => {
    if (!store) return;

    const normalized = { ...store };
    Object.keys(normalized).forEach((key) => {
      if (normalized[key] === null) normalized[key] = "";
    });

    const initialLogo =
      typeof store.logo === "string" && store.logo
        ? [
            {
              uid: "-1",
              url: store.logo,
              thumbUrl: store.logo,
              name: "Store Logo",
            },
          ]
        : [];

    setImageFileList(initialLogo);

    form.setFieldsValue({
      ...normalized,
      established_date: store.established_date
        ? dayjs(store.established_date)
        : undefined,
      logo: initialLogo,
    });
  }, [store, form]);

  /* -------------------------------- */
  /* Handlers */
  /* -------------------------------- */
  const handleImageChange = ({ fileList }: any) => setImageFileList(fileList);

  const handlePreview = (file: any) => {
    setPreviewImage(file.thumbUrl || file.url);
    setPreviewVisible(true);
  };

  const onFinish = (values: any) => {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]: any) => {
      if (key === "logo" && Array.isArray(value)) {
        value.forEach((file) => {
          if (file?.originFileObj instanceof File) {
            formData.append("logo", file.originFileObj);
          }
        });
      } else if (key === "established_date" && value) {
        formData.append(key, dayjs(value).format("YYYY-MM-DD"));
      } else if (key === "is_affiliated_store") {
        formData.append(key, value ? "true" : "false");
      } else if (Array.isArray(value)) {
        value.forEach((v) => formData.append(key, v));
      } else {
        formData.append(key, value);
      }
    });

    update({ data: formData });
  };

  /* -------------------------------- */
  /* UI */
  /* -------------------------------- */
  return (
    <div className="p-4 md:p-8">
      <Title level={3}>Update Store Profile</Title>
      <Text type="secondary">Update your store information carefully</Text>

      <Divider />

      <Form form={form} onFinish={onFinish} isLoading={isLoading}>
        <Row gutter={[24, 24]}>
          {/* Logo */}
          <Col xs={24}>
            <Card title="Store Logo">
              <AntForm.Item
                name="logo"
                valuePropName="fileList"
                getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
              >
                <Upload
                  listType="picture-card"
                  fileList={imageFileList}
                  onChange={handleImageChange}
                  onPreview={handlePreview}
                  beforeUpload={() => false}
                >
                  {imageFileList.length === 0 && (
                    <div className="text-center">
                      <Avatar size={96} icon={<UserOutlined />} />
                      <p className="mt-2">Upload Logo</p>
                    </div>
                  )}
                </Upload>
              </AntForm.Item>
            </Card>
          </Col>

          {/* Basic Information */}
          <Col xs={24}>
            <Card title="Basic Information">
              <Row gutter={[16, 16]}>
                <Col xs={24} md={8}>
                  <Form.Item name="name" label="Store Name">
                    <Input size="large" />
                  </Form.Item>
                </Col>

                <Col xs={24} md={4}>
                  <Form.Item name="prefix" label="Prefix">
                    <Input size="large" />
                  </Form.Item>
                </Col>

                <Col xs={24} md={4}>
                  <Form.Item name="store_type" label="Store Type">
                    <Select size="large">
                      {storeTypes.map((t) => (
                        <Select.Option key={t} value={t}>
                          {t}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>

                <Col xs={24} md={8}>
                  <Form.Item name="founder" label="Founder">
                    <Input size="large" />
                  </Form.Item>
                </Col>

                <Col xs={24} md={8}>
                  <Form.Item name="contact_email" label="Contact Email">
                    <Input size="large" />
                  </Form.Item>
                </Col>

                <Col xs={24} md={8}>
                  <Form.Item name="phone_number" label="Phone Number">
                    <Input size="large" />
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          </Col>

          {/* Location */}
          <Col xs={24}>
            <Card title="Location Information">
              <Row gutter={[16, 16]}>
                <Col xs={24} md={8}>
                  <Form.Item name="address" label="Address">
                    <Input size="large" />
                  </Form.Item>
                </Col>

                <Col xs={24} md={4}>
                  <Form.Item name="city" label="City">
                    <Input size="large" />
                  </Form.Item>
                </Col>

                <Col xs={24} md={4}>
                  <Form.Item name="latitude" label="Latitude">
                    <Input size="large" type="number" />
                  </Form.Item>
                </Col>

                <Col xs={24} md={4}>
                  <Form.Item name="longitude" label="Longitude">
                    <Input size="large" type="number" />
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          </Col>

          {/* Store Details */}
          <Col xs={24}>
            <Card title="Store Details">
              <Row gutter={[16, 16]}>
                <Col xs={24} md={6}>
                  <Form.Item name="established_date" label="Established Date">
                    <DatePicker className="w-full" size="large" />
                  </Form.Item>
                </Col>

                <Col xs={24} md={6}>
                  <Form.Item name="tax_id" label="Tax ID">
                    <Input size="large" />
                  </Form.Item>
                </Col>

                <Col xs={24} md={6}>
                  <Form.Item
                    name="is_affiliated_store"
                    label="Affiliated Store"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          </Col>

          {/* Online Presence */}
          <Col xs={24}>
            <Card title="Online Presence">
              <Row gutter={[16, 16]}>
                <Col xs={24} md={6}>
                  <Form.Item name="website_url" label="Website">
                    <Input size="large" />
                  </Form.Item>
                </Col>

                <Col xs={24} md={6}>
                  <Form.Item name="facebook_url" label="Facebook">
                    <Input size="large" />
                  </Form.Item>
                </Col>

                <Col xs={24} md={6}>
                  <Form.Item name="twitter_url" label="Twitter">
                    <Input size="large" />
                  </Form.Item>
                </Col>

                <Col xs={24} md={6}>
                  <Form.Item name="linkedin_url" label="LinkedIn">
                    <Input size="large" />
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          </Col>

          {/* Attendance */}
          <Col xs={24}>
            <Card title="Attendance Integration">
              <Row gutter={[16, 16]}>
                <Col xs={24} md={8}>
                  <Form.Item name="attendance_base_api_url" label="API URL">
                    <Input size="large" />
                  </Form.Item>
                </Col>

                <Col xs={24} md={8}>
                  <Form.Item name="attendance_api_key" label="API Key">
                    <Input size="large" />
                  </Form.Item>
                </Col>

                <Col xs={24} md={8}>
                  <Form.Item name="attendance_device_id" label="Device ID">
                    <Input size="large" />
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          </Col>

          {/* Weekend Days */}
          <Col xs={24}>
            <Card title="Weekend Days">
              <Form.Item name="weekend_days">
                <Select
                  mode="multiple"
                  size="large"
                  placeholder="Select weekend days"
                >
                  {weekdays.map((day) => (
                    <Select.Option key={day} value={day}>
                      {day}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Card>
          </Col>

          {/* Description & Policy */}
          <Col xs={24}>
            <Card title="Description & Policies">
              <Form.Item name="description" label="Description">
                <Input.TextArea rows={3} />
              </Form.Item>

              <Form.Item name="return_policy" label="Return Policy">
                <Input.TextArea rows={3} />
              </Form.Item>
            </Card>
          </Col>
        </Row>
      </Form>

      <Modal
        open={previewVisible}
        footer={null}
        onCancel={() => setPreviewVisible(false)}
      >
        <img src={previewImage} className="w-full" />
      </Modal>
    </div>
  );
};

export default UpdateStoreProfile;
