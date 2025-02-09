document.getElementById('submitMood').addEventListener('click', () => {
    const mood = document.getElementById('moodSelect').value;
    fetch('/moods', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mood })
    })
    .then(response => response.json())
    .then(data => {
        const listItem = document.createElement('li');
        listItem.textContent = `${data.date}: ${data.mood}`;
        document.getElementById('moodList').appendChild(listItem);
    });
});

fetch('/moods')
    .then(response => response.json())
    .then(moods => {
        const moodList = document.getElementById('moodList');
        moods.forEach(mood => {
            const listItem = document.createElement('li');
            listItem.textContent = `${mood.date}: ${mood.mood}`;
            moodList.appendChild(listItem);
        });
    });