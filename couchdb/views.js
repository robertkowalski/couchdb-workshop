var ddoc = {
  _id: '_design/expenses', views: {}, lists: {}, shows: {}
};

// _design/expenses/_view/byName
ddoc.views.byName = {
  map: function (doc) {
    emit(doc.name, doc.price);
  }
};

module.exports = ddoc;
