export default (sequelize, DataTypes) => {
  return sequelize.define('Customer', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    tenantId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    tableName: 'customers',
    timestamps: true,
  });
};
