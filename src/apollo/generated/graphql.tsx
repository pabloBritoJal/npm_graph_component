import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Configuration = {
  __typename?: 'Configuration';
  Dealer_Color?: Maybe<Scalars['String']['output']>;
  Heading_Color?: Maybe<Scalars['String']['output']>;
};

export type ExactFilterInput = {
  adjustment?: InputMaybe<Scalars['Float']['input']>;
  bedLength?: InputMaybe<Scalars['String']['input']>;
  bodyStyle?: InputMaybe<Scalars['String']['input']>;
  doors?: InputMaybe<Scalars['String']['input']>;
  drivetrain?: InputMaybe<Scalars['String']['input']>;
  engine?: InputMaybe<Scalars['String']['input']>;
  engineCylinders?: InputMaybe<Scalars['String']['input']>;
  engineFuelType?: InputMaybe<Scalars['String']['input']>;
  engineSizeLitters?: InputMaybe<Scalars['Float']['input']>;
  exactId?: InputMaybe<Scalars['String']['input']>;
  make?: InputMaybe<Scalars['String']['input']>;
  model?: InputMaybe<Scalars['String']['input']>;
  transmission?: InputMaybe<Scalars['String']['input']>;
  trim?: InputMaybe<Scalars['String']['input']>;
  year?: InputMaybe<Scalars['Float']['input']>;
};

export type ExactInfo = {
  __typename?: 'ExactInfo';
  BodyStyle: Scalars['String']['output'];
  BodyStyleBedWidget: Scalars['String']['output'];
  BodyStyleWidget: Scalars['String']['output'];
  Doors: Scalars['Int']['output'];
  DriveTrain: Scalars['String']['output'];
  DrivetrainWidget: Scalars['String']['output'];
  Engine: Scalars['String']['output'];
  EngineCylinders: Scalars['String']['output'];
  EngineFuelType: Scalars['String']['output'];
  EngineSizeLitters: Scalars['String']['output'];
  ExactVehicleName: Scalars['String']['output'];
  KbbId: Scalars['Int']['output'];
  KbbOptionsId_Drivetrain: Scalars['Int']['output'];
  KbbOptionsId_Engine: Scalars['Int']['output'];
  KbbOptionsId_Transmission: Scalars['Int']['output'];
  MakeName: Scalars['String']['output'];
  MakeTypesId: Scalars['Int']['output'];
  MileageTypical: Scalars['Int']['output'];
  ModelName: Scalars['String']['output'];
  ModelWidget: Scalars['String']['output'];
  NoOptions: Scalars['Int']['output'];
  OptionsDrivetrainId: Scalars['Int']['output'];
  OptionsEngineId: Scalars['Int']['output'];
  OptionsTransmissionsId: Scalars['Int']['output'];
  PriceBase: Scalars['Float']['output'];
  PriceBaseFinal: Scalars['Float']['output'];
  PriceDate: Scalars['String']['output'];
  PriceDrivetrain: Scalars['Float']['output'];
  PriceEngine: Scalars['Float']['output'];
  PriceOptions: Scalars['Float']['output'];
  PriceTransmission: Scalars['Float']['output'];
  Segment: Scalars['String']['output'];
  SegmentsId: Scalars['Int']['output'];
  SquishVin: Scalars['String']['output'];
  Transmission: Scalars['String']['output'];
  TransmissionWidget: Scalars['String']['output'];
  TrimName: Scalars['String']['output'];
  TrimWidget: Scalars['String']['output'];
  VehicleDescription: Scalars['String']['output'];
  VehicleId: Scalars['Int']['output'];
  Year: Scalars['Int']['output'];
};

export type GraphLink = {
  __typename?: 'GraphLink';
  source: Scalars['String']['output'];
  target: Scalars['String']['output'];
};

export type GraphNode = {
  __typename?: 'GraphNode';
  adjustment?: Maybe<Scalars['Float']['output']>;
  color?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
  type: Scalars['String']['output'];
};

export type GraphResult = {
  __typename?: 'GraphResult';
  links: Array<GraphLink>;
  nodes: Array<GraphNode>;
};

export type MdsResult = {
  __typename?: 'MdsResult';
  DailySalesRate: Scalars['Float']['output'];
  MarketSize: Scalars['Int']['output'];
  Mds: Scalars['Int']['output'];
  Sales: Scalars['Int']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  updateConfiguration: Scalars['Boolean']['output'];
  updateSegments: Scalars['Boolean']['output'];
};


export type MutationUpdateConfigurationArgs = {
  Dealer_Color?: InputMaybe<Scalars['String']['input']>;
  Heading_Color?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateSegmentsArgs = {
  segments: Array<Segment>;
};

export type Query = {
  __typename?: 'Query';
  allExacts: GraphResult;
  allExactsBySegmentId: GraphResult;
  calculateMds: MdsResult;
  dealersGraph: GraphResult;
  exactInfo: ExactInfo;
  getConfiguration: Configuration;
  getMdsByDealerId: MdsResult;
};


export type QueryAllExactsArgs = {
  filter?: InputMaybe<ExactFilterInput>;
};


export type QueryAllExactsBySegmentIdArgs = {
  dealerId: Scalars['Float']['input'];
  segmentName: Scalars['String']['input'];
};


export type QueryCalculateMdsArgs = {
  dealerId: Scalars['Int']['input'];
  distance: Scalars['Int']['input'];
  exactId: Scalars['Int']['input'];
};


export type QueryDealersGraphArgs = {
  dealerId?: InputMaybe<Scalars['Float']['input']>;
};


export type QueryExactInfoArgs = {
  exactId: Scalars['Float']['input'];
};


export type QueryGetMdsByDealerIdArgs = {
  dealerId: Scalars['Int']['input'];
};

export type Segment = {
  adjustment: Scalars['Float']['input'];
  segmentName: Scalars['String']['input'];
};

export type GetAllExactsBySegmentQueryVariables = Exact<{
  dealerId: Scalars['Float']['input'];
  segmentName: Scalars['String']['input'];
}>;


export type GetAllExactsBySegmentQuery = { __typename?: 'Query', allExactsBySegmentId: { __typename?: 'GraphResult', nodes: Array<{ __typename?: 'GraphNode', id: string, type: string, color?: string | null }>, links: Array<{ __typename?: 'GraphLink', source: string, target: string }> } };

export type GetDealersGraphQueryVariables = Exact<{
  dealerId: Scalars['Float']['input'];
}>;


export type GetDealersGraphQuery = { __typename?: 'Query', dealersGraph: { __typename?: 'GraphResult', nodes: Array<{ __typename?: 'GraphNode', id: string, name?: string | null, type: string, color?: string | null, adjustment?: number | null }>, links: Array<{ __typename?: 'GraphLink', source: string, target: string }> } };

export type UpdateSegmentsMutationVariables = Exact<{
  segments: Array<Segment> | Segment;
}>;


export type UpdateSegmentsMutation = { __typename?: 'Mutation', updateSegments: boolean };


export const GetAllExactsBySegmentDocument = gql`
    query GetAllExactsBySegment($dealerId: Float!, $segmentName: String!) {
  allExactsBySegmentId(dealerId: $dealerId, segmentName: $segmentName) {
    nodes {
      id
      type
      color
    }
    links {
      source
      target
    }
  }
}
    `;

/**
 * __useGetAllExactsBySegmentQuery__
 *
 * To run a query within a React component, call `useGetAllExactsBySegmentQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllExactsBySegmentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllExactsBySegmentQuery({
 *   variables: {
 *      dealerId: // value for 'dealerId'
 *      segmentName: // value for 'segmentName'
 *   },
 * });
 */
export function useGetAllExactsBySegmentQuery(baseOptions: Apollo.QueryHookOptions<GetAllExactsBySegmentQuery, GetAllExactsBySegmentQueryVariables> & ({ variables: GetAllExactsBySegmentQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllExactsBySegmentQuery, GetAllExactsBySegmentQueryVariables>(GetAllExactsBySegmentDocument, options);
      }
export function useGetAllExactsBySegmentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllExactsBySegmentQuery, GetAllExactsBySegmentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllExactsBySegmentQuery, GetAllExactsBySegmentQueryVariables>(GetAllExactsBySegmentDocument, options);
        }
export function useGetAllExactsBySegmentSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllExactsBySegmentQuery, GetAllExactsBySegmentQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllExactsBySegmentQuery, GetAllExactsBySegmentQueryVariables>(GetAllExactsBySegmentDocument, options);
        }
export type GetAllExactsBySegmentQueryHookResult = ReturnType<typeof useGetAllExactsBySegmentQuery>;
export type GetAllExactsBySegmentLazyQueryHookResult = ReturnType<typeof useGetAllExactsBySegmentLazyQuery>;
export type GetAllExactsBySegmentSuspenseQueryHookResult = ReturnType<typeof useGetAllExactsBySegmentSuspenseQuery>;
export type GetAllExactsBySegmentQueryResult = Apollo.QueryResult<GetAllExactsBySegmentQuery, GetAllExactsBySegmentQueryVariables>;
export const GetDealersGraphDocument = gql`
    query GetDealersGraph($dealerId: Float!) {
  dealersGraph(dealerId: $dealerId) {
    nodes {
      id
      name
      type
      color
      adjustment
    }
    links {
      source
      target
    }
  }
}
    `;

/**
 * __useGetDealersGraphQuery__
 *
 * To run a query within a React component, call `useGetDealersGraphQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDealersGraphQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDealersGraphQuery({
 *   variables: {
 *      dealerId: // value for 'dealerId'
 *   },
 * });
 */
export function useGetDealersGraphQuery(baseOptions: Apollo.QueryHookOptions<GetDealersGraphQuery, GetDealersGraphQueryVariables> & ({ variables: GetDealersGraphQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDealersGraphQuery, GetDealersGraphQueryVariables>(GetDealersGraphDocument, options);
      }
export function useGetDealersGraphLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDealersGraphQuery, GetDealersGraphQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDealersGraphQuery, GetDealersGraphQueryVariables>(GetDealersGraphDocument, options);
        }
export function useGetDealersGraphSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetDealersGraphQuery, GetDealersGraphQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetDealersGraphQuery, GetDealersGraphQueryVariables>(GetDealersGraphDocument, options);
        }
export type GetDealersGraphQueryHookResult = ReturnType<typeof useGetDealersGraphQuery>;
export type GetDealersGraphLazyQueryHookResult = ReturnType<typeof useGetDealersGraphLazyQuery>;
export type GetDealersGraphSuspenseQueryHookResult = ReturnType<typeof useGetDealersGraphSuspenseQuery>;
export type GetDealersGraphQueryResult = Apollo.QueryResult<GetDealersGraphQuery, GetDealersGraphQueryVariables>;
export const UpdateSegmentsDocument = gql`
    mutation UpdateSegments($segments: [Segment!]!) {
  updateSegments(segments: $segments)
}
    `;
export type UpdateSegmentsMutationFn = Apollo.MutationFunction<UpdateSegmentsMutation, UpdateSegmentsMutationVariables>;

/**
 * __useUpdateSegmentsMutation__
 *
 * To run a mutation, you first call `useUpdateSegmentsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSegmentsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSegmentsMutation, { data, loading, error }] = useUpdateSegmentsMutation({
 *   variables: {
 *      segments: // value for 'segments'
 *   },
 * });
 */
export function useUpdateSegmentsMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSegmentsMutation, UpdateSegmentsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSegmentsMutation, UpdateSegmentsMutationVariables>(UpdateSegmentsDocument, options);
      }
export type UpdateSegmentsMutationHookResult = ReturnType<typeof useUpdateSegmentsMutation>;
export type UpdateSegmentsMutationResult = Apollo.MutationResult<UpdateSegmentsMutation>;
export type UpdateSegmentsMutationOptions = Apollo.BaseMutationOptions<UpdateSegmentsMutation, UpdateSegmentsMutationVariables>;