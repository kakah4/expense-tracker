"use client";
import { useState } from "react";
import ExpenseChart from "./ExpenseChart";

type Expense = {
  id: number;
  description: string;
  amount: number;
  category: string;
  type: "income" | "expense";
};

const CATEGORIES = ["Food", "Transport", "Housing", "Entertainment", "Health", "Salary", "Other"];

export default function ExpenseTracker() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [type, setType] = useState<"income" | "expense">("expense");

  const totalIncome = expenses.filter((e) => e.type === "income").reduce((sum, e) => sum + e.amount, 0);
  const totalExpenses = expenses.filter((e) => e.type === "expense").reduce((sum, e) => sum + e.amount, 0);
  const balance = totalIncome - totalExpenses;

  const handleAdd = () => {
    if (!description || !amount) return;
    const newExpense: Expense = {
      id: Date.now(),
      description,
      amount: parseFloat(amount),
      category,
      type,
    };
    setExpenses([newExpense, ...expenses]);
    setDescription("");
    setAmount("");
  };

  const handleDelete = (id: number) => {
    setExpenses(expenses.filter((e) => e.id !== id));
  };

  return (
    <main style={{ minHeight: "100vh", background: "linear-gradient(135deg, #0a0a0a, #1a0000, #0a1a0a)" }} className="px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-3">
            Expense <span style={{ color: "#f97316" }}>Tracker</span>
          </h1>
          <p style={{ color: "#9ca3af" }}>Track your income and expenses with ease</p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }} className="rounded-2xl p-5 text-center">
            <p style={{ color: "#9ca3af" }} className="text-sm mb-1">Balance</p>
            <p className={`text-2xl font-bold ${balance >= 0 ? "text-green-400" : "text-red-400"}`}>${balance.toFixed(2)}</p>
          </div>
          <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }} className="rounded-2xl p-5 text-center">
            <p style={{ color: "#9ca3af" }} className="text-sm mb-1">Income</p>
            <p className="text-2xl font-bold text-green-400">${totalIncome.toFixed(2)}</p>
          </div>
          <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }} className="rounded-2xl p-5 text-center">
            <p style={{ color: "#9ca3af" }} className="text-sm mb-1">Expenses</p>
            <p className="text-2xl font-bold text-red-400">${totalExpenses.toFixed(2)}</p>
          </div>
        </div>

        <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }} className="rounded-2xl p-6 mb-8">
          <h2 className="text-white font-semibold mb-4">Add Transaction</h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
              className="rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none"
            />
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
              className="rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{ background: "#111", border: "1px solid rgba(255,255,255,0.1)" }}
              className="rounded-xl px-4 py-3 text-white focus:outline-none"
            >
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
            <div className="flex gap-2">
              <button
                onClick={() => setType("expense")}
                className="flex-1 py-3 rounded-xl font-medium transition-colors text-white"
                style={{ background: type === "expense" ? "#dc2626" : "rgba(255,255,255,0.05)" }}
              >
                Expense
              </button>
              <button
                onClick={() => setType("income")}
                className="flex-1 py-3 rounded-xl font-medium transition-colors text-white"
                style={{ background: type === "income" ? "#16a34a" : "rgba(255,255,255,0.05)" }}
              >
                Income
              </button>
            </div>
          </div>
          <button
            onClick={handleAdd}
            disabled={!description || !amount}
            className="w-full py-3 rounded-xl font-medium text-white disabled:opacity-50 transition-all"
            style={{ background: "linear-gradient(90deg, #ea580c, #f97316)" }}
          >
            Add Transaction
          </button>
        </div>

        {expenses.length > 0 && <ExpenseChart expenses={expenses} />}

        <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }} className="rounded-2xl p-6">
          <h2 className="text-white font-semibold mb-4">Transactions</h2>
          {expenses.length === 0 ? (
            <p style={{ color: "#6b7280" }} className="text-center py-8">No transactions yet. Add one above!</p>
          ) : (
            <div className="space-y-3">
              {expenses.map((e) => (
                <div key={e.id} style={{ background: "rgba(255,255,255,0.05)" }} className="flex items-center justify-between rounded-xl px-4 py-3">
                  <div>
                    <p className="text-white font-medium">{e.description}</p>
                    <p style={{ color: "#6b7280" }} className="text-sm">{e.category}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className={`font-bold ${e.type === "income" ? "text-green-400" : "text-red-400"}`}>
                      {e.type === "income" ? "+" : "-"}${e.amount.toFixed(2)}
                    </p>
                    <button onClick={() => handleDelete(e.id)} style={{ color: "#4b5563" }} className="hover:text-red-400 transition-colors">✕</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}