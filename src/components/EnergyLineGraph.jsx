import { Box } from '@chakra-ui/react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
  } from 'recharts';
  
  // Add this component to your existing code
  export const EnergyLineGraph = ({ data }) => {
    // Transform the data for the chart
    const transformDataForChart = () => {
      if (!data || data.length === 0) return [];
      
      // Get all readings for each region
      const chartData = data[0].map((_, index) => {
        return {
          // Use timestamp from region 1 as the time reference
          // timestamp: data[0][index]?.timestamp?.toDate().toLocaleString() || 
          //           data[0][index]?.uploadedAt?.toDate().toLocaleString(),
          // Region 1 uses active_energy
          Region1: Number(data[0][index]?.active_energy || 0).toFixed(2),
          // Other regions use energy
          Region2: Number(data[1][index]?.energy || 0).toFixed(2),
          Region3: Number(data[2][index]?.energy || 0).toFixed(2),
          Region4: Number(data[3][index]?.energy || 0).toFixed(2)
        };
      });
  
      return chartData.reverse();
    };
  
    const chartData = transformDataForChart();
  
    return (
      <Box 
        bg="white" 
        p={4} 
        borderRadius="xl" 
        boxShadow="0px 4px 20px rgba(0, 0, 0, 0.05)"
        height="400px"
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 60
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="timestamp"
              tick={{ fontSize: 12 }}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis
              tick={{ fontSize: 12 }}
              label={{
                value: 'Energy (W)',
                angle: -90,
                position: 'insideLeft',
                style: { textAnchor: 'middle' }
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #ccc',
                borderRadius: '4px'
              }}
              formatter={(value) => [`${value} W`, `Energy`]}
            />
            <Legend wrapperStyle={{ paddingTop: '10px' }} />
            <Line
              type="monotone"
              dataKey="Region1"
              stroke="#8884d8"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              name="Region 1"
            />
            <Line
              type="monotone"
              dataKey="Region2"
              stroke="#82ca9d"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              name="Region 2"
            />
            <Line
              type="monotone"
              dataKey="Region3"
              stroke="#ffc658"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              name="Region 3"
            />
            <Line
              type="monotone"
              dataKey="Region4"
              stroke="#ff7300"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              name="Region 4"
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    );
  };
  
  // In your main component, add the graph component:
  // Add this inside your return statement where you want the graph to appear
  // For example, after your SimpleGrid of StatCards:
  
 