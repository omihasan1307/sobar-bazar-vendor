import { ColumnsType } from "antd/es/table";
import { Tag, Space, Button } from "antd";
import dayjs from "dayjs";
import { FaEye } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { showModal } from "../../../app/features/modalSlice";
import { IStockReservation } from "../types/stockReservation";
import ViewStockReservation from "../components/ViewStockReservation";

const reservationStatusColors: Record<any, string> = {
  reserved: "blue",
  fulfilled: "green",
  released: "orange",
  expired: "red",
};

const stockReservationColumns = (): ColumnsType<IStockReservation> => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dispatch = useDispatch();

  return [
    {
      title: "SL",
      align: "center",
      width: 70,
      render: (_text, _record, index) => index + 1,
    },
    {
      title: "Product",
      dataIndex: "product_name",
      align: "center",
      sorter: (a, b) => a.product_name.localeCompare(b.product_name),
      render: (name: string) => <Tag color="blue">{name}</Tag>,
    },
    {
      title: "Variant",
      dataIndex: "variant_name",
      align: "center",
      sorter: (a, b) => a.variant_name.localeCompare(b.variant_name),
      render: (variant: string) => <Tag color="purple">{variant}</Tag>,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      align: "center",
      sorter: (a, b) => a.quantity - b.quantity,
      render: (qty: number) => <strong>{qty}</strong>,
    },
    {
      title: "Order Ref",
      dataIndex: "order_ref",
      align: "center",
      render: (ref: string) => <Tag color="geekblue">{ref}</Tag>,
    },
    {
      title: "Status",
      dataIndex: "status",
      align: "center",
      filters: [
        { text: "Reserved", value: "reserved" },
        { text: "Fulfilled", value: "fulfilled" },
        { text: "Released", value: "released" },
        { text: "Expired", value: "expired" },
      ],
      onFilter: (value, record) => record.status === value,
      sorter: (a, b) => a.status.localeCompare(b.status),
      render: (status) => (
        <Tag color={reservationStatusColors[status]}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Expires At",
      dataIndex: "expires_at",
      align: "center",
      sorter: (a, b) => dayjs(a.expires_at).unix() - dayjs(b.expires_at).unix(),
      render: (date: string) => (
        <>
          <div>{dayjs(date).format("DD MMM YYYY")}</div>
          <div className="text-xs text-gray-400">
            {dayjs(date).format("HH:mm")}
          </div>
        </>
      ),
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      align: "center",
      sorter: (a, b) => dayjs(a.created_at).unix() - dayjs(b.created_at).unix(),
      render: (date: string) => (
        <>
          <div>{dayjs(date).format("DD MMM YYYY")}</div>
          <div className="text-xs text-gray-400">
            {dayjs(date).format("HH:mm")}
          </div>
        </>
      ),
    },
    {
      title: "Actions",
      align: "center",
      fixed: "right",
      width: 120,
      render: (record) => (
        <Space>
          <Button
            size="small"
            type="default"
            title="View"
            onClick={() =>
              dispatch(
                showModal({
                  title: "Stock Reservation",
                  content: <ViewStockReservation id={record.id} />,
                })
              )
            }
          >
            <FaEye />
          </Button>
        </Space>
      ),
    },
  ];
};

export default stockReservationColumns;
