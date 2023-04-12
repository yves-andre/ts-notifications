export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const currentDate = new Date();
  const time = date.toLocaleString('ch-FR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  if (
    date.getDate() === currentDate.getDate() &&
    date.getMonth() === currentDate.getMonth() &&
    date.getFullYear() === currentDate.getFullYear()
  ) {
    return 'Today at ' + time;
  } else if (
    date.getDate() === currentDate.getDate() - 1 &&
    date.getMonth() === currentDate.getMonth() &&
    date.getFullYear() === currentDate.getFullYear()
  ){
    return 'Yesterday at ' + time;
  }

  const options:any = { year: 'numeric', month: 'short', day: 'numeric'};

  return `${date.toLocaleDateString('en-GB', options)} ${time}`;
};
