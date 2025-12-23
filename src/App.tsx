import type {ChangeEvent, FormEvent } from "react";
import type { TrainingItem, FormState } from "./types";
import { toISO } from "./utils";
import { useState } from "react";

import TrainingForm from "./components/TrainingForm";
import TrainingTable from "./components/TrainingTable";

export default function App() {
  const [items, setItems] = useState<TrainingItem[]>([
    { date: "2019-07-20", display: "20.07.19", distance: 5.7 },
    { date: "2019-07-19", display: "19.07.19", distance: 14.2 },
    { date: "2019-07-18", display: "18.07.19", distance: 3.4 },
  ]);

  const [form, setForm] = useState<FormState>({ date: "", distance: "" });
  const [editDate, setEditDate] = useState<string | null>(null);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!form.date || !form.distance) return;

    const iso = toISO(form.date);
    const distance = parseFloat(form.distance);

    // --- РЕДАКТИРОВАНИЕ ---
    if (editDate) {
      setItems(prev =>
        prev
          .map(item =>
            item.date === editDate
              ? { date: iso, display: form.date, distance }
              : item
          )
          .sort((a, b) => (a.date > b.date ? -1 : 1))
      );

      setEditDate(null);
      setForm({ date: "", distance: "" });
      return;
    }

    // --- ДОБАВЛЕНИЕ / СУММИРОВАНИЕ ---
    setItems(prev => {
      const exists = prev.find(i => i.date === iso);

      if (exists) {
        return prev
          .map(i =>
            i.date === iso
              ? { ...i, distance: +(i.distance + distance).toFixed(1) }
              : i
          )
          .sort((a, b) => (a.date > b.date ? -1 : 1));
      }

      return [
        ...prev,
        { date: iso, display: form.date, distance },
      ].sort((a, b) => (a.date > b.date ? -1 : 1));
    });

    setForm({ date: "", distance: "" });
  }

  function handleDelete(date: string) {
    setItems(prev => prev.filter(i => i.date !== date));
  }

  function handleEdit(item: TrainingItem) {
    setForm({ date: item.display, distance: String(item.distance) });
    setEditDate(item.date);
  }

  return (
    <div className="container">
      <TrainingForm
        form={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />

      <TrainingTable
        items={items}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}