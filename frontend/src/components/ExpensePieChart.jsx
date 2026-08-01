import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const ExpensePieChart = ({ data = [] }) => {
  if (!data.length) {
    return <p className="text-sm text-gray-400 text-center py-10">No data to display yet.</p>;
  }
  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" innerRadius={60} outerRadius={95} paddingAngle={2}>
          {data.map((entry, index) => (
            <Cell key={index} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default ExpensePieChart;
