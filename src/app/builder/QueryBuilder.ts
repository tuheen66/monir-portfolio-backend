import { FilterQuery, Query } from 'mongoose';

interface QueryObject {
    search?: string;
    [key: string]: unknown;
    minPrice?: number;
    maxPrice?: number;
    price?: {
      $gte?: number;
      $lte?: number;
    };
  }

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    const search = this?.query?.search;

    if (search) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: search, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    }

    return this;
  }

  filter() {
    const queryObj:QueryObject = { ...this.query }; // copy

    // Filtering
    const excludeFields = ['search', 'sort', 'limit', 'page', 'fields'];

    excludeFields.forEach((el) => delete queryObj[el]);

    // Add price range filter
    if (queryObj.minPrice || queryObj.maxPrice) {
        queryObj.price = {} as Record<string, number>;
        if (queryObj.minPrice) {
          queryObj.price.$gte = queryObj.minPrice;
          delete queryObj.minPrice;
        }
        if (queryObj.maxPrice) {
          queryObj.price.$lte = queryObj.maxPrice;
          delete queryObj.maxPrice;
        }
      }

    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);

    return this;
  }

  sort() {
    const sort =
      (this?.query?.sort as string)?.split(',')?.join(' ') || '-createdAt';
    this.modelQuery = this.modelQuery.sort(sort as string);

    return this;
  }

  paginate() {
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 15;
    const skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);

    return this;
  }

  fields() {
    const fields =
      (this?.query?.fields as string)?.split(',')?.join(' ') || '-__v';

    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }
}

export default QueryBuilder;
