import  type { TrainingItem } from "../types";
import TrainingRow from "./TrainingRow";

type Props = {
  items: TrainingItem[];
  onEdit: (item: TrainingItem) => void;
  onDelete: (date: string) => void;
};

export default function TrainingTable({ items, onEdit, onDelete }: Props) {
  return (
    <div className="data-table">
      <div className="table-header">
        <div className="col-date">Дата</div>
        <div className="col-distance">Км</div>
        <div className="col-actions">Действия</div>
      </div>

      <div className="table-body">
        {items.length === 0 && (
          <div className="empty-state">Нет данных</div>
        )}

        {items.map(item => (
          <TrainingRow
            key={item.date}
            item={item}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}