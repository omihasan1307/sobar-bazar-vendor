import { Card, Badge, Divider } from "antd";
import dayjs from "dayjs";
import { useGetMoneyReceiptsQuery } from "../api/moneyReceiptEndPoints";

export default function ViewMoneyReceipt({ id }: { id: number }) {
  const { data: response, isLoading } = useGetMoneyReceiptsQuery<any>({ id });

  // ✅ FIX HERE
  const receipt = response?.data?.results?.[0];

  if (isLoading) {
    return (
      <div className="w-full flex justify-center py-20">
        <span className="text-lg font-medium">Loading...</span>
      </div>
    );
  }

  if (!receipt) {
    return (
      <div className="w-full text-center py-10 text-red-500 font-semibold">
        Receipt not found
      </div>
    );
  }

  return (
    <div className="flex justify-center ">
      <Card className="w-full ">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Money Receipt</h1>

          <Badge
            color={
              receipt.payment_status === "paid"
                ? "green"
                : receipt.payment_status === "pending"
                ? "orange"
                : "red"
            }
            text={receipt.payment_status.toUpperCase()}
          />
        </div>

        <Divider />

        {/* Receipt Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-sm">
          <div className="space-y-2">
            <p>
              <strong>Receipt No:</strong> {receipt.receipt_number}
            </p>
            <p>
              <strong>Receipt Date:</strong> {receipt.receipt_date}
            </p>
            <p>
              <strong>Invoice No:</strong> {receipt.invoice_number}
            </p>
          </div>

          <div className="space-y-2">
            <p>
              <strong>Payment Method:</strong> {receipt.payment_method}
            </p>
            <p>
              <strong>Created At:</strong>{" "}
              {dayjs(receipt.created_at).format("DD MMM YYYY, hh:mm A")}
            </p>
          </div>
        </div>

        <Divider />

        {/* Amount */}
        <div className="bg-gray-50 border rounded-xl p-5">
          <div className="flex justify-between items-center">
            <span className="text-base font-medium">Total Amount</span>
            <span className="text-2xl font-bold text-green-600">
              ৳ {receipt.amount}
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
}
