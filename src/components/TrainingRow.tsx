import type { TrainingItem } from "../types";

type Props = {
  item: TrainingItem;
  onEdit: (item: TrainingItem) => void;
  onDelete: (date: string) => void;
};

export default function TrainingRow({ item, onEdit, onDelete }: Props) {
  return (
    <div className="table-row">
      <div className="col-date">{item.display}</div>
      <div className="col-distance">{item.distance}</div>
      <div className="col-actions">
        <button className="action-btn edit-btn" onClick={() => onEdit(item)}>
          ✎
        </button>
        <button className="action-btn delete-btn" onClick={() => onDelete(item.date)}>
          ✕
        </button>
      </div>
    </div>
  );
}