module.exports = function(sequelize, DataTypes) {
    var Patient = sequelize.define("Patient", {
        name: {
            allowNull: false,
            type: DataTypes.STRING,
            validate: {
                len: 3
            }
        },
        birthday: {
            allowNull: false,
            type: DataTypes.STRING,
            validate: {
                len: 3
            }
        },
        address: {
            allowNull: false,
            type: DataTypes.TEXT,
            validate: {
                len: 3
            }
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
            validate: {
                len: 3
            }
        }
    });
    Patient.associate = function(models) {
        Patient.hasMany(models.Doctor, {}),
<<<<<<< HEAD
        Patient.hasMany(models.Perscription, {})
        Patient.hasMany(models.Insurance, {})
=======
        Patient.hasMany(models.Prescription, {})
>>>>>>> 886d24fe6a5cf50d0dc96984740bf1c473563854
    };
    return Patient;
};
  