const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");


const Participant = sequelize.define('Participant', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    pdf: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mp3: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

module.exports = Participant;