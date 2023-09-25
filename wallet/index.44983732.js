// Constants
const DB_NAME = "wallet";
const DB_VERSION = 2;
const ITEMS_STORE_NAME = "items";
const TAGS_STORE_NAME = "tags";
let items = [];
let tags = [];
let lastItemId = 0;
let lastTagId = 0;
// Elements
const $itemsList = document.getElementById("items");
const $itemTemplate = document.getElementById("item-tmpl");
const $newItemDialog = document.getElementById("new-item-dialog");
const $newItemForm = document.getElementById("new-item-form");
const $addItemBtn = document.getElementById("add-item");
const $closeNewItemDialogBtn = document.getElementById("close-new-item-dialog");
const $tagsList = document.getElementById("tags");
const $tagTemplate = document.getElementById("tag-tmpl");
const $newTagDialog = document.getElementById("new-tag-dialog");
const $newTagForm = document.getElementById("new-tag-form");
const $addTagBtn = document.getElementById("add-tag");
const $closeNewTagDialogBtn = document.getElementById("close-new-tag-dialog");
const $tagsSelect = document.getElementById("tags-select");
const $newItemFormSubitemsList = document.getElementById("new-item-form-subitems");
const $newItemAddSubitemBtn = document.getElementById("new-item-add-subitem");
const $subitemFormTemplate = document.getElementById("subitem-form-tmpl");
const $subitemTemplate = document.getElementById("subitem-tmpl");
// Render
function renderItem(item) {
    const $clone = $itemTemplate.content.cloneNode(true);
    const $item = $clone.querySelector(".item");
    $item.querySelector(".item-text").textContent = item.text;
    $item.querySelector(".item-price").textContent = item.price;
    const itemTag = tags.find((tag)=>tag.id === item.tag);
    $item.querySelector(".item-tag").textContent = itemTag?.name || "";
    $item.querySelector(".item-remove").onclick = ()=>{
        items = items.filter((i)=>i.id !== item.id);
        removeItemFromDb(item);
        $item.remove();
    };
    if (item.subitems?.length > 0) {
        const $subitemsList = $item.querySelector(".item-subitems");
        item.subitems.forEach((subitem)=>{
            const $subitem = renderSubitem(subitem);
            $subitemsList.appendChild($subitem);
        });
    }
    return $item;
}
function renderItems() {
    items.forEach((item)=>{
        const $item = renderItem(item);
        $itemsList.appendChild($item);
    });
}
function renderSubitemForm() {
    const $clone = $subitemFormTemplate.content.cloneNode(true);
    const $subitem = $clone.querySelector(".subitem-form");
    const $subitemSelect = $subitem.querySelector("select");
    tags.forEach((tag)=>{
        const $tag = renderTagOption(tag);
        $subitemSelect.appendChild($tag);
    });
    return $subitem;
}
function renderSubitem(subitem) {
    const $clone = $subitemTemplate.content.cloneNode(true);
    const $subitem = $clone.querySelector(".subitem");
    $subitem.querySelector(".subitem-text").textContent = subitem.text;
    $subitem.querySelector(".subitem-price").textContent = subitem.price;
    const subitemTag = tags.find((tag)=>tag.id === subitem.tag);
    $subitem.querySelector(".subitem-tag").textContent = subitemTag?.name || "";
    return $subitem;
}
function renderTag(tag) {
    const $clone = $tagTemplate.content.cloneNode(true);
    const $tag = $clone.querySelector(".tag");
    $tag.querySelector(".tag-name").textContent = tag.name;
    $tag.querySelector(".tag-remove").onclick = ()=>{
        const tagItems = items.filter((item)=>item.tag === tag.id);
        if (tagItems.length > 0) {
            alert("Тег нельзя удалить");
            console.log({
                tagItems
            });
            return;
        }
        tags = tags.filter((t)=>t.id !== tag.id);
        removeTagFromDb(tag);
        $tag.remove();
        updateTagsSelect();
    };
    return $tag;
}
function renderTags() {
    tags.forEach((tag)=>{
        const $tag = renderTag(tag);
        $tagsList.appendChild($tag);
    });
}
function renderTagOption(tag) {
    const $option = document.createElement("option");
    $option.textContent = tag.name;
    $option.value = tag.id;
    return $option;
}
function updateTagsSelect() {
    $tagsSelect.innerHTML = "";
    tags.forEach((tag)=>{
        const $option = renderTagOption(tag);
        $tagsSelect.appendChild($option);
    });
}
function resetNewItemForm() {
    $newItemForm.reset();
    $newItemFormSubitemsList.innerHTML = "";
}
// Database
const dbRequest = indexedDB.open(DB_NAME, DB_VERSION);
dbRequest.onupgradeneeded = function() {
    let db = dbRequest.result;
    if (!db.objectStoreNames.contains(ITEMS_STORE_NAME)) db.createObjectStore(ITEMS_STORE_NAME, {
        keyPath: "id"
    });
    if (!db.objectStoreNames.contains(TAGS_STORE_NAME)) db.createObjectStore(TAGS_STORE_NAME, {
        keyPath: "id"
    });
};
dbRequest.onerror = function() {
    console.error("DB ERROR", dbRequest.error);
};
dbRequest.onsuccess = function() {
    let db = dbRequest.result;
    // Получить записи
    let tagsTransaction = db.transaction(TAGS_STORE_NAME);
    let tagsStore = tagsTransaction.objectStore(TAGS_STORE_NAME);
    const tagsRequest = tagsStore.getAll();
    tagsRequest.onsuccess = function() {
        const result = tagsRequest.result;
        if (result.length > 0) lastTagId = result[result.length - 1].id;
        tags = result;
        renderTags();
        updateTagsSelect();
        let itemsTransaction = db.transaction(ITEMS_STORE_NAME);
        let itemsStore = itemsTransaction.objectStore(ITEMS_STORE_NAME);
        const itemsRequest = itemsStore.getAll();
        itemsRequest.onsuccess = function() {
            const result = itemsRequest.result;
            if (result.length > 0) lastItemId = result[result.length - 1].id;
            items = result;
            renderItems();
        };
    };
};
function addItemToDb(item) {
    let db = dbRequest.result;
    let transaction = db.transaction(ITEMS_STORE_NAME, "readwrite");
    let items = transaction.objectStore(ITEMS_STORE_NAME);
    let request = items.add(item);
    request.onsuccess = function() {
        alert("Запись успешно сохранена");
    };
    request.onerror = function() {
        alert("Не удалось сохранить запись");
        console.error(request.error);
    };
}
function removeItemFromDb(item) {
    let db = dbRequest.result;
    let transaction = db.transaction(ITEMS_STORE_NAME, "readwrite");
    let items = transaction.objectStore(ITEMS_STORE_NAME);
    let request = items.delete(item.id);
    request.onsuccess = function() {
        alert("Запись успешно удалена");
    };
    request.onerror = function() {
        alert("Не удалось удалить запись");
        console.error(request.error);
    };
}
function addTagToDb(tag) {
    let db = dbRequest.result;
    let transaction = db.transaction(TAGS_STORE_NAME, "readwrite");
    let tags = transaction.objectStore(TAGS_STORE_NAME);
    let request = tags.add(tag);
    request.onsuccess = function() {
        alert("Запись успешно сохранена");
    };
    request.onerror = function() {
        alert("Не удалось сохранить запись");
        console.error(request.error);
    };
}
function removeTagFromDb(tag) {
    let db = dbRequest.result;
    let transaction = db.transaction(TAGS_STORE_NAME, "readwrite");
    let tags = transaction.objectStore(TAGS_STORE_NAME);
    let request = tags.delete(tag.id);
    request.onsuccess = function() {
        alert("Запись успешно удалена");
    };
    request.onerror = function() {
        alert("Не удалось удалить запись");
        console.error(request.error);
    };
}
// DOM
$newItemForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    const fd = new FormData($newItemForm);
    const subitemTexts = fd.getAll("subitems[text][]");
    const subitemPrices = fd.getAll("subitems[price][]");
    const subitemTags = fd.getAll("subitems[tag][]");
    const createdAt = +new Date();
    const newItem = {
        id: ++lastItemId,
        text: fd.get("text"),
        price: fd.get("price"),
        tag: Number(fd.get("tag")),
        createdAt,
        subitems: subitemTexts.map((text, i)=>{
            return {
                id: ++lastItemId,
                text,
                price: subitemPrices[i],
                tag: Number(subitemTags[i]),
                createdAt
            };
        })
    };
    items.push(newItem);
    const $item = renderItem(newItem);
    $itemsList.appendChild($item);
    addItemToDb(newItem);
    resetNewItemForm();
    $newItemDialog.close();
});
$addItemBtn.addEventListener("click", ()=>{
    $newItemDialog.showModal();
});
$closeNewItemDialogBtn.addEventListener("click", ()=>{
    resetNewItemForm();
    $newItemDialog.close();
});
$newTagForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    const newTag = {
        id: ++lastTagId,
        name: $newTagForm.elements.name.value,
        createdAt: +new Date()
    };
    tags.push(newTag);
    const $tag = renderTag(newTag);
    $tagsList.appendChild($tag);
    const $tagOption = renderTagOption(newTag);
    $tagsSelect.appendChild($tagOption);
    addTagToDb(newTag);
    $newTagForm.reset();
    $newTagDialog.close();
});
$addTagBtn.addEventListener("click", ()=>{
    $newTagDialog.showModal();
});
$closeNewTagDialogBtn.addEventListener("click", ()=>{
    $newTagForm.reset();
    $newTagDialog.close();
});
$newItemAddSubitemBtn.addEventListener("click", ()=>{
    const $subitemForm = renderSubitemForm();
    $newItemFormSubitemsList.appendChild($subitemForm);
});

//# sourceMappingURL=index.44983732.js.map
