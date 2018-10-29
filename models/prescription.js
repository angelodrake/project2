module.exports = function(sequelize, DataTypes) {
    var Prescription = sequelize.define("Prescription", {
        name: {
            allowNull: false,
            type: DataTypes.STRING
        },
        brand: {
            allowNull: false,
            type: DataTypes.STRING
        },
        company: {
            allowNull: false,
            type: DataTypes.STRING
        }
    });

    Prescription.associate = function(models) {
        Prescription.belongsTo (models.Patient, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Prescription;
}