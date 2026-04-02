"use client";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

type Expense = {
  id: number;
  description: string;
  amount: number;
  category: string;
  type: "income" | "expense";
};

const COLORS = ["#818cf8", "#c084fc", "#f472b6", "#34d399", "#fb923c", "#60a5fa", "#facc15"];

export default function ExpenseChart({ expenses }: { expenses: Expense[] }) {
  const expensesByCategory = expenses
    .filter((e) => e.type === "expense")
    .reduce((acc, e) => {
      acc[e.category] = (acc[e.category] || 0) + e.amount;
      return acc;
    }, {} as Record<string, number>);

  const data = Object.entries(expensesByCategory).map(([name, value]) => ({ name, value }));

  if (data.length === 0) return null;

  return (
    <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }} className="rounded-2xl p-6 mb-8">
      <h2 className="text-white font-semibold mb-4">Expenses by Category</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={100}
            dataKey="value"
            label={({ name, percent }: { name: string; percent?: number }) =>
              `${name} ${((percent ?? 0) * 100).toFixed(0)}%`
            }
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => "$" + value.toFixed(2)} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}