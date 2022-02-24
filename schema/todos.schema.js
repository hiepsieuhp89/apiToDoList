const todoSchema = {
  type: "object",
  title: "Todo",
  description: "Todo",
  properties: {
    "name": { "type": "string", "maxLength": 500, "minLength": 1 },
    "priority": { "type": "string", "maxLength": 20, "minLength": 1 },
    "status": { "type": "string", "maxLength": 20, "minLength": 1 },
  },
  required: ["name","priority","status"],
  additionalProperties: false
};
module.exports = todoSchema;