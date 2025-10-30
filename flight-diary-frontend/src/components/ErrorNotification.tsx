interface ErrorNotificationProps {
  error: string;
}

const ErrorNotification = ({ error }: ErrorNotificationProps) => {
  return <div className='error'>{error && <p>{error}</p>}</div>;
};

export default ErrorNotification;
