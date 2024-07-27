const taskInput = document.getElementById("task");
const submitBtn = document.getElementById("submitBtn");
const taskContainer = document.querySelector(".tasks");

submitBtn.addEventListener("click", () => {
  if (!taskInput.value) {
    return; // do nothing if the there is no input
  }
  // create an li element with the appropriate class names for the css
  const newTask = document.createElement("li");
  newTask.innerHTML = `
    <p>${taskInput.value}</p>
    <div class="action-btns">
        <input type="checkbox" id="check">
        <button id="deleteBtn" class="delete-btn">X</button>
    </div>
    `;
  // append a new li to the ul(task container)
  taskContainer.appendChild(newTask);

  // clearing the input after task is added
  taskInput.value = "";
  taskInput.focus();
});

taskContainer.addEventListener("click", (event) => {
  // if delete button is clicked
  if (event.target.classList.contains("delete-btn")) {
    // find the closest li element and remove it
    const task = event.target.closest("li");
    task.classList.toggle("remove"); // add the remove class for fading out
    setTimeout(() => {
      task.remove(); // only remove the task after the transition is compelete
    }, 500);
  }
  // if checkbox is clicked
  if (event.target.type === "checkbox") {
    // find the closes li element
    const task = event.target.closest("li");
    // then select the text
    const taskText = task.querySelector("p");
    // add 'checked' to classlist for line through to indicate the task as compeleted
    taskText.classList.toggle("checked");
    // add 'finished' for opacity
    task.classList.toggle("finished");

    if (event.target.checked) {
      taskContainer.appendChild(task); // move checked item to bottom
    } else {
      // move the unchecked item to the top
      taskContainer.insertBefore(task, taskContainer.firstChild);
    }
  }
});
