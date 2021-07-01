import { Database } from "@nozbe/watermelondb";
import SqliteAdapter from "@nozbe/watermelondb/adapters/sqlite";

import { schemas } from "./schema";
import { User } from "./models/User";

const adapter = new SqliteAdapter({
  schema: schemas,
});

export const database = new Database({
  adapter,
  modelClasses: [User],
  actionsEnabled: true,
});

