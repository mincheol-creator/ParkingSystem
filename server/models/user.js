module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    "user",
    {
      parkingnumber: {
        type: DataTypes.INTEGER(15),
        allowNull: false,
        unique: true
      },
      use: {
        type: DataTypes.TINYINT(1),
        allowNull: false,
        defaultValue: false
      },
      carnumber: {
        type: DataTypes.STRING(15),
        allowNull: true,
        unique: true
      },
      size: {
        type: DataTypes.STRING(10),
        allowNull: true
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: true
      }
    },
    {
      tableName: "user",
      timestamps: false
    }
  );
};
