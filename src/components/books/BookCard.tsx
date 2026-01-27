import type { BookType } from "@/types/types";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface BookCardProps {
  book: BookType;
}

const BookCard = ({ book }: BookCardProps) => {
  const coverUrl = book.formats["image/jpeg"];
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="border w-full overflow-hidden cursor-pointer rounded-none hover:shadow-lg"
      onClick={() => navigate(`/book/${book.id}`)}
    >
      <img
        src={coverUrl}
        alt={`Cover of ${book.title}`}
        className="w-full h-72 object-cover"
      />

      <div className="p-4">
        <p className="text-lg font-semibold  tracking-wide truncate">
          {book.title}
        </p>
        <p className="text-sm text-gray-500 truncate">
          {book.authors[0]?.name}
        </p>
      </div>
    </motion.div>
  );
};

export default BookCard;
