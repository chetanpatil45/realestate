const styles = {
  UNREAD: 'bg-amber-100 text-amber-800',
  READ: 'bg-blue-100 text-blue-800',
  APPROVED: 'bg-emerald-100 text-emerald-800',
  REJECTED: 'bg-red-100 text-red-800',
};

const ApplicationStatusBadge = ({ status }) => {
  const label = status || 'UNKNOWN';
  return (
    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${styles[label] || 'bg-gray-100 text-gray-700'}`}>
      {label}
    </span>
  );
};

export default ApplicationStatusBadge;