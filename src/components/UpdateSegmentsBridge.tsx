import { ApolloWrapper } from "../apollo/config/ApolloWrapper";
import {
  useUpdateSegmentsMutation,
  Segment,
} from "../apollo/generated/graphql";
import { ReactNode } from "react";

interface Props {
  children: (
    update: (segments: Segment[]) => Promise<void>,
    loading: boolean,
    error?: Error
  ) => ReactNode;
}

const InnerUpdateSegmentsProvider = ({ children }: Props) => {
  const [mutate, { loading, error }] = useUpdateSegmentsMutation();

  const update = async (segments: Segment[]) => {
    try {
      await mutate({ variables: { segments } });
    } catch (e) {
      console.error("Error in mutation", e);
    }
  };

  return <>{children(update, loading, error as Error)}</>;
};

export const UpdateSegmentsBridge = (props: Props) => {
  return (
    <ApolloWrapper>
      <InnerUpdateSegmentsProvider {...props} />
    </ApolloWrapper>
  );
};
