// Helper function to swap two elements
async function swap(el1, el2) {
    const style1 = window.getComputedStyle(el1);
    const style2 = window.getComputedStyle(el2);

    const transform1 = style1.getPropertyValue("height");
    const transform2 = style2.getPropertyValue("height");

    el1.style.height = transform2;
    el2.style.height = transform1;

    // Add a delay after swapping for animation effect
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  function generateArrayFromInput() {
    const input = document.getElementById("array-input").value;
    const array = input.split(",").map(num => parseInt(num.trim()));
    return array;
  }

  // Bubble Sort algorithm
  async function bubbleSort() {
    const bars = document.querySelectorAll(".bar");

    for (let i = 0; i < bars.length - 1; i++) {
      for (let j = 0; j < bars.length - i - 1; j++) {
        // Highlight the bars being compared
        bars[j].style.background = "red";
        bars[j + 1].style.background = "red";

        // Compare and swap if necessary
        if (parseInt(bars[j].style.height) > parseInt(bars[j + 1].style.height)) {
          await swap(bars[j], bars[j + 1]);
        }

        // Revert the color back to default
        bars[j].style.background = "#6c757d";
        bars[j + 1].style.background = "#6c757d";
      }

      // Mark the sorted bar in green
      bars[bars.length - i - 1].style.background = "green";
    }

    // Mark the first bar in green (already sorted)
    bars[0].style.background = "green";
  }

  // Selection Sort algorithm
  async function selectionSort() {
    const bars = document.querySelectorAll(".bar");
    const n = bars.length;

    for (let i = 0; i < n - 1; i++) {
      let minIndex = i;

      // Highlight the current minimum bar
      bars[minIndex].style.background = "red";

      for (let j = i + 1; j < n; j++) {
        // Highlight the bars being compared
        bars[j].style.background = "red";

        // Find the minimum element and update minIndex
        if (parseInt(bars[j].style.height) < parseInt(bars[minIndex].style.height)) {
          // Revert the color of the previous minimum bar
          bars[minIndex].style.background = "#6c757d";
          minIndex = j;
        } else {
          // Revert the color of the current bar
          bars[j].style.background = "#6c757d";
        }
      }

      // Swap the minimum bar with the first unsorted bar
      await swap(bars[minIndex], bars[i]);

      // Mark the sorted bar in green
      bars[i].style.background = "green";
    }

    // Mark the last bar in green (already sorted)
    bars[n - 1].style.background = "green";
  }

  // Insertion Sort algorithm
  async function insertionSort() {
    const bars = document.querySelectorAll(".bar");
    const n = bars.length;

    for (let i = 1; i < n; i++) {
      const key = parseInt(bars[i].style.height);
      let j = i - 1;

      // Highlight the key bar being inserted
      bars[i].style.background = "red";

      while (j >= 0 && parseInt(bars[j].style.height) > key) {
        // Move bars to the right
        await swap(bars[j], bars[j + 1]);

        j--;

        // Revert the color of the bars being compared
        bars[j + 1].style.background = "#6c757d";
        bars[j + 2].style.background = "red";
      }

      // Insert the key bar in the correct position
      bars[j + 1].style.height = `${key}px`;

      // Revert the color back to default
      bars[j + 1].style.background = "#6c757d";
    }

    // Mark all bars in green (already sorted)
    for (let i = 0; i < n; i++) {
      bars[i].style.background = "green";
    }
  }

  // Quick Sort algorithm
  async function quickSort(bars, low, high) {
    if (low < high) {
      const pivotIndex = await partition(bars, low, high);
      await quickSort(bars, low, pivotIndex - 1);
      await quickSort(bars, pivotIndex + 1, high);
    } else if (low === high) {
      bars[low].style.background = "green";
    }
  }

  async function partition(bars, low, high) {
    const pivot = parseInt(bars[high].style.height);
    let i = low - 1;

    for (let j = low; j < high; j++) {
      // Highlight the bars being compared
      bars[j].style.background = "red";
      bars[high].style.background = "red";

      if (parseInt(bars[j].style.height) < pivot) {
        i++;
        await swap(bars[i], bars[j]);
      }

      // Revert the color back to default
      bars[j].style.background = "#6c757d";
      bars[high].style.background = "#6c757d";
    }

    await swap(bars[i + 1], bars[high]);

    // Mark the pivot bar in green
    bars[high].style.background = "green";

    return i + 1;
  }

  // Merge Sort algorithm
  async function mergeSort(bars, l, r) {
    if (l < r) {
      const m = Math.floor((l + r) / 2);

      await mergeSort(bars, l, m);
      await mergeSort(bars, m + 1, r);
      await merge(bars, l, m, r);
    } else if (l === r) {
      bars[l].style.background = "green";
    }
  }

  async function merge(bars, l, m, r) {
    const n1 = m - l + 1;
    const n2 = r - m;

    const leftArr = new Array(n1);
    const rightArr = new Array(n2);

    // Copy data to temporary arrays
    for (let i = 0; i < n1; i++) {
      leftArr[i] = parseInt(bars[l + i].style.height);
    }

    for (let j = 0; j < n2; j++) {
      rightArr[j] = parseInt(bars[m + 1 + j].style.height);
    }

    let i = 0;
    let j = 0;
    let k = l;

    while (i < n1 && j < n2) {
      // Highlight the bars being compared
      bars[l + i].style.background = "red";
      bars[m + 1 + j].style.background = "red";

      if (leftArr[i] <= rightArr[j]) {
        bars[k].style.height = `${leftArr[i]}px`;
        i++;
      } else {
        bars[k].style.height = `${rightArr[j]}px`;
        j++;
      }

      // Revert the color back to default
      bars[l + i].style.background = "#6c757d";
      bars[m + 1 + j].style.background = "#6c757d";

      k++;
    }

    // Copy the remaining elements of leftArr[]
    while (i < n1) {
      bars[k].style.height = `${leftArr[i]}px`;
      i++;
      k++;
    }

    // Copy the remaining elements of rightArr[]
    while (j < n2) {
      bars[k].style.height = `${rightArr[j]}px`;
      j++;
      k++;
    }
  }

  // Event listener for Bubble Sort button
  document.getElementById("bubble-sort-btn").addEventListener("click", bubbleSort);

  // Event listener for Selection Sort button
  document.getElementById("selection-sort-btn").addEventListener("click", selectionSort);

  // Event listener for Insertion Sort button
  document.getElementById("insertion-sort-btn").addEventListener("click", insertionSort);

  // Event listener for Quick Sort button
  document.getElementById("quick-sort-btn").addEventListener("click", async function () {
    const bars = document.querySelectorAll(".bar");
    await quickSort(bars, 0, bars.length - 1);
  });

  // Event listener for Merge Sort button
  document.getElementById("merge-sort-btn").addEventListener("click", async function () {
    const bars = document.querySelectorAll(".bar");
    await mergeSort(bars, 0, bars.length - 1);
  });

  // Event listener for Generate New Array button
  document.getElementById("generate-array-btn").addEventListener("click", generateNewArray);

  // Function to generate a new array of random heights
  function generateNewArray() {
    const container = document.getElementById("bars-container");
    container.innerHTML = "";

    const arr = [];
    const numBars = 100;

    for (let i = 0; i < numBars; i++) {
      const height = Math.floor(Math.random() * 400) + 10;
      arr.push(height);
    }

    for (let i = 0; i < numBars; i++) {
      const bar = document.createElement("div");
      bar.classList.add("bar");
      bar.style.height = `${arr[i]}px`;
      container.appendChild(bar);
    }
  }

  // Generate the initial array on page load
  generateNewArray();
