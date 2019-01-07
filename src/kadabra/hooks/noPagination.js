module.exports = function(context) {
  if (context.params && context.params.query && (context.params.query.$limit === '-1')) {
    context.params.paginate = false;
    delete context.params.query.$limit;
  }
}