module.exports = function(app) {
    app.dataSources.taskdb.autoupdate('Author', function(err) {
      if (err) throw err;
    });

    app.dataSources.taskdb.autoupdate('Task', function(err) {
        if (err) throw err;
      });
  };