const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Подключение к БД
mongoose.connect('mongodb+srv://admin:83obbrFFlsLFOBGt@cluster0.zmqqzda.mongodb.net/olympiad_db?appName=Cluster0')
    .then(() => console.log('Успешное подключение к MongoDB'))
    .catch(err => console.error('Ошибка подключения:', err));

// ПОЛНАЯ СХЕМА (обязательно обнови этот блок)
const teamSchema = new mongoose.Schema({
    teamName: String,
    country: String,
    city: String,
    institution: String,
    phone: String,
    email: String,
    vkLink: String,
    members: [{
        fio: String,
        faculty: String,
        course: String,
        group: String
    }],
    mentor: {
        fio: String,
        jobTitle: String,
        organization: String,
        email: String
    }
});

const Team = mongoose.model('Team', teamSchema);

// Маршрут для регистрации
app.post('/api/register', async (req, res) => {
    try {
        const newTeam = new Team(req.body);
        await newTeam.save();
        res.status(201).send({ message: 'Регистрация прошла успешно!' });
    } catch (error) {
        res.status(500).send(error);
    }
});

// Маршрут для получения данных в админку
app.get('/api/teams', async (req, res) => {
    try {
        const teams = await Team.find();
        res.json(teams);
    } catch (error) {
        res.status(500).send(error);
    }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Сервер запущен на http://localhost:${PORT}`));