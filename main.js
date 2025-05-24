document.addEventListener("DOMContentLoaded", () => {
  const bookForm = document.getElementById("bookForm");
  const incompleteBookList = document.getElementById("incompleteBookList");
  const completeBookList = document.getElementById("completeBookList");

  let books = JSON.parse(localStorage.getItem("books")) || [];

  // Render buku ke halaman
  const renderBooks = () => {
    incompleteBookList.innerHTML = "";
    completeBookList.innerHTML = "";

    books.forEach((book) => {
      const bookElement = createBookElement(book);

      if (book.isComplete) {
        completeBookList.appendChild(bookElement);
      } else {
        incompleteBookList.appendChild(bookElement);
      }
    });
  };

  // Membuat elemen buku
  const createBookElement = (book) => {
    const bookElement = document.createElement("div");
    bookElement.setAttribute("data-bookid", book.id);
    bookElement.setAttribute("data-testid", "bookItem");
    bookElement.classList.add(
      "bg-white",
      "p-4",
      "rounded-lg",
      "shadow-lg",
      "transition",
      "duration-300",
      "hover:shadow-xl"
    );

    const title = document.createElement("h3");
    title.setAttribute("data-testid", "bookItemTitle");
    title.classList.add("text-xl", "font-semibold", "text-gray-800");
    title.textContent = book.title;

    const author = document.createElement("p");
    author.setAttribute("data-testid", "bookItemAuthor");
    author.classList.add("text-lg", "text-gray-600");
    author.textContent = `Penulis: ${book.author}`;

    const year = document.createElement("p");
    year.setAttribute("data-testid", "bookItemYear");
    year.classList.add("text-lg", "text-gray-600");
    year.textContent = `Tahun: ${book.year}`;

    const buttons = document.createElement("div");
    buttons.classList.add("flex", "space-x-4", "mt-4");

    // Tombol Selesai Dibaca
    const completeButton = document.createElement("button");
    completeButton.setAttribute("data-testid", "bookItemIsCompleteButton");
    completeButton.classList.add(
      "bg-indigo-600",
      "text-white",
      "px-4",
      "py-2",
      "rounded-md",
      "hover:bg-indigo-700",
      "transition"
    );
    completeButton.textContent = book.isComplete
      ? "Belum selesai dibaca"
      : "Selesai dibaca";
    completeButton.addEventListener("click", () => toggleCompletion(book.id));

    // Tombol Edit Buku
    const editButton = document.createElement("button");
    editButton.setAttribute("data-testid", "bookItemEditButton");
    editButton.classList.add(
      "bg-yellow-600",
      "text-white",
      "px-4",
      "py-2",
      "rounded-md",
      "hover:bg-yellow-700",
      "transition"
    );
    editButton.textContent = "Edit Buku";
    editButton.addEventListener("click", () => editBook(book.id));

    // Tombol Hapus Buku
    const deleteButton = document.createElement("button");
    deleteButton.setAttribute("data-testid", "bookItemDeleteButton");
    deleteButton.classList.add(
      "bg-red-600",
      "text-white",
      "px-4",
      "py-2",
      "rounded-md",
      "hover:bg-red-700",
      "transition"
    );
    deleteButton.textContent = "Hapus Buku";
    deleteButton.addEventListener("click", () => deleteBook(book.id));

    buttons.appendChild(completeButton);
    buttons.appendChild(editButton);
    buttons.appendChild(deleteButton);

    bookElement.appendChild(title);
    bookElement.appendChild(author);
    bookElement.appendChild(year);
    bookElement.appendChild(buttons);

    return bookElement;
  };

  // Mengubah status selesai dibaca
  const toggleCompletion = (bookId) => {
    const book = books.find((b) => b.id === bookId);
    book.isComplete = !book.isComplete;
    saveBooks();
    renderBooks();
  };

  // Menghapus buku
  const deleteBook = (bookId) => {
    books = books.filter((b) => b.id !== bookId);
    saveBooks();
    renderBooks();
  };

  // Menyimpan buku ke localStorage
  const saveBooks = () => {
    localStorage.setItem("books", JSON.stringify(books));
  };

  // Menambahkan buku baru
  bookForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const newBook = {
      id: new Date().getTime(),
      title: document.getElementById("bookFormTitle").value,
      author: document.getElementById("bookFormAuthor").value,
      year: Number(document.getElementById("bookFormYear").value),
      isComplete: document.getElementById("rackSelection").value === "true", // Menentukan apakah buku selesai dibaca
    };

    books.push(newBook);
    saveBooks();
    renderBooks();

    // Reset form
    bookForm.reset();
  });

  // Menyunting buku
  const editBook = (bookId) => {
    const book = books.find((b) => b.id === bookId);
    document.getElementById("bookFormTitle").value = book.title;
    document.getElementById("bookFormAuthor").value = book.author;
    document.getElementById("bookFormYear").value = book.year;
    document.getElementById("rackSelection").value = book.isComplete
      ? "true"
      : "false";

    // Hapus buku setelah editing (opsional, bisa ditambahkan jika ingin menghapus buku lama sebelum menambahkannya lagi)
    deleteBook(bookId);
  };

  // Render buku setelah load
  renderBooks();
});
