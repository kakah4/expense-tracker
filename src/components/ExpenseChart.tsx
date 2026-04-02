"use client";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

type Expense = {
  id: number;
  description: string;
  amount: number;
  category: string;
  type: "income" | "expense";
};

const COLORS = ["#f97316", "#ef4444", "#22c55e", "#60a5fa", "#facc15", "#e879f9", "#34d399"];

export default function ExpenseChart({ expenses }: { expenses: Expense[] }) {
  const expensesByCategory = expenses
    .filter((e) => e.type === "expense")
    .reduce((acc, e) => {
      acc[e.category] = (acc[e.category] || 0) + e.amount;
      return acc;
    }, {} as Record<string, number>);

  const data = Object.entries(expensesByCategory).map(([name, value]) => ({ name, value }));

  if (data.length === 0) return null;

  const renderLabel = (props: { name?: string; percent?: number }) => {
    const name = props.name ?? "";
    const percent = props.percent ?? 0;
    return `${name} ${(percent * 100).toFixed(0)}%`;
  };

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
            label={renderLabel}
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