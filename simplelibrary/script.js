const books = [
  {
    title: "The Diary of a Young Girl",
    author: "Anne Frank",
    subject: "Non fiction",
    publishDate: "1947"
  },
  {
    title: "The Scarlet Letter",
    author: "Nathaniel Hawthorne",
    subject: "Novel",
    publishDate: "1850"
  },
  {
    title: "The Adventures of Tom Sawyer",
    author: " Mark Twain",
    subject: "Novel",
    publishDate: "1876"
  },
  {
    title: "The Hound of the Baskervilles",
    author: "Arthur Conan Doyle",
    subject: "Mystery",
    publishDate: "1902"
  },
  {
    title: "The Stranger",
    author: "Albert Camus",
    subject: "Classic",
    publishDate: "1942"
  },
  {
    title: "The Grapes of Wrath",
    author: "John Steinbeck",
    subject: "Romance",
    publishDate: "1939"
  },
  {
    title: "The Color Purple",
    author: "Alice Walker",
    subject: "Gothic",
    publishDate: "1982"
  },
  {
    title: "Heart of Darkness" ,
    author: "Joseph Conrad",
    subject: "Political satire",
    publishDate: "1899"
  },
  {
    title: "The Little Prince",
    author: "Antoine de Saint-Exupéry",
    subject: "Fantasy",
    publishDate: "1942"
  },
  {
    title: "The Handmaid's Tale",
    author: "Margaret Atwood",
    subject: "Allegory",
    publishDate: "1985"
  },
  {
    title: "The Canterbury Tales",
    author: "Geoffrey Chaucer",
    subject: "Adventure",
    publishDate: "1851"
  },
  {
    title: "True History of the Kelly Gang",
    author: "Peter Carey",
    subject: "Adventure",
    publishDate: "2000"
  },
  {
    title: "The Picture of Dorian Gray",
    author: "Oscar Wilde",
    subject: "Gothic",
    publishDate: "1890"
  },
  {
    title: "The Count of Monte Cristo",
    author: "Alexandre Dumas",
    subject: "Adventure",
    publishDate: "1844"
  },
  {
    title: "Frankenstein",
    author: "Mary Shelley",
    subject: "Gothic",
    publishDate: "1818"
  },
  {
    title: "Dracula",
    author: "Bram Stoker",
    subject: "Horror",
    publishDate: "1897"
  },
  {
    title: "The Time Machine",
    author: "H.G. Wells",
    subject: "Science fiction",
    publishDate: "1895"
  },
  {
    title: "Heart of Darkness",
    author: "Joseph Conrad",
    subject: "Adventure",
    publishDate: "1899"
  },
  {
    title: "The War of the Worlds",
    author: "H.G. Wells",
    subject: "Science fiction",
    publishDate: "1898"
  },
  {
    title: "The Adventures of Sherlock Holmes",
    author: "Arthur Conan Doyle",
    subject: "Mystery",
    publishDate: "1892"
  }
  
];

const resultsPerPage = 10;
let currentPage = 1;

const bookList = document.getElementById("book-list");
const prevPageBtn = document.getElementById("prev-page");
const nextPageBtn = document.getElementById("next-page");
const titleFilter = document.getElementById("title");
const authorFilter = document.getElementById("author");
const subjectFilter = document.getElementById("subject");
const publishDateFilter = document.getElementById("publish-date");

function displayBooks() {
  const startIndex = (currentPage - 1) * resultsPerPage;
  const endIndex = startIndex + resultsPerPage;
  const booksToDisplay = books.slice(startIndex, endIndex);

  bookList.innerHTML = booksToDisplay.map(book => `
    <tr>
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.subject}</td>
      <td>${book.publishDate}</td>
    </tr>
  `).join("");
}

function updatePaginationButtons() {
  prevPageBtn.disabled = currentPage === 1;
  nextPageBtn.disabled = currentPage * resultsPerPage >= books.length;
}

function filterBooks() {
  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(titleFilter.value.toLowerCase()) &&
    book.author.toLowerCase().includes(authorFilter.value.toLowerCase()) &&
    book.subject.toLowerCase().includes(subjectFilter.value.toLowerCase()) &&
    book.publishDate.toLowerCase().includes(publishDateFilter.value.toLowerCase())
  );
  currentPage = 1;
  books.length = filteredBooks.length;
  filteredBooks.forEach((book, index) => books[index] = book);
  displayBooks();
  updatePaginationButtons();
}

displayBooks();
updatePaginationButtons();

prevPageBtn.addEventListener("click", () => {
  currentPage--;
  displayBooks();
  updatePaginationButtons();
});

nextPageBtn.addEventListener("click", () => {
  currentPage++;
  displayBooks();
  updatePaginationButtons();
});

titleFilter.addEventListener("input", filterBooks);
authorFilter.addEventListener("input", filterBooks);
subjectFilter.addEventListener("input", filterBooks);
publishDateFilter.addEventListener("input", filterBooks);
