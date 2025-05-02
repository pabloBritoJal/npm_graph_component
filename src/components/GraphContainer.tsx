import DefaultSpinner from "./DefaultSpinner";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  GetAllExactsBySegmentQuery,
  GetDealersGraphQuery,
  useGetAllExactsBySegmentQuery,
  useGetDealersGraphQuery,
} from "../apollo/generated/graphql";
import { ExpandableGraph } from "./ExpandableGraph";
import Modal from "./Modal";

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

  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const isModalOpenRef = useRef<boolean>(false);

  const [isLoading, setIsLoading] = useState(false);

  const [forceGraphKey, setForceGraphKey] = useState(0);

  const handleToggleModal = async (open: boolean) => {
    setIsLoading(true);
    setIsModalOpen(open);
    isModalOpenRef.current = open;
    setGraphData(undefined);
    await new Promise((resolve) => setTimeout(resolve, 50));
    await resetData();
    setIsLoading(false);
    setForceGraphKey((prev) => prev + 1);
  };

  const openModal = () => handleToggleModal(true);
  const closeModal = () => handleToggleModal(false);

  const {
    data: dealersData,
    loading,
    refetch: refetchDealerData,
  } = useGetDealersGraphQuery({
    variables: { dealerId },
    fetchPolicy: "network-only",
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
    setExactsData(undefined);
    const { data } = await refetchDealerData();
    if (data) {
      setReset((prev) => !prev);
      setGraphData(data);
    }
    setgraphLoading(false);
  };

  const handleDoubleClick = () => {
    if (isModalOpenRef.current) return;
    openModal();
  };

  const setContainerRef = useCallback((node: HTMLDivElement | null) => {
    if (node) {
      node.addEventListener("dblclick", handleDoubleClick);
      containerRef.current = node;
    }
  }, []);

  useEffect(() => {
    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener("dblclick", handleDoubleClick);
      }
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isModalOpenRef.current) {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

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
    return (
      <div className="npm-graph-dashboard-container graph-text-center">
        Data not available
      </div>
    );

  return (
    <div className="npm-graph-dashboard-container" ref={setContainerRef}>
      <div
        className="npm-graph-dashboard-container"
        style={{ display: isModalOpen ? "none" : "block" }}
      >
        {isLoading && <DefaultSpinner />}
        {graphData && (
          <ExpandableGraph
            graphData={graphData}
            exactsData={exactsData}
            getExacts={handleAddExacts}
            reset={reset}
            resetData={resetData}
            maxNodes={maxNodes}
            isLoading={graphLoading}
            closeModal={closeModal}
            openModal={openModal}
            isInModal={isModalOpen}
          />
        )}
      </div>
      {isModalOpen && (
        <Modal>
          {isLoading && <DefaultSpinner />}
          {graphData && (
            <ExpandableGraph
              key={`modal-graph-${forceGraphKey}`}
              graphData={graphData}
              exactsData={exactsData}
              getExacts={handleAddExacts}
              reset={reset}
              resetData={resetData}
              maxNodes={maxNodes}
              isLoading={graphLoading}
              closeModal={closeModal}
              openModal={openModal}
              isInModal={isModalOpen}
            />
          )}
        </Modal>
      )}
    </div>
  );
};
