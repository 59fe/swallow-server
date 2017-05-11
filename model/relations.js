const sequelize = require('../common/db-helper')
const Sequelize = require('sequelize')
const { Poster } = require('./poster')

const relationsTableDefinition = {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement : true,
    primaryKey : true,
    unique : true
  },
  source_id: {
    type: Sequelize.STRING
  },
  target_id: {
    type: Sequelize.STRING
  },
  type: {
    type: Sequelize.STRING
  }
}

const Relations = sequelize.define('relations', relationsTableDefinition, {
  indexes: [{
    unique: true,
    fields: ['id']
  }],
  underscored: true,
  freezeTableName: true,
  timestamps: true,
  createdAt: 'create_time',
  updatedAt: 'update_time'
})

Relations.sync({force: false})

// Relations.belongsTo(Poster, {
//   foreignKey: 'target_id'
// })

module.exports = {
  Relations,
  Params: Object.keys(relationsTableDefinition)
}