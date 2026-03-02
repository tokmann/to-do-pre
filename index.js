let items = [];

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");

formElement.addEventListener("submit", (event) => {
  event.preventDefault();

  const input = inputElement.value.trim();

  const item = createItem(input);
  listElement.prepend(item);

  items = getTasksFromDOM();
  saveTasks(items);

  formElement.reset();
});

function loadTasks() {
  const defaultTasks = [
    "Сделать проектную работу",
    "Полить цветы",
    "Пройти туториал по Реакту",
    "Сделать фронт для своего проекта",
    "Прогуляться по улице в солнечный день",
    "Помыть посуду",
  ];
  const tasksFromLocalStorage = JSON.parse(window.localStorage.getItem("tasks"));
  if (!tasksFromLocalStorage) return defaultTasks;
  return tasksFromLocalStorage;
}

function createItem(item) {
  const template = document.getElementById("to-do__item-template");
  const clone = template.content.querySelector(".to-do__item").cloneNode(true);
  const textElement = clone.querySelector(".to-do__item-text");
  const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
  const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
  const editButton = clone.querySelector(".to-do__item-button_type_edit");

  textElement.textContent = item;

  deleteButton.addEventListener("click", () => {
    clone.remove();
    items = getTasksFromDOM();
    saveTasks(items);
  });

  duplicateButton.addEventListener("click", () => {
    const itemName = textElement.textContent.trim();
    const newItem = createItem(itemName);
    listElement.prepend(newItem);
    const items = getTasksFromDOM();
    saveTasks(items);
  });

  editButton.addEventListener("click", () => {
    textElement.contentEditable = "true";
    textElement.focus();
  });

  textElement.addEventListener("blur", () => {
    textElement.contentEditable = "false";
    items = getTasksFromDOM();
    saveTasks(items);
  });

  return clone;
}

function getTasksFromDOM() {
  const itemsNamesElements = listElement.querySelectorAll(".to-do__item-text");
  let tasks = [];
  itemsNamesElements.forEach((item) => {
    const text = item.textContent.trim();
    tasks.push(text);
  });
  return tasks;
}

function saveTasks(tasks) {
  window.localStorage.setItem("tasks", JSON.stringify(tasks));
}

items = loadTasks();
items.forEach((item) => {
  const itemElement = createItem(item);
  listElement.append(itemElement);
});
