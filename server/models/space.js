module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    "space",
    {
      parkingnumber: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        unique: true
      },
      use: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    },
    {
      tableName: "space",
      timestamps: false,
      paranoid: false
    }
  );
};
