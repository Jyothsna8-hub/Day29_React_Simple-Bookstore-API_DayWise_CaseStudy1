const mongoose = require('mongoose');

// Step 2: Connect
mongoose.connect('mongodb://localhost:27017', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error(err));

// Step 3: Schema + Model
const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: String,
  price: Number
}, { timestamps: true });

const Book = mongoose.model('Book', bookSchema);

// Step 4–7: CRUD Functions
async function addBook(title, author, price) {
  const book = new Book({ title, author, price });
  await book.save();
  console.log('📖 Book Added:', book);
}

async function listBooks() {
  const books = await Book.find();
  console.log('📚 All Books:', books);
}

async function findBook(title) {
  const book = await Book.findOne({ title });
  console.log('🔎 Found Book:', book);
}

async function updatePrice(title, newPrice) {
  const updatedBook = await Book.findOneAndUpdate(
    { title },
    { price: newPrice },
    { new: true }
  );
  console.log('💲 Price Updated:', updatedBook);
}

// Run demo
async function run() {
  await addBook("Node.js Basics", "John Doe", 299);
  await addBook("MongoDB Guide", "Jane Smith", 399);

  await listBooks();
  await findBook("Node.js Basics");
  await updatePrice("MongoDB Guide", 499);

  await listBooks();
}

run();
