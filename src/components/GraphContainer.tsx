import DefaultSpinner from "./DefaultSpinner";
import { useEffect, useState } from "react";
import {
  GetAllExactsBySegmentQuery,
  GetDealersGraphQuery,
  useGetAllExactsBySegmentQuery,
  useGetDealersGraphQuery,
} from "../apollo/generated/graphql";
import { ExpandableGraph } from "./ExpandableGraph";
import DealerRangeIndicator from "./DealerRangeIndicator";
import ControlsIndicator from "./ControlsIndicator";
import "../styles/graph.css";

interface GraphContainerProps {
  dealerId: number;
  maxNodes: number;
}

export const GraphContainer = ({ dealerId, maxNodes }: GraphContainerProps) => {
  const [graphLoading, setgraphLoading] = useState(false);
  const [graphData, setGraphData] = useState<GetDealersGraphQuery>();
  const [exactsData, setExactsData] = useState<
    GetAllExactsBySegmentQuery | undefined
  >();
  const [reset, setReset] = useState(false);

  const {
    data: dealersData,
    loading,
    refetch: refetchDealerData,
  } = useGetDealersGraphQuery({
    variables: { dealerId },
  });

  const { refetch: fetchExacts } = useGetAllExactsBySegmentQuery({
    skip: true,
  });

  const handleAddExacts = async (segmentName: string) => {
    setgraphLoading(true);
    const { data } = await fetchExacts({
      dealerId,
      segmentName,
    });
    if (!data) return;
    setExactsData(data);
    setgraphLoading(false);
  };

  const resetData = async () => {
    setgraphLoading(true);
    const { data } = await refetchDealerData();
    if (data) {
      setExactsData(undefined);
      setReset((prev) => !prev);
      setGraphData(data);
    }
    setgraphLoading(false);
  };

  useEffect(() => {
    if (dealersData) {
      setGraphData(dealersData);
    }
  }, [loading]);

  if (loading) return <DefaultSpinner />;

  if (
    dealersData?.dealersGraph.nodes.length === 0 &&
    dealersData?.dealersGraph.links.length === 0
  )
    return null;

  return (
    <div className="npm-graph-dashboard-container">
      {graphLoading && <DefaultSpinner />}
      <h2 className="label">This graph reflects your current settings</h2>
      {graphData && (
        <ExpandableGraph
          graphData={graphData}
          exactsData={exactsData}
          getExacts={handleAddExacts}
          reset={reset}
          resetData={resetData}
          maxNodes={maxNodes}
        />
      )}
      <DealerRangeIndicator />
      <ControlsIndicator />
    </div>
  );
};
