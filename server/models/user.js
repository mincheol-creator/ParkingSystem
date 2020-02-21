module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    "user",
    {
      carnumber: {
        type: DataTypes.STRING(15),
        allowNull: false,
        unique: true
      },
      size: {
        type: DataTypes.STRING(10),
        allowNull: false
      }
    },
    {
      tableName: "user",
      timestamps: true,
      paranoid: true
    }
  );
};
