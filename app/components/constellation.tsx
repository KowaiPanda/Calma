'use client'

import React, { useState } from 'react';
import Link from 'next/link';

interface Node {
  id: number;
  x: number;
  y: number;
  image: string;
  label?: string;
  href?: string;
}

interface Connection {
  source: number;
  target: number;
}

interface ConstellationNetworkProps {
  nodes?: Node[];
  connections?: Connection[];
  nodeSize?: number;
  backgroundColor?: string;
  lineColor?: string;
  lineHighlightColor?: string;
  borderColor?: string;
  borderHighlightColor?: string;
}

const imageUrl = '/images/star.png';
const DEFAULT_NODES: Node[] = [
  { id: 1, x: 100, y: 100, image: imageUrl, label: 'Node 1', href: '/chapters/linear-search' },
  { id: 2, x: 250, y: 150, image: imageUrl, label: 'Node 2', href: '/node-2' },
  { id: 3, x: 180, y: 250, image: imageUrl, label: 'Node 3', href: '/node-3' },
  { id: 4, x: 400, y: 200, image: imageUrl, label: 'Node 4', href: '/node-4' },
  { id: 5, x: 300, y: 350, image: imageUrl, label: 'Node 5', href: '/node-5' },
  { id: 6, x: 500, y: 350, image: imageUrl, label: 'Node 6', href: '/node-6' },
  { id: 7, x: 600, y: 100, image: imageUrl, label: 'Node 7', href: '/node-7' },
  { id: 8, x: 700, y: 300, image: imageUrl, label: 'Node 8', href: '/node-8' },
  { id: 9, x: 800, y: 200, image: imageUrl, label: 'Node 9', href: '/node-9' },
  { id: 10, x: 900, y: 100, image: imageUrl, label: 'Node 10', href: '/node-10' },
  { id: 11, x: 1000, y: 300, image: imageUrl, label: 'Node 11', href: '/node-11' },
  { id: 12, x: 1100, y: 200, image: imageUrl, label: 'Node 12', href: '/node-12' },
  { id: 13, x: 1200, y: 100, image: imageUrl, label: 'Node 13', href: '/node-13' },
  { id: 14, x: 1300, y: 300, image: imageUrl, label: 'Node 14', href: '/node-14' },
  { id: 15, x: 1400, y: 200, image: imageUrl, label: 'Node 15', href: '/node-15' },
  { id: 16, x: 1500, y: 100, image: imageUrl, label: 'Node 16', href: '/node-16' }
];

const DEFAULT_CONNECTIONS: Connection[] = [
  { source: 1, target: 2 },
  { source: 2, target: 3 },
  { source: 2, target: 4 },
  { source: 3, target: 5 },
  { source: 4, target: 5 },
  { source: 4, target: 6 },
  { source: 5, target: 7 },
  { source: 6, target: 8 },
  { source: 7, target: 9 },
  { source: 8, target: 9 },
  { source: 9, target: 10 },
  { source: 10, target: 11 },
  { source: 11, target: 12 },
  { source: 12, target: 13 },
  { source: 13, target: 14 },
  { source: 14, target: 15 },
  { source: 15, target: 16 }
];

const ConstellationNetwork: React.FC<ConstellationNetworkProps> = ({
  nodes = DEFAULT_NODES,
  connections = DEFAULT_CONNECTIONS,
  nodeSize = 64,
  backgroundColor = 'bg-slate-900',
  lineColor = '#4B5563',
  lineHighlightColor = '#60A5FA',
  borderColor = 'border-gray-600',
  borderHighlightColor = 'border-blue-500'
}) => {
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

  const handleNodeHover = (nodeId: number | null) => {
    setHoveredNode(nodeId);
  };

  const isConnectionHighlighted = (source: number, target: number): boolean => {
    return hoveredNode !== null && (hoveredNode === source || hoveredNode === target);
  };

  const NodeImage = ({ node }: { node: Node }) => {
    const imageElement = (
      <div className="relative">
        <div className={`absolute inset-0 rounded-full animate-pulse ${
          hoveredNode === node.id ? 'bg-blue-500/30' : 'bg-gray-500/20'
        }`} />
        <img
          src={node.image}
          alt={node.label || `Node ${node.id}`}
          className={`w-16 h-16 rounded-full border-2 ${borderColor} hover:${borderHighlightColor} transition-colors duration-300 cursor-pointer`}
          style={{
            width: `${nodeSize}px`,
            height: `${nodeSize}px`
          }}
        />
      </div>
    );

    if (node.href) {
      return (
        <Link href={node.href}>
          {imageElement}
        </Link>
      );
    }

    return imageElement;
  };

  return (
    <div className={`relative h-96 ${backgroundColor} rounded-lg overflow-hidden w-full`}>
      {/* Draw connections */}
      <svg className="absolute inset-0 w-full h-full">
        {connections.map(({ source, target }, index) => {
          const fromNode = nodes.find(n => n.id === source);
          const toNode = nodes.find(n => n.id === target);
         
          if (!fromNode || !toNode) return null;

          const isHighlighted = isConnectionHighlighted(source, target);

          return (
            <line
              key={`line-${index}`}
              x1={fromNode.x}
              y1={fromNode.y}
              x2={toNode.x}
              y2={toNode.y}
              stroke={isHighlighted ? lineHighlightColor : lineColor}
              strokeWidth={isHighlighted ? 2 : 1}
              className="transition-all duration-300"
            />
          );
        })}
      </svg>

      {/* Draw nodes */}
      {nodes.map((node) => (
        <div
          key={node.id}
          className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
            hoveredNode === node.id ? 'scale-110' : 'scale-100'
          }`}
          style={{
            left: node.x,
            top: node.y
          }}
          onMouseEnter={() => handleNodeHover(node.id)}
          onMouseLeave={() => handleNodeHover(null)}
        >
          <NodeImage node={node} />
        </div>
      ))}
    </div>
  );
};

export default ConstellationNetwork;