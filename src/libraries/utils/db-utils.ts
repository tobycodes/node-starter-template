import { ObjectLiteral, Repository } from "typeorm";

export const getEntityColumns = <T extends ObjectLiteral>(repository: Repository<T>): (keyof T)[] => {
  return repository.metadata.columns.map((col) => col.propertyName) as (keyof T)[];
};
