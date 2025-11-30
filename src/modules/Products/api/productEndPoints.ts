import api from "../../../app/api/api";
import { FilterTypes } from "../../../app/features/filterSlice";
import { ApiResponse, PaginatedResponse } from "../../../app/utils/constant";
import { handleOnQueryStarted } from "../../../app/utils/onQueryStartedHandler";
import { TagTypes } from "../../../app/utils/tagTypes";
import { ICreateProduct, IProducts } from "../types/productsType";

const productsEndpoint = api.injectEndpoints({
  endpoints: (builder) => ({
    getSubCategories: builder.query<
      ApiResponse<PaginatedResponse<IProducts>>,
      FilterTypes
    >({
      query: (params) => ({
        url: "/api/v1.0/stores/subcategories/",
        params,
      }),
      providesTags: [
        {
          type: TagTypes.PRODUCTS,
          id: TagTypes.PRODUCTS + "_ID",
        },
      ],
    }),
    getBrands: builder.query<
      ApiResponse<PaginatedResponse<IProducts>>,
      FilterTypes
    >({
      query: (params) => ({
        url: "/api/v1.0/stores/brands/",
        params,
      }),
      providesTags: [
        {
          type: TagTypes.PRODUCTS,
          id: TagTypes.PRODUCTS + "_ID",
        },
      ],
    }),

    getProducts: builder.query<
      ApiResponse<PaginatedResponse<IProducts>>,
      FilterTypes
    >({
      query: (params) => ({
        url: "/api/v1.0/stores/products/",
        params,
      }),
      providesTags: [
        {
          type: TagTypes.PRODUCTS,
          id: TagTypes.PRODUCTS + "_ID",
        },
      ],
    }),

    createProduct: builder.mutation<ApiResponse<ICreateProduct>, FormData>({
      query: (data) => ({
        url: "/api/v1.0/stores/products/",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [
        {
          type: TagTypes.PRODUCTS,
          id: TagTypes.PRODUCTS + "_ID",
        },
      ],
    }),

    getSingleProduct: builder.query<ApiResponse<any>, number>({
      query: (studId) => ({
        url: `/api/v1.0/stores/products/${studId}/`,
      }),

      providesTags: [
        {
          type: TagTypes.PRODUCTS,
          id: TagTypes.PRODUCTS + "_ID",
        },
      ],
    }),

    deleteProduct: builder.mutation<ApiResponse<IProducts>, { id: any }>({
      query: ({ id }) => ({
        url: `/api/v1.0/stores/products/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: [
        {
          type: TagTypes.PRODUCTS,
          id: TagTypes.PRODUCTS + "_ID",
        },
        {
          type: TagTypes.ADMISSION,
          id: TagTypes.ADMISSION + "_ID",
        },
      ],
    }),

    updateProduct: builder.mutation<
      ApiResponse<IProducts>,
      { id: number | undefined; data: FormData }
    >({
      query: ({ id, data }) => ({
        url: `/api/v1.0/stores/products/${id}/`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        await handleOnQueryStarted(queryFulfilled, dispatch);
      },
      invalidatesTags: [
        {
          type: TagTypes.PRODUCTS,
          id: TagTypes.PRODUCTS + "_ID",
        },
      ],
    }),
  }),
});

export const {
  useGetSubCategoriesQuery,
  useGetBrandsQuery,
  useGetProductsQuery,
  useCreateProductMutation,
  useGetSingleProductQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsEndpoint;
