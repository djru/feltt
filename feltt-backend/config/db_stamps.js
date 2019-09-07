const uuid = require('uuid/v1');

module.exports = (updated_created = true) => {
    const j = {
        id: uuid(),
        updated_at: new Date()
    }
    if (!!updated_created) {
        j.created_at = new Date()
    }
    return j
}