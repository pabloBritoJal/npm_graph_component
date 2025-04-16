// src/components/GraphDashboard.tsx
import { useQuery } from "@apollo/client";
import { GraphVisualizer } from "./GraphVisualizer";
import DefaultSpinner from "./DefaultSpinner";
import { useEffect, useState } from "react";
import { useGetDealersGraphQuery } from "../apollo/generated/graphql";
import { GraphData } from "../types/graph_types";

export const GraphDashboard = () => {
  const [graphData, setGraphData] = useState<GraphData>();
  const { data: dealersData, loading } = useGetDealersGraphQuery();

  // const { refetch: fetchExacts } = useGetAllExactsQuery({
  //   skip: true,
  // });

  const getInitialGraphData = () => {
    if (!dealersData) return undefined;
    return {
      nodes: dealersData.dealersGraph.nodes.map((n) => ({
        id: n.id,
        name: n.name || "",
        type: n.type,
        color: n.color || "#ccc",
      })),
      links: dealersData.dealersGraph.links.map((l) => ({
        source: l.source,
        target: l.target,
      })),
    };
  };

  // const handleAddExacts = async () => {
  //   const { data } = await fetchExacts({
  //     filter: filterInput,
  //   });
  //   if (!data || !dealersData) return;

  //   const exactNodes: GraphNode[] = data.allExacts.nodes
  //     .filter((n) => n.type !== "Segment")
  //     .map((n) => ({
  //       id: String(n.id),
  //       type: n.type,
  //       color: n.color || "#ccc",
  //       name: n.id,
  //     }));

  //   const exactLinks: GraphLink[] = data.allExacts.links.map((l) => ({
  //     source: l.source,
  //     target: l.target,
  //   }));

  //   const initialData = getInitialGraphData();
  //   if (!initialData) return;

  //   const mergedData: GraphData = {
  //     nodes: [...initialData.nodes, ...exactNodes],
  //     links: [...initialData.links, ...exactLinks],
  //   };

  //   setGraphData(mergedData);
  // };

  useEffect(() => {
    console.log(dealersData);
    if (dealersData) {
      const initData = getInitialGraphData();
      console.log(initData);
      setGraphData(initData);
    }
  }, [dealersData]);

  if (loading) return <DefaultSpinner />;

  return <GraphVisualizer graphData={graphData} />;
};
