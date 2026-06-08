const Pagination = ({ page, onPageChange, hasMore, disabled }) => (
  <div className="flex items-center justify-center gap-3 pt-4">
    <button
      type="button"
      disabled={disabled || page <= 0}
      onClick={() => onPageChange(page - 1)}
      className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-200 bg-white disabled:opacity-40 hover:bg-gray-50"
    >
      Previous
    </button>
    <span className="text-sm text-gray-600">Page {page + 1}</span>
    <button
      type="button"
      disabled={disabled || !hasMore}
      onClick={() => onPageChange(page + 1)}
      className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-200 bg-white disabled:opacity-40 hover:bg-gray-50"
    >
      Next
    </button>
  </div>
);

export default Pagination;