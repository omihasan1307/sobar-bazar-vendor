import { Card, Badge, Divider } from "antd";
import dayjs from "dayjs";
import { useGetSingleStockReservationQuery } from "../api/stockReservationEndPoints";

const reservationStatusColors: Record<string, string> = {
  reserved: "blue",
  fulfilled: "green",
  released: "orange",
  expired: "red",
};

export default function ViewStockReservation({ id }: { id: number }) {
  const { data: response, isLoading } = useGetSingleStockReservationQuery<any>({
    id,
  });

  // 🔹 API returns paginated
  const reservation = response?.data?.results?.[0];

  if (isLoading) {
    return (
      <div className="w-full flex justify-center py-20">
        <span className="text-lg font-medium">Loading...</span>
      </div>
    );
  }

  if (!reservation) {
    return (
      <div className="w-full text-center py-10 text-red-500 font-semibold">
        Stock reservation not found
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <Card className="w-full rounded-xl">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Stock Reservation Details</h1>

          <Badge
            color={reservationStatusColors[reservation.status]}
            text={reservation.status.toUpperCase()}
          />
        </div>

        <Divider />

        {/* Product Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div className="space-y-2">
            <p>
              <strong>Product Name:</strong>{" "}
              <span className="text-gray-700">{reservation.product_name}</span>
            </p>
            <p>
              <strong>Variant:</strong>{" "}
              <span className="text-gray-700">{reservation.variant_name}</span>
            </p>
            <p>
              <strong>Quantity Reserved:</strong>{" "}
              <span className="font-semibold">{reservation.quantity}</span>
            </p>
          </div>

          <div className="space-y-2">
            <p>
              <strong>Order Reference:</strong>{" "}
              <span className="text-gray-700">{reservation.order_ref}</span>
            </p>
            <p>
              <strong>Created At:</strong>{" "}
              {dayjs(reservation.created_at).format("DD MMM YYYY, hh:mm A")}
            </p>
            <p>
              <strong>Expires At:</strong>{" "}
              {dayjs(reservation.expires_at).format("DD MMM YYYY, hh:mm A")}
            </p>
          </div>
        </div>

        <Divider />

        {/* Expiry Highlight */}
        <div className="bg-gray-50 border rounded-xl p-4">
          <div className="flex justify-between items-center">
            <span className="font-medium">Reservation Status</span>

            <span className="font-semibold">
              {dayjs().isAfter(dayjs(reservation.expires_at)) ? (
                <span className="text-red-600">Expired</span>
              ) : (
                <span className="text-green-600">
                  Expires in{" "}
                  {dayjs(reservation.expires_at).diff(dayjs(), "hour")} hours
                </span>
              )}
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
}
