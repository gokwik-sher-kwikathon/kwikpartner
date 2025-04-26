import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { Typography, Card } from 'antd';
import { ElevatedCard } from '../common';
import { chartColors } from '../../theme/themeConfig';

const { Title, Text } = Typography;

interface FunnelStage {
  name: string;
  count: number;
  color: string;
}

interface FunnelChartProps {
  stages: FunnelStage[];
}

const FunnelChart: React.FC<FunnelChartProps> = ({ stages }) => {
  // Transform the data for the chart
  const chartData = stages.map((stage) => ({
    name: stage.name,
    value: stage.count,
    fill: stage.color,
  }));

  // Custom tooltip to enhance the visual appearance
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            backgroundColor: 'white',
            padding: '10px',
            border: '1px solid #f0f0f0',
            borderRadius: '4px',
            boxShadow: chartColors.shadow.level1,
          }}
        >
          <Text strong>{payload[0].payload.name}</Text>
          <div>
            <Text>{payload[0].value} Leads</Text>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <ElevatedCard title='Referral Funnel Overview' style={{ marginBottom: 24 }} elevation={2}>
      <Title level={5} style={{ textAlign: 'center', marginBottom: 24, color: 'var(--color-text-secondary)' }}>
        Conversion Funnel
      </Title>
      <ResponsiveContainer width='100%' height={300}>
        <BarChart
          data={chartData}
          layout='vertical'
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barSize={30}
        >
          <CartesianGrid strokeDasharray='3 3' stroke='#f5f5f5' />
          <XAxis type='number' tickLine={false} axisLine={{ stroke: '#e0e0e0' }} />
          <YAxis
            dataKey='name'
            type='category'
            axisLine={false}
            tickLine={false}
            width={100}
            style={{ fontSize: '12px' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ paddingTop: '10px' }}
            formatter={(value) => <span style={{ color: 'var(--color-text-secondary)' }}>{value}</span>}
          />
          <Bar dataKey='value' name='Leads' radius={[0, 4, 4, 0]}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ElevatedCard>
  );
};

export default FunnelChart;
