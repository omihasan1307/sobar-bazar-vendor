import api from "../../../app/api/api";
import { FilterTypes } from "../../../app/features/filterSlice";
import { ApiResponse, PaginatedResponse } from "../../../app/utils/constant";
import { handleOnQueryStarted } from "../../../app/utils/onQueryStartedHandler";
import { TagTypes } from "../../../app/utils/tagTypes";
import { IStoreSettings } from "../types/storeSettingsType";

const storeSettingsEndPointsEndpoint = api.injectEndpoints({
  endpoints: (builder) => ({
    getStoreSettings: builder.query<
      ApiResponse<PaginatedResponse<IStoreSettings>>,
      FilterTypes
    >({
      query: (params) => ({
        url: "/api/v1.0/stores/me/",
        params,
      }),
      providesTags: [
        {
          type: TagTypes.STORE_SETTINGS,
          id: TagTypes.STORE_SETTINGS + "_ID",
        },
      ],
    }),

    updateStoreSettings: builder.mutation<
      ApiResponse<IStoreSettings>,
      { data: FormData }
    >({
      query: ({ data }) => ({
        url: `/api/v1.0/stores/me/`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [
        {
          type: TagTypes.STORE_SETTINGS,
          id: TagTypes.STORE_SETTINGS + "_ID",
        },
      ],
    }),
  }),
});

export const { useGetStoreSettingsQuery, useUpdateStoreSettingsMutation } =
  storeSettingsEndPointsEndpoint;
