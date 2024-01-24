const treeContainer = document.getElementById("tree-container");
const tree = document.getElementById("tree");
const nodeTypeSelect = document.getElementById("node-type");
const nodeTextInput = document.getElementById("node-text");
const addNodeBtn = document.getElementById("add-node");
const deleteNodeBtn = document.getElementById("delete-node");
const updateNodeBtn = document.getElementById("update-node");

let activeNode = null;

function createNodeElement(text) {
  const nodeElement = document.createElement("li");
  nodeElement.classList.add("node");
  nodeElement.textContent = text;

  const nodeTextElement = document.createElement("span");
  nodeTextElement.classList.add("node-text");
  nodeTextElement.textContent = text;
  nodeElement.appendChild(nodeTextElement);

  const nodeActionsElement = document.createElement("div");
  nodeActionsElement.classList.add("node-actions");

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => deleteNode(nodeElement));
  nodeActionsElement.appendChild(deleteButton);

  return nodeElement;
}

function deleteNode(nodeElement) {
  if (nodeElement.parentNode) {
    nodeElement.parentNode.removeChild(nodeElement);
    if (nodeElement === activeNode) {
      activeNode = null;
    }
  }
}

function addNode() {
  const nodeType = nodeTypeSelect.value;
  const nodeText = nodeTextInput.value.trim();

  if (!nodeText) {
    alert("Please enter node text.");
    return;
  }

  const newNodeElement = createNodeElement(nodeText);

  if (nodeType === "single") {
    tree.appendChild(newNodeElement);
  } else if (nodeType === "child" && activeNode) {
    activeNode.appendChild(newNodeElement);
  } else if (nodeType === "parent" && activeNode) {
    const newParentNodeElement = createNodeElement("");
    newParentNodeElement.appendChild(newNodeElement);
    tree.insertBefore(newParentNodeElement, activeNode);
    activeNode = newParentNodeElement;
  } else {
    alert("Invalid node type or no active node selected.");
  }

  // Clear the text input field
  nodeTextInput.value = "";
}

function handleNodeClick(event) {
  const clickedNode = event.target.closest(".node");
  if (clickedNode) {
    activeNode = clickedNode;
    updateActiveNodeHighlight();
  }
}

function updateActiveNodeHighlight() {
  tree.querySelectorAll(".node").forEach((nodeElement) => {
    nodeElement.classList.remove("active");
  });
  if (activeNode) {
    activeNode.classList.add("active");
  }
}

// Event listener for node clicks
tree.addEventListener("click", handleNodeClick);

// Add event listener to the button to trigger the addNode function
addNodeBtn.addEventListener("click", addNode);

// Add event listener to the delete node button
deleteNodeBtn.addEventListener("click", () => {
  if (activeNode) {
    deleteNode(activeNode);
  } else {
    alert("No active node selected to delete.");
  }
});

// Add event listener to the update node button
updateNodeBtn.addEventListener("click", () => {
  const updatedText = nodeTextInput.value.trim();
  if (activeNode && updatedText) {
    activeNode.querySelector(".node-text").textContent = updatedText;
  } else {
    alert("No active node selected or no updated text provided.");
  }
});
