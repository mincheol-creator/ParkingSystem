module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    "fee",
    {
      currentfee: {
        type: DataTypes.INTEGER(15),
        allowNull: false,
        defaultValue: 0
      }
    },
    {
      tableName: "fee",
      timestamps: false
    }
  );
};
