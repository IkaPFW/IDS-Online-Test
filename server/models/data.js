'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Data extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Data.belongsTo(models.Status, {foreignKey: 'statusId'})
      // define association here
    }
  }
  Data.init({
    productID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Product ID is required'
        },
        notEmpty: {
          msg: 'Product ID is required'
        }
      }
    },
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Product Name is required'
        },
        notEmpty: {
          msg: 'Product Name is required'
        }
      }
    },
    amount: DataTypes.INTEGER,
    customerName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Customer Name is required'
        },
        notEmpty: {
          msg: 'Customer Name is required'
        }
      }
    },
    statusId: DataTypes.INTEGER,
    transactionDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Transaction Date is required'
        },
        notEmpty: {
          msg: 'Transaction Date is required'
        }
      }
    },
    createBy: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Creator Name is required'
        },
        notEmpty: {
          msg: 'Creator Name is required'
        }
      }
    },
    createOn: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Creation Date is required'
        },
        notEmpty: {
          msg: 'Creation Date is required'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Data',
  });
  return Data;
};