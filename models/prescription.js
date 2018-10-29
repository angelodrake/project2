module.exports = function(sequelize, DataTypes) {
    var Perscription = sequelize.define("Perscription", {
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

    Perscription.associate = function(models) {
        Perscription.belongsTo (models.Patient, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Perscription;
}