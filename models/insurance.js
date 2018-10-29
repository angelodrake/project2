module.exports = function(sequelize, DataTypes) {
    var Insurance = sequelize.define("Insurance", {
        company: {
            allowNull: false,
            type: DataTypes.STRING
        },
        Phone: {
            allowNull: false,
            type: DataTypes.STRING
        },
        email: {
            allowNull: false,
            type: DataTypes.STRING
        }
    });

    Insurance.associate = function(models) {
        Insurance.belongsTo (models.Patient, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Insurance;
}