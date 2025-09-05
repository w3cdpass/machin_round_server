const Task = require('../model/Task');

exports.createTask = async (req, res) => {
    try {
        const { lat, lon } = req.query;
        async function weatherdata() {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=4bd6479ce767b7d890381190de3ece0d`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await response.json()
            const completeData = {
                weather: data,
                ...req.body
            }
            const task = await Task.create(completeData);
            res.status(201).json({ satus: 'Task Created', task: task })
        }
        await weatherdata()
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

exports.getAllTask = async (req, res) => {
    try {
        const allTask = await Task.find().populate('createdBy', 'name email');
        res.status(200).json({ status: 'success', tasks: allTask })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}



exports.deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTask = await Task.findByIdAndDelete(id);
        res.status(204).json({ status: 'Deleted', taskDeleted: deleteTask })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}


exports.putNewField = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = req.body;

        const updatedTask = await Task.findByIdAndUpdate(
            id,
            updated,
            { new: true, runValidators: true }
        );


        if (!updatedTask) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.status(200).json({ status: 'Task updated', updated: updatedTask });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.patchField = async (req, res) => {
    try {
        const { id } = req.params;
        const patchUpdate = req.body;
        const updatedValue = await Task.findByIdAndUpdate(
            id,
            { $set: patchUpdate },
            { new: true, runValidators: true }
        )

        res.status(200).json({
            status: 'Task partially updated',
            updated: updatedValue
        });
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
};