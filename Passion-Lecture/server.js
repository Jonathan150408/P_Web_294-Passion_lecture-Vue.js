import jsonServer from 'json-server';
import { join } from 'path';

const server = jsonServer.create();
const router = jsonServer.router(join(process.cwd(), 'db.json'));
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Example: patch delete to avoid cascading deletions
server.delete('/books/:id', (req, res) => {
    const id = Number(req.params.id);
    const db = router.db; // lowdb instance

    // Delete only the specific book
    const book = db.get('books').find({ id }).value();
    if (!book) return res.status(404).json({ error: 'Book not found' });

    db.get('books').remove({ id }).write();

    res.status(200).json(book);
});

// Use default router for other routes
server.use(router);

server.listen(3000, () => {
    console.log('JSON Server running on port 3000');
});