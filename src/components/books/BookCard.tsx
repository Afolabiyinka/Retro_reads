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
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className=" cursor-pointer rounded-xl overflow-hidden font-serif  flex flex-col h-full w-full"
      onClick={() => navigate(`/book/${book.id}`)}
    >
      {/* Image Frame */}
      <div className="p-2  mb-3">
        <img
          src={coverUrl}
          alt={`Cover of ${book.title}`}
          className="w-full h-72 object-cover rounded-tl-lg rounded-tr-lg"
        />
      </div>

      {/* Metadata */}
      <div className="space-y-1">
        <p className="text-md tracking-wide truncate font-semibold">
          {book.title}
        </p>

        <p className="text-sm italic text-aged truncate">
          {book.authors[0]?.name || "Unknown Author"}
        </p>

        {/* Extra archive detail */}
        <p className="text-xs text-faded">Record #{book.id}</p>
      </div>
    </motion.div>
  );
};

export default BookCard;
