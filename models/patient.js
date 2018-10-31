module.exports = function (sequelize, DataTypes) {
    var Patient = sequelize.define("Patient", {
        name: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        birthday: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        address: {
            allowNull: false,
            type: DataTypes.TEXT,
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
        },
        bloodType: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        notes: {
            allowNull: true,
            type: DataTypes.STRING,
        },
        emergencyContact: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        contactPhone: {
            allowNull: false,
            type: DataTypes.STRING,
            validate: {
                not: ["[a-z]", "i"],
            }
        }
    });
    Patient.associate = function (models) {
        Patient.hasMany(models.Doctor, {}),
            Patient.hasMany(models.Prescription, {}),
            Patient.hasMany(models.Insurance, {})
    };
    return Patient;
};
