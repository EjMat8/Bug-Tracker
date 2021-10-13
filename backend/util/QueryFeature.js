class QueryFeature {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  ///(\b(gte|gt|lte|lt)\b/)
  _find() {
    const excluded = ["page", "limit", "sort", "fields"];
    const queryString = { ...this.queryString };
    excluded.forEach((el) => {
      if (queryString[el]) delete queryString[el];
    });
    const queryStringFin = JSON.stringify(queryString).replace(
      /\b(gte|gt|lte|lt)\b/,
      (val) => `$${val}`
    );
    this.query.find(JSON.parse(queryStringFin));
    return this;
  }
  _sort() {
    const sortString = !this.queryString.sort
      ? "-_id"
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
  _paginate(options) {
    const page = this.queryString.page || 1;
    const limit = options.limit || this.queryString.limit || 20;
    const skip = (page - 1) * limit;

    this.query.skip(+skip).limit(+limit);
    return this;
  }
}

module.exports = QueryFeature;
