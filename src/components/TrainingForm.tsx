import type { ChangeEvent, FormEvent } from "react";
import type { FormState } from "../types";

type Props = {
  form: FormState;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent) => void;
};

export default function TrainingForm({ form, onChange, onSubmit }: Props) {
  return (
    <div className="form-container">
      <form onSubmit={onSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>Дата (ДД.ММ.ГГ)</label>
            <input
              type="text"
              name="date"
              placeholder="20.07.19"
              value={form.date}
              onChange={onChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Пройдено км</label>
            <input
              type="number"
              name="distance"
              step="0.1"
              min="0"
              placeholder="5.7"
              value={form.distance}
              onChange={onChange}
              required
            />
          </div>

          <button type="submit" className="submit-btn">OK</button>
        </div>
      </form>
    </div>
  );
}