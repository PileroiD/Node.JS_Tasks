document.addEventListener("click", ({ target }) => {
    if (target.dataset.type === "remove") {
        const id = target.dataset.id;

        remove(id).then(() => {
            target.closest("li").remove();
        });
    } else if (target.dataset.type === "edit") {
        const id = target.dataset.id;
        const newTitle = prompt("Введите новое название: ");

        if (newTitle) {
            edit(id, newTitle).then(() => {
                target.closest("li").querySelector(".title").textContent =
                    newTitle;
            });
        }
    }
});

async function edit(id, title) {
    const data = { id, title };
    await fetch(`/`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
}

async function remove(id) {
    await fetch(`/${id}`, {
        method: "DELETE",
    });
}
