import React from 'react';
import { Tooltip } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';

interface Stage {
  key: string;
  name: string;
  color: string;
}

interface DealStageProgressProps {
  currentStage: string;
  stages?: Stage[];
  className?: string;
  style?: React.CSSProperties;
}

/**
 * A component that visualizes the progress of a deal through various stages
 *
 * @param currentStage - The current stage key
 * @param stages - Array of stage objects with key, name, and color
 * @param className - Additional CSS class
 * @param style - Additional CSS style
 */
const DealStageProgress: React.FC<DealStageProgressProps> = ({
  currentStage,
  stages = defaultStages,
  className,
  style,
}) => {
  const currentIndex = stages.findIndex((s) => s.key === currentStage);

  return (
    <div
      className={className}
      style={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        marginBottom: 24,
        ...style,
      }}
    >
      {stages.map((stage, index) => (
        <React.Fragment key={stage.key}>
          <Tooltip title={stage.name}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                flex: 1,
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  background: index <= currentIndex ? stage.color : '#f0f0f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: index <= currentIndex ? 'white' : '#999',
                  fontWeight: 'bold',
                  marginBottom: 8,
                  transition: 'all 0.3s ease',
                }}
              >
                {index < currentIndex ? <CheckCircleFilled style={{ fontSize: 16 }} /> : index + 1}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: index <= currentIndex ? '#333' : '#999',
                  fontWeight: index <= currentIndex ? 500 : 400,
                  textAlign: 'center',
                  maxWidth: 80,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {stage.name}
              </div>
            </div>
          </Tooltip>

          {index < stages.length - 1 && (
            <div
              style={{
                height: 2,
                flex: 0.5,
                background: index < currentIndex ? stages[index].color : '#f0f0f0',
                transition: 'background 0.3s ease',
              }}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

// Default stages if none are provided
const defaultStages: Stage[] = [
  { key: 'initial_contact', name: 'Initial Contact', color: '#00BFA6' },
  { key: 'demo_scheduled', name: 'Demo Scheduled', color: '#4361EE' },
  { key: 'proposal_shared', name: 'Proposal Shared', color: '#FF7A00' },
  { key: 'contract_signed', name: 'Contract Signed', color: '#52C41A' },
  { key: 'kyc_collected', name: 'KYC Collected', color: '#9C27B0' },
  { key: 'integration_started', name: 'Integration Started', color: '#1890FF' },
  { key: 'go_live', name: 'Go Live', color: '#FAAD14' },
];

export default DealStageProgress;
