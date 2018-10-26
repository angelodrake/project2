module.exports = function(sequelize, DataTypes) {
    var Patient = sequelize.define("Patient", {
        name: {
            allowNull: false,
            type: DataTypes.STRING
        },
        birthday: {
            allowNull: false,
            type: DataTypes.DATEONLY
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
    Patient.associate = function(models) {
        Patient.belongsToMany(models.Doctor, {
            through: "DoctorPatient",
            as: "doctors"
        })
    }; 
    return Patient;
};
  