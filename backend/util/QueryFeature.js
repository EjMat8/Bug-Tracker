class QueryFeature {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  ///(\b(gte|gt|lte|lt)\b/)
  _find() {
    const excluded = ["page", "limit", "sort", "fields"];
    excluded.forEach((el) => {
      if (this.queryString[el]) delete this.queryString[el];
    });
    const queryString = JSON.stringify(this.queryString).replace(
      /\b(gte|gt|lte|lt)\b/,
      (val) => `$${val}}`
    );
    this.query.find(JSON.parse(queryString));
    return this;
  }
  _sort() {
    const sortString = !this.queryString.sort
      ? "_id -createdAt"
      : this.queryString.sort.split(",").join(" ");
    this.query.sort(sortString);
    return this;
  }
  _fields() {
    const fieldsString = !this.queryString.fields
      ? "-__v"
      : this.queryString.fields.split(",").join(" ");
    this.query.select(fieldsString);
    return this;
  }
  _paginate(limitOp = null) {
    const page = this.queryString.page || 1;
    const limit = limitOp || this.queryString.limit || 20;
    const skip = (page - 1) * limit;

    this.query.skip(skip).limit(limit);
    return this;
  }
}

module.exports = QueryFeature;
