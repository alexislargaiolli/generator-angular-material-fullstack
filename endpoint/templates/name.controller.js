'use strict';

var _ = require('lodash');
<% if (filters.mongoose) { %>
var <%= classedName %> = require('./<%= name %>.model');
<% } %>

// Get list of <%= name %>s
exports.index = function(req, res) {
    <% if (!filters.mongoose) { %>
    res.json([]);
    <% } %>
    <% if (filters.mongoose) { %>
    var query = null;
    if (req.query.count == 'true') {
        query = <%= classedName %>.count();
    } else {
        query = <%= classedName %>.find();
    }
    if (req.query.limit) {
        query.limit(req.query.limit);
    }
    if (req.query.skip) {
        query.skip(req.query.skip);
    }
    if (req.query.sort) {
        query.sort(req.query.sort);
    }
    query.exec(function(err, <%= name %>s) {
        if (err) {
            return handleError(res, err);
        }
        return res.status(200).json(<%= name %>s);
    });
    <% } %>
};
<% if (filters.mongoose) { %>

exports.paginate = function(req, res) {
    var queryFind = <%= classedName %>.find();
    var queryCount = <%= classedName %>.count();
    if (req.query.limit) {
        queryFind.limit(req.query.limit);
    }
    if (req.query.page) {
        var skip = (req.query.page - 1) * req.query.limit;        
        queryFind.skip(skip);
    }
    if (req.query.order) {
        queryFind.sort(req.query.order);
    }
    queryCount.exec(function(err, count) {
        if (err) {
            return handleError(res, err);
        }
        queryFind.exec(function(err, <%= name %>s) {
            if (err) {
                return handleError(res, err);
            }
            return res.status(200).json({ count: count, datas: <%= name %>s });
        });
    });
};

// Get a single <%= name %>
exports.show = function(req, res) {
    <%= classedName %>.findById(req.params.id, function(err, <%= name %>) {
        if (err) {
            return handleError(res, err);
        }
        if (!<%= name %>) {
            return res.status(404).send('Not Found');
        }
        return res.json(<%= name %>);
    });
};

// Creates a new <%= name %> in the DB.
exports.create = function(req, res) {
    <%= classedName %>.create(req.body, function(err, <%= name %>) {
        if (err) {
            return handleError(res, err);
        }
        return res.status(201).json(<%= name %>);
    });
};

// Updates an existing <%= name %> in the DB.
exports.update = function(req, res) {
    if (req.body._id) { delete req.body._id; }
    <%= classedName %>.findById(req.params.id, function(err, <%= name %>) {
        if (err) {
            return handleError(res, err);
        }
        if (!<%= name %>) {
            return res.status(404).send('Not Found');
        }
        var updated = _.merge(<%= name %>, req.body);
        updated.save(function(err) {
            if (err) {
                return handleError(res, err);
            }
            return res.status(200).json(<%= name %>);
        });
    });
};

// Deletes a <%= name %> from the DB.
exports.destroy = function(req, res) {
    <%= classedName %>.findById(req.params.id, function(err, <%= name %>) {
        if (err) {
            return handleError(res, err);
        }
        if (!<%= name %>) {
            return res.status(404).send('Not Found');
        }
        <%= name %>.remove(function(err) {
            if (err) {
                return handleError(res, err);
            }
            return res.status(204).send('No Content');
        });
    });
};

function handleError(res, err) {
    return res.status(500).send(err);
}
<% } %>
