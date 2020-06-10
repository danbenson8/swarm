const mongoose = require('mongoose');

class AdminPermissions {
    constructor(_create, _delete, _edit) {
        this.create = _create;
        this.delete = _delete;
        this.edit = _edit;
    }
}

class ManagePermissions {
    constructor(_create, _delete, _edit, _suggest, _view) {
        this.create = _create;
        this.delete = _delete;
        this.edit = _edit;
        this.suggest = _suggest;
        this.view = _view;
    }
}

class ActionPermissions {
    constructor(_vote, _abstain, _veto, _pause, _resume) {
        this.vote = _vote;
        this.abstain = _abstain;
        this.veto = _veto;
        this.pause = _pause;
        this.resume = _resume;
    }
}

class ExportPermissions {
    constructor(_raw, _analysis, _summary) {
        this.raw = _raw;
        this.analysis = _analysis;
        this.summary = _summary;
    }
}

const deityPermissions = Object.freeze({
    admin: new AdminPermissions(true, true, true),
    manage: new ManagePermissions(true, true, true, true, true),
    action: new ActionPermissions(true, true, true, true, true),
    export: new ExportPermissions(true, true, true)
})

const royaltyPermissions = Object.freeze({
    admin: new AdminPermissions(false, false, false),
    manage: new ManagePermissions(true, true, true, true, true),
    action: new ActionPermissions(true, true, true, true, true),
    export: new ExportPermissions(true, true, true)
})

const scoutPermissions = Object.freeze({
    admin: new AdminPermissions(false, false, false),
    manage: new ManagePermissions(true, false, true, true, true),
    action: new ActionPermissions(true, true, false, true, true),
    export: new ExportPermissions(true, true, true)
})

const workerPermissions = Object.freeze({
    admin: new AdminPermissions(false, false, false),
    manage: new ManagePermissions(false, false, false, true, true),
    action: new ActionPermissions(true, true, false, false, false),
    export: new ExportPermissions(false, true, true)
})

const hatchlingPermissions = Object.freeze({
    admin: new AdminPermissions(false, false, false),
    manage: new ManagePermissions(false, false, false, true, true),
    action: new ActionPermissions(true, true, false, false, false),
    export: new ExportPermissions(false, false, false)
})

const exilePermissions = Object.freeze({
    admin: new AdminPermissions(false, false, false),
    manage: new ManagePermissions(false, false, false, false, false),
    action: new ActionPermissions(false, false, false, false, false),
    export: new ExportPermissions(false, false, false)
})

const Permissions = Object.freeze({
    Deity: 'deity',
    Royalty: 'royalty',
    Scout: 'scout',
    Worker: 'worker',
    Hatchling: 'hatchling',
    Exile: 'exile'
})

const PermissionSchema = new mongoose.Schema({
    permission: {
        type: String,
        enum: Object.values(Permissions),
    }
}, {
    _id: false,
})
Object.assign(PermissionSchema.statics, {
    Permissions
})

module.exports = {
    deityPermissions,
    royaltyPermissions,
    scoutPermissions,
    workerPermissions,
    hatchlingPermissions,
    exilePermissions,
    Permissions,
    PermissionSchema
}