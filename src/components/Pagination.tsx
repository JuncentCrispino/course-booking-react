import ReactPaginate from 'react-paginate';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { motion } from 'framer-motion';
import { Dispatch, SetStateAction } from 'react';

interface IPaginate {
  setCurrentPage: Dispatch<SetStateAction<number>>;
  currentPage: number;
  totalPages: number;
}
const Pagination = ({ setCurrentPage, currentPage, totalPages }: IPaginate) => {
  console.log({ currentPage, totalPages });
  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(() => selected + 1);
  };

  const paginationVariants = {
    hidden: {
      opacity: 0,
      y: 200,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 20,
        duration: 2,
      },
    },
  };

  const showNextButton = currentPage !== totalPages - 1;
  const showPrevButton = currentPage !== 0;

  return (
    <motion.div
      variants={paginationVariants}
      initial="hidden"
      animate="visible"
    >
      <ReactPaginate
        breakLabel={<span className="mr-4">...</span>}
        nextLabel={
          showNextButton ? (
            <span className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-white">
              <BsChevronRight />
            </span>
          ) : null
        }
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={totalPages}
        previousLabel={
          showPrevButton ? (
            <span className="mr-4 flex h-10 w-10 items-center justify-center rounded-md bg-primary text-white">
              <BsChevronLeft />
            </span>
          ) : null
        }
        containerClassName="flex items-center justify-center mt-8 mb-4"
        pageClassName="block border- border-solid border-lightGray hover:bg-primary w-10 h-10 flex items-center justify-center rounded-md mr-4 hover:text-white"
        activeClassName="bg-primary text-white"
      />
    </motion.div>
  );
};

export { Pagination };
