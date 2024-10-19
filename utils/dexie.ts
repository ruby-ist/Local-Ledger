import Dexie, { type EntityTable } from 'dexie';

interface Tag {
  id?: number;
  name: string;
  color: string;
}

interface LogWithTagId {
  id?: number;
  description: string;
  createdAt: number;
  amount: number;
  tagId: number;
}

interface LogWithTag {
  id?: number;
  description: string;
  createdAt: number;
  amount: number;
  tag: Tag;
}

type Log = LogWithTag | LogWithTagId;

interface Group {
  id: number;
  amount: number;
  name: string;
  color: string;
}

const db = new Dexie('ExpenseAnalyser') as Dexie & {
  tags: EntityTable<Tag, 'id'>;
  logs: EntityTable<Log, 'id'>;
};

db.version(1).stores({
  tags: '++id, &name',
  logs: '++id, createdAt, tagId, amount',
});

db.on('populate', (transaction) => {
  transaction.table('tags').add({ name: 'Others', color: '#d9d9d9' });
});

export type { Tag, Log, Group, LogWithTag, LogWithTagId };
export { db };
