import api from "../../../app/api/api";
import { FilterTypes } from "../../../app/features/filterSlice";
import { ApiResponse, PaginatedResponse } from "../../../app/utils/constant";
import { TagTypes } from "../../../app/utils/tagTypes";
import { IStockReservation } from "../types/stockReservation";

const stockReservationEndpoint = api.injectEndpoints({
  endpoints: (builder) => ({
    getStockReservation: builder.query<
      ApiResponse<PaginatedResponse<IStockReservation>>,
      FilterTypes
    >({
      query: (params) => ({
        url: "/api/v1.0/stores/store-stock-reservations/",
        params,
      }),
      providesTags: [
        {
          type: TagTypes.STOCK_RESERVATION,
          id: TagTypes.STOCK_RESERVATION + "_ID",
        },
      ],
    }),

    getSingleStockReservation: builder.query<ApiResponse<any>, any>({
      query: ({ id }: any) => ({
        url: `/api/v1.0/stores/store-stock-reservations/${id}/`,
      }),

      providesTags: [
        {
          type: TagTypes.STOCK_RESERVATION,
          id: TagTypes.STOCK_RESERVATION + "_ID",
        },
      ],
    }),

    deleteStockReservation: builder.mutation<
      ApiResponse<IStockReservation>,
      { id: any }
    >({
      query: ({ id }) => ({
        url: `/api/v1.0/stores/store-stock-reservations/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: [
        {
          type: TagTypes.STOCK_RESERVATION,
          id: TagTypes.STOCK_RESERVATION + "_ID",
        },
      ],
    }),
  }),
});

export const {
  useDeleteStockReservationMutation,
  useGetSingleStockReservationQuery,
  useGetStockReservationQuery,
} = stockReservationEndpoint;
