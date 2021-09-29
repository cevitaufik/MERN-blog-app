module.exports = (mongoose) => {
  const schema = mongoose.Schema(
      {
        _id: String,
        title: String,
        article: String,
      },
      {timestamps: true},
  );

  schema.method('toJSON', function() {
    const {_id, ...object} = this.toObject();
    object.id = _id;
    return object;
  });

  const Articles = mongoose.model('articles', schema);
  return Articles;
};
