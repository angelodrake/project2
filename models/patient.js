module.exports = function(sequelize, DataTypes) {
    var Patient = sequelize.define("Patient", {
        name: {
            allowNull: false,
            type: DataTypes.STRING
        },
        birthday: {
            allowNull: false,
            type: DataTypes.STRING
        },
        address: {
            allowNull: false,
            type: DataTypes.TEXT
        },
        phone: {
            allowNull: false,
            type: DataTypes.STRING,
            validate: {
                not: ["[a-z]", "i"],
            }
        },
        email: {
            allowNull: false,
            type: DataTypes.STRING,
        }
    });
    Patient.associate = function(models) {
        Patient.hasMany(models.Doctor, {}),
        Patient.hasMany(models.Perscription, {})
    };
    return Patient;
};
  