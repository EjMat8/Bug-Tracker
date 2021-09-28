class QueryFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ["sort", "page", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);
    const queryString = JSON.stringify(queryObj).replace(
      /\b(gte|lte|lt|gt)\b/g,
      (match) => `$${match}`
    );
    this.query.find(JSON.parse(queryString));
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      this.query.sort(this.queryString.split(",").join(" "));
    } else {
      this.query.sort("-day _id");
    }
    return this;
  }
  limitFields() {
    if (this.queryString.fields) {
      this.query.select(this.queryString.fields.split(",").join(" "));
    } else {
      this.query.select("-__v");
    }
    return this;
  }
  paginate() {
    const page = +this.queryString.page || 1;
    const limit = +this.queryString.limit || 20;
    const skip = (page - 1) * limit;
    this.query.skip(skip).limit(limit);
    return this;
  }
}

module.exports = QueryFeatures;
