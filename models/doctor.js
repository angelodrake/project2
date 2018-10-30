module.exports = function(sequelize, DataTypes) {
    var Doctor = sequelize.define("Doctor", {
        name: {
            allowNull: false,
            type: DataTypes.STRING,
            validate: {
                len: 3
            }
        },
        specialty: {
            allowNull: false,
            type: DataTypes.STRING,
            validate: {
                len: 3
            }
        },
        phone: {
            allowNull: false,
            type: DataTypes.STRING,
            validate: {
                not: ["[a-z]", "i"]
            }
        },
        email: {
            allowNull: false,
            type: DataTypes.STRING,
            validate: {
                isEmail: true
            }
        }
    });
    Doctor.associate = function(models) {
        
        Doctor.belongsTo(models.Patient, {
          foreignKey: {
            allowNull: false
          }
        });
      };
    return Doctor;
};
  