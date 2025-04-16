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

export type Query = {
  __typename?: 'Query';
  allExacts: GraphResult;
  calculateMds: MdsResult;
  dealersGraph: GraphResult;
  exactInfo: ExactInfo;
  getMdsByDelaerId: MdsResult;
};


export type QueryAllExactsArgs = {
  filter?: InputMaybe<ExactFilterInput>;
};


export type QueryCalculateMdsArgs = {
  dealerId: Scalars['Int']['input'];
  distance: Scalars['Int']['input'];
  exactId: Scalars['Int']['input'];
};


export type QueryExactInfoArgs = {
  exactId: Scalars['Float']['input'];
};


export type QueryGetMdsByDelaerIdArgs = {
  dealerId: Scalars['Int']['input'];
};

export type GetDealersGraphQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDealersGraphQuery = { __typename?: 'Query', dealersGraph: { __typename?: 'GraphResult', nodes: Array<{ __typename?: 'GraphNode', id: string, name?: string | null, type: string, color?: string | null }>, links: Array<{ __typename?: 'GraphLink', source: string, target: string }> } };


export const GetDealersGraphDocument = gql`
    query GetDealersGraph {
  dealersGraph {
    nodes {
      id
      name
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
 *   },
 * });
 */
export function useGetDealersGraphQuery(baseOptions?: Apollo.QueryHookOptions<GetDealersGraphQuery, GetDealersGraphQueryVariables>) {
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