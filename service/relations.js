const { Relations, Params } = require('../model/relations')
const Tool = require('../common/tool')

exports.add = function (data) {
  data = Tool.filterParams(data, Params)
  return Relations.findOrCreate({
    where: data,
    defaults: data
  }).then(result=>{
    return Tool.prepareSuccess(data)
  }).catch(err=>{
    Tool.logger.error(err)
    return Tool.prepareFailure({}, err)
  })
}

exports.remove = function (data) {
  return Relations.destroy({where: data}).then(result=>{
    return Tool.prepareSuccess(true)
  }).catch(err=>{
    Tool.logger.error(err)
    return Tool.prepareFailure(false, err)
  })
}