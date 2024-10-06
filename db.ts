import Dexie, { type EntityTable } from 'dexie';

interface Tag {
  id: number;
  name: string;
  color: string;
}

interface Log {
  id: number;
  description: string;
  createdAt: number;
  amount: number;
  tagId: number;
}

const db = new Dexie('ExpenseAnalyser') as Dexie & {
  tags: EntityTable<Tag, 'id'>;
  logs: EntityTable<Log, 'id'>;
};

db.version(1).stores({
  tags: '++id, &name',
  logs: '++id, createdAt, tagId, amount',
});

export type { Tag, Log };
export { db };
