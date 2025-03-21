/*let books;

async function renderBooks(filter) {
  const booksWrapper = document.querySelector(".books");

  booksWrapper.classList += " books__loading";

  if (!books) {
    books = await getBooks();
  }

  booksWrapper.classList.remove("books__loading");

  if (filter === "LOW_TO_HIGH") {
    books.sort(
      (a, b) =>
        (a.salePrice || a.originalPrice) - (b.salePrice || b.originalPrice)
    );
  } else if (filter === "HIGH_TO_LOW") {
    books.sort(
      (a, b) =>
        (b.salePrice || b.originalPrice) - (a.salePrice || a.originalPrice)
    );
  } else if (filter === "RATING") {
    books.sort((a, b) => b.rating - a.rating);
  }

  const booksHtml = books
    .map((book) => {
      return `<div class="book">
            <figure class="book__img--wrapper">
                <img class="book__img" src="${book.url}" alt="">
            </figure>
            <div class="book__title">
                ${book.title}
            </div>
            <div class="book__ratings">
                ${ratiingsHTML(book.rating)}
            </div>
            <div class="book__price">
                ${priceHTML(book.originalPrice, book.salePrice)}
            </div>
            </div>`;
    })
    .join("");

  booksWrapper.innerHTML = booksHtml;
}

function priceHTML(originalPrice, salePrice) {
  if (!salePrice) {
    return `$${originalPrice.toFixed(2)}`;
  }
  return `<span class="book__price--normal">$${originalPrice.toFixed(
    2
  )}</span>$${salePrice.toFixed(2)}`;
}

function ratiingsHTML(rating) {
  let ratingHTML = "";

  for (let i = 0; i < Math.floor(rating); i++) {
    ratingHTML += '<i class = "fas fa-star"></i>';
  }
  if (!Number.isInteger(rating)) {
    ratingHTML += '<i class="fas fa-star-half-alt"></i>';
  }
  return ratingHTML;
}

function filterBooks(event) {
  renderBooks(event.target.value);
}

renderBooks();

// FAKE DATA
function getBooks() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          title: "Crack the Coding Interview",
          url: "assets/crack the coding interview.png",
          originalPrice: 49.95,
          salePrice: 14.95,
          rating: 4.5,
        },
        {
          id: 2,
          title: "Atomic Habits",
          url: "assets/atomic habits.jpg",
          originalPrice: 39,
          salePrice: null,
          rating: 5,
        },
        {
          id: 3,
          title: "Deep Work",
          url: "assets/deep work.jpeg",
          originalPrice: 29,
          salePrice: 12,
          rating: 5,
        },
        {
          id: 4,
          title: "The 10X Rule",
          url: "assets/book-1.jpeg",
          originalPrice: 44,
          salePrice: 19,
          rating: 4.5,
        },
        {
          id: 5,
          title: "Be Obsessed Or Be Average",
          url: "assets/book-2.jpeg",
          originalPrice: 32,
          salePrice: 17,
          rating: 4,
        },
        {
          id: 6,
          title: "Rich Dad Poor Dad",
          url: "assets/book-3.jpeg",
          originalPrice: 70,
          salePrice: 12.5,
          rating: 5,
        },
        {
          id: 7,
          title: "Cashflow Quadrant",
          url: "assets/book-4.jpeg",
          originalPrice: 11,
          salePrice: 10,
          rating: 4,
        },
        {
          id: 8,
          title: "48 Laws of Power",
          url: "assets/book-5.jpeg",
          originalPrice: 38,
          salePrice: 17.95,
          rating: 4.5,
        },
        {
          id: 9,
          title: "The 5 Second Rule",
          url: "assets/book-6.jpeg",
          originalPrice: 35,
          salePrice: null,
          rating: 4,
        },
        {
          id: 10,
          title: "Your Next Five Moves",
          url: "assets/book-7.jpg",
          originalPrice: 40,
          salePrice: null,
          rating: 4,
        },
        {
          id: 11,
          title: "Mastery",
          url: "assets/book-8.jpeg",
          originalPrice: 30,
          salePrice: null,
          rating: 4.5,
        },
      ]);
    }, 1000);
  });
}
*/

let books;

async function renderBooks(filter, category = "all") {
  const booksWrapper = document.querySelector(".books");
  booksWrapper.classList.add("books__loading");

  if (!books) {
    books = await getBooks();
  }

  booksWrapper.classList.remove("books__loading");

  // Filter by category if specified
  let filteredBooks = books;
  if (category && category !== "all") {
    filteredBooks = books.filter((book) => book.category === category);
  }

  // Sorting logic
  if (filter === "LOW_TO_HIGH") {
    filteredBooks.sort(
      (a, b) =>
        (a.salePrice || a.originalPrice) - (b.salePrice || b.originalPrice)
    );
  } else if (filter === "HIGH_TO_LOW") {
    filteredBooks.sort(
      (a, b) =>
        (b.salePrice || b.originalPrice) - (a.salePrice || a.originalPrice)
    );
  } else if (filter === "RATING") {
    filteredBooks.sort((a, b) => b.rating - a.rating);
  }

  const booksHtml = filteredBooks
    .map((book) => {
      return `<div class="book">
              <figure class="book__img--wrapper">
                  <img class="book__img" src="${book.url}" alt="">
              </figure>
              <div class="book__title">${book.title}</div>
              <div class="book__ratings">${ratiingsHTML(book.rating)}</div>
              <div class="book__price">${priceHTML(
                book.originalPrice,
                book.salePrice
              )}</div>
            </div>`;
    })
    .join("");

  booksWrapper.innerHTML = booksHtml;
}

function priceHTML(originalPrice, salePrice) {
  if (!salePrice) {
    return `$${originalPrice.toFixed(2)}`;
  }
  return `<span class="book__price--normal">$${originalPrice.toFixed(
    2
  )}</span>$${salePrice.toFixed(2)}`;
}

function ratiingsHTML(rating) {
  let ratingHTML = "";
  for (let i = 0; i < Math.floor(rating); i++) {
    ratingHTML += '<i class="fas fa-star"></i>';
  }
  if (!Number.isInteger(rating)) {
    ratingHTML += '<i class="fas fa-star-half-alt"></i>';
  }
  return ratingHTML;
}

function filterBooks(event) {
  const selectedSort = event.target.value;
  const selectedCategory = document.querySelector("#category-filter").value;
  renderBooks(selectedSort, selectedCategory);
}

function filterBooksByCategory(event) {
  const selectedCategory = event.target.value;
  const selectedSort = document.querySelector("#filter").value;
  renderBooks(selectedSort, selectedCategory);
}

// FAKE DATA
function getBooks() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          title: "Crack the Coding Interview",
          url: "assets/crack the coding interview.png",
          originalPrice: 49.95,
          salePrice: 14.95,
          rating: 4.5,
          category: "Technology",
        },
        {
          id: 2,
          title: "Atomic Habits",
          url: "assets/atomic habits.jpg",
          originalPrice: 39,
          salePrice: null,
          rating: 5,
          category: "Self-Help",
        },
        {
          id: 3,
          title: "Deep Work",
          url: "assets/deep work.jpeg",
          originalPrice: 29,
          salePrice: 12,
          rating: 5,
          category: "Business",
        },
        {
          id: 4,
          title: "The 10X Rule",
          url: "assets/book-1.jpeg",
          originalPrice: 44,
          salePrice: 19,
          rating: 4.5,
          category: "Business",
        },
        {
          id: 5,
          title: "Be Obsessed Or Be Average",
          url: "assets/book-2.jpeg",
          originalPrice: 32,
          salePrice: 17,
          rating: 4,
          category: "Self-Help",
        },
        {
          id: 6,
          title: "Rich Dad Poor Dad",
          url: "assets/book-3.jpeg",
          originalPrice: 70,
          salePrice: 12.5,
          rating: 5,
          category: "Finance",
        },
        {
          id: 7,
          title: "Cashflow Quadrant",
          url: "assets/book-4.jpeg",
          originalPrice: 11,
          salePrice: 10,
          rating: 4,
          category: "Finance",
        },
        {
          id: 8,
          title: "48 Laws of Power",
          url: "assets/book-5.jpeg",
          originalPrice: 38,
          salePrice: 17.95,
          rating: 4.5,
          category: "Business",
        },
        {
          id: 9,
          title: "The 5 Second Rule",
          url: "assets/book-6.jpeg",
          originalPrice: 35,
          salePrice: null,
          rating: 4,
          category: "Self-Help",
        },
        {
          id: 10,
          title: "Your Next Five Moves",
          url: "assets/book-7.jpg",
          originalPrice: 40,
          salePrice: null,
          rating: 4,
          category: "Business",
        },
        {
          id: 11,
          title: "Mastery",
          url: "assets/book-8.jpeg",
          originalPrice: 30,
          salePrice: null,
          rating: 4.5,
          category: "Self-Help",
        },
      ]);
    }, 1000);
  });
}

// Initial render
renderBooks("LOW_TO_HIGH", "all");
