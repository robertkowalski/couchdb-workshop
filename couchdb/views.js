var ddoc = {
  _id: '_design/expenses',
  views: {},
  lists: {},
  shows: {},
  validate_doc_update: function (newDoc, oldDoc, userCtx, secObj) {
    if (newDoc._deleted === true) {
      return;
    }
    if (!newDoc.name) {
      throw({forbidden: 'Document must have an item name.'});
    }
    if (!newDoc.price) {
      throw({forbidden: 'Document must have a price.'});
    }
    if (!/\d+\.\d\d/.test(newDoc.price)) {
      throw({forbidden: 'Price must be a number and have two decimal places after a dot.'});
    }
  }
};

// _design/expenses/_view/byName
ddoc.views.byName = {
  map: function (doc) {
    emit(doc.name, doc.price);
  }
};

module.exports = ddoc;
