
define(['../util/ajax'], function(ajax) {
    'use strict';

    return {
        diff: function(workspaceId) {
            return ajax('GET', '/workspace/diff', {
                workspaceId: workspaceId || publicData.currentWorkspaceId
            });
        },

        all: function() {
            return ajax('GET', '/workspace/all');
        },

        get: function(workspaceId) {
            return ajax('GET', '/workspace', {
                workspaceId: workspaceId || publicData.currentWorkspaceId
            }).then(function(workspace) {
                workspace.vertices = _.indexBy(workspace.vertices, 'vertexId');
                return workspace;
            });
        },

        'delete': function(workspaceId) {
            return ajax('DELETE', '/workspace', {
                workspaceId: workspaceId
            });
        },

        save: function(workspaceId, changes) {
            return ajax('POST', '/workspace/update', {
                workspaceId: workspaceId,
                data: {
                    entityUpdates: [],
                    entityDeletes: [],
                    userUpdates: [],
                    userDeletes: []
                }
            })

        },

        vertices: function(workspaceId) {
            return ajax('GET', '/workspace/vertices', {
                workspaceId: workspaceId || publicData.currentWorkspaceId
            });
        },

        edges: function(workspaceId, additionalVertices) {
            return ajax('GET', '/workspace/edges', {
                workspaceId: workspaceId || publicData.currentWorkspaceId
            }).then(function(result) {
                return result.edges;
            })
        },

        create: function(options) {
            return ajax('POST', '/workspace/create', options);
        }
    }
})