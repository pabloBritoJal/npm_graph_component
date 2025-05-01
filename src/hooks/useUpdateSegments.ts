import {
  useUpdateSegmentsMutation,
  Segment,
} from "../apollo/generated/graphql";

export const useUpdateSegmentsService = () => {
  const [mutate, { data, loading, error }] = useUpdateSegmentsMutation();

  const updateSegmentsWithData = async (segments: Segment[]) => {
    const response = await mutate({
      variables: {
        segments,
      },
    });

    return response;
  };

  return {
    updateSegmentsWithData,
    data,
    loading,
    error,
  };
};
