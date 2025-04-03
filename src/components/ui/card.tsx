export const Card = ({ children }) => <div className="bg-white shadow rounded">{children}</div>;
export const CardContent = ({ children, className }) => <div className={className}>{children}</div>;