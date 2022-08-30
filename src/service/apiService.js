import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const contactApi = createApi({
    reducerPath: 'contacts',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://62140f1689fad53b1f099ceb.mockapi.io/api/v3/contacts',
    }),
    tagTypes: ['Contacts'],
    endpoints: builder => ({
        getContacts: builder.query({
            query: () => '',
            transformResponse: res => res.sort((a, b) => b.name - a.name),
            providesTags: ['Contacts'],
        }),
        deleteContact: builder.mutation({
            query: id => ({
                url: `${id}`,
                method: 'DELETE',
                body: id,
            }),
            transformResponse: response => response,
            invalidatesTags: ['Contacts'],
        }),
        addContact: builder.mutation({
            query: contact => ({
                query: () => '',
                method: 'POST',
                body: contact,
            }),
            transformResponse: response => response,
            invalidatesTags: ['Contacts'],
        }),
    }),
});

export default contactApi;
export const {
    useGetContactsQuery,
    useDeleteContactMutation,
    useAddContactMutation,
} = contactApi;
