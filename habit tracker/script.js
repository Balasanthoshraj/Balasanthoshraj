
    const habitForm = document.getElementById('habit-form');
    const habitInput = document.getElementById('habit-input');
    const timeInput = document.getElementById('time-input');
    const habitList = document.getElementById('habit-list');

    const totalCount = document.getElementById('total-count');
    const doneCount = document.getElementById('done-count');
    const doneTime = document.getElementById('done-time');

    let habits = JSON.parse(localStorage.getItem('habits')) || [];

    function saveHabits() {
      localStorage.setItem('habits', JSON.stringify(habits));
    }

    function renderHabits() {
      habitList.innerHTML = '';
      let completedCount = 0;
      let completedTime = 0;

      habits.forEach((habit, index) => {
        const li = document.createElement('li');
        li.className = habit.done ? 'completed' : '';
        li.innerHTML = `
          <div class="habit-info">
            <strong>${habit.name}</strong><br>
            Time Spent: ${habit.time} min
          </div>
          <div class="actions">
            <button class="small-btn" onclick="toggleHabit(${index})">${habit.done ? 'Undo' : 'Done'}</button>
            <button class="small-btn" onclick="deleteHabit(${index})">Delete</button>
          </div>
        `;
        habitList.appendChild(li);

        if (habit.done) {
          completedCount++;
          completedTime += parseInt(habit.time);
        }
      });

      totalCount.textContent = habits.length;
      doneCount.textContent = completedCount;
      doneTime.textContent = completedTime;
    }

    function toggleHabit(index) {
      habits[index].done = !habits[index].done;
      saveHabits();
      renderHabits();
    }

    function deleteHabit(index) {
      habits.splice(index, 1);
      saveHabits();
      renderHabits();
    }

    habitForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const habitName = habitInput.value.trim();
      const timeSpent = timeInput.value.trim();
      if (habitName && timeSpent) {
        habits.push({ name: habitName, time: timeSpent, done: false });
        saveHabits();
        renderHabits();
        habitForm.reset();
      }
    });

    renderHabits();
