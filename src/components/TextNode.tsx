import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import type { NodeProps } from 'reactflow';

const TextNode = ({ data }: NodeProps<{ label: string }>) => {
  return (
    <div className='text-node'>
      <div className='node-header'>Send Message</div>
      <div className='node-content'>{data.label}</div>
      <Handle type='source' position={Position.Right} />
      <Handle type='target' position={Position.Left} />
    </div>
  );
};

export default memo(TextNode);
