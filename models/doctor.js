module.exports = function(sequelize, DataTypes) {
    var Doctor = sequelize.define("Doctor", {
        name: {
            allowNull: false,
            type: DataTypes.STRING
        },
        specialty: {
            allowNull: false,
            type: DataTypes.STRING
        },
        phone: {
            allowNull: false,
            type: DataTypes.STRING,
            validate: {
                not: ["[a-z]", "i"],
                len: 10
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
  