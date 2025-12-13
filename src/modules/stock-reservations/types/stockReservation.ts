export type StockReservationStatus =
  | "reserved"
  | "fulfilled"
  | "released"
  | "expired";

export interface IStockReservation {
  id: number;
  product_name: string;
  variant_name: string;
  quantity: number;
  order_ref: string;
  status: StockReservationStatus; // read-only from API
  expires_at: string; // ISO datetime
  created_at: string; // ISO datetime
}
