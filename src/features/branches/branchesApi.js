import {createApi} from "@reduxjs/toolkit/query/react";
import {
  getBranchCoordinates,
  buildCuisineImageMap,
} from "../../shared/lib/helpers";
import {baseQueryWithRetry} from "../../shared/api/baseQuery";

const priceRanges = ["$", "$$", "$$$"];

// create branch images to fake data
const buildBranchImages = (productImages, seed) => {
  if (!productImages?.length) return [];
  const images = [];
  for (let i = 0; i < 4; i += 1) {
    const index = (seed * 4 + i) % productImages.length;
    images.push(productImages[index]);
  }
  return images;
};

const mapUserToBranch = (user, cuisineList, cuisineImageMap) => {
  const cuisine = cuisineList[user.id % cuisineList.length];
  const priceRange = priceRanges[user.id % priceRanges.length];
  const rating = Number(((user.id % 5) + 3 + (user.id % 10) / 10).toFixed(1));
  const isOpen = user.id % 2 === 0;
  const distanceValue = ((user.id % 50) + 5) / 10;
  const distance =
    distanceValue < 1
      ? `${Math.round(distanceValue * 1000)}ft`
      : `${distanceValue.toFixed(1)}mi`;

  return {
    id: user.id,
    name: user.company?.name || `${user.lastName} ${cuisine} House`,
    address: user.address?.address || "Unknown address",
    city: user.address?.city || user.address?.state || "New York City",
    cuisine,
    priceRange,
    distance,
    coordinates: getBranchCoordinates(user.id),
    images: buildBranchImages(cuisineImageMap[cuisine], user.id),
    rating,
    isOpen,
  };
};

export const branchesApi = createApi({
  reducerPath: "branchesApi",
  baseQuery: baseQueryWithRetry,
  tagTypes: ["Branches"],
  endpoints: (builder) => ({
    getBranches: builder.query({
      queryFn: async (
        {limit = 8, skip = 0} = {},
        _queryApi,
        _extraOptions,
        fetchWithBQ,
      ) => {
        const usersResult = await fetchWithBQ(
          `/users?limit=${limit}&skip=${skip}`,
        );
        if (usersResult.error) return {error: usersResult.error};

        const recipesResult = await fetchWithBQ("/recipes?limit=40");
        if (recipesResult.error) return {error: recipesResult.error};

        const recipes = recipesResult.data?.recipes || [];
        const cuisineImageMap = buildCuisineImageMap(recipes);

        const cuisineList = Object.keys(cuisineImageMap);
        if (cuisineList.length === 0) {
          return {data: {branches: [], total: 0}};
        }

        const branches = usersResult.data.users.map((user) =>
          mapUserToBranch(user, cuisineList, cuisineImageMap),
        );

        return {data: {branches, total: usersResult.data.total}};
      },
      providesTags: ["Branches"],
    }),
    getBranchById: builder.query({
      queryFn: async (id, _queryApi, _extraOptions, fetchWithBQ) => {
        const userResult = await fetchWithBQ(`/users/${id}`);
        if (userResult.error) return {error: userResult.error};

        const recipesResult = await fetchWithBQ("/recipes?limit=40");
        if (recipesResult.error) return {error: recipesResult.error};

        const recipes = recipesResult.data?.recipes || [];
        const cuisineImageMap = buildCuisineImageMap(recipes);

        const cuisineList = Object.keys(cuisineImageMap);
        if (cuisineList.length === 0) {
          return {data: null};
        }

        return {
          data: mapUserToBranch(userResult.data, cuisineList, cuisineImageMap),
        };
      },
      providesTags: (result, error, id) => [{type: "Branches", id}],
    }),
  }),
});

export const {useGetBranchesQuery, useGetBranchByIdQuery} = branchesApi;
