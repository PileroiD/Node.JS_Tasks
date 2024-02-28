const itemDisplayFlex =
    "item-wrapper d-flex justify-content-between align-items-center";
const itemDisplayNone =
    "item-wrapper d-none justify-content-between align-items-center";

document.addEventListener("click", ({ target }) => {
    if (target.dataset.type === "remove") {
        const id = target.dataset.id;

        remove(id).then(() => {
            target.closest("li").remove();
        });
    } else if (
        target.dataset.type === "edit" ||
        target.dataset.type === "cancel"
    ) {
        toggleItemEditWrappers(target);
    } else if (target.dataset.type === "save") {
        const id = target.dataset.id;
        const input = target.closest(".item-wrapper").querySelector("input");

        const title = target
            .closest("li")
            .querySelector(".item-wrapper.d-none > .title");

        const newTitle = input.value;

        if (newTitle) {
            edit(id, newTitle).then(() => {
                toggleItemEditWrappers(target);
                title.innerHTML = newTitle;
            });
        }
    }
});

const noteAddMessage = document.querySelector(".alert");
if (noteAddMessage) {
    setTimeout(() => {
        noteAddMessage.remove();
    }, 2000);
}

function toggleItemEditWrappers(target) {
    const itemWrapper = target.closest(".item-wrapper.d-flex");
    const itemWrapperEdit = target
        .closest("li")
        .querySelector(".item-wrapper.d-none");
    itemWrapper.className = itemDisplayNone;
    itemWrapperEdit.className = itemDisplayFlex;
}

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
