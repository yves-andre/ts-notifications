export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const currentDate = new Date();
  const time = date.toLocaleString('ch-FR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  if (
    date.getDay() === currentDate.getDay() &&
    date.getMonth() === currentDate.getMonth() &&
    date.getFullYear() === currentDate.getFullYear()
  ) {
    return 'Today at ' + time;
  } else if (
    date.getDay() === currentDate.getDay() - 1 &&
    date.getMonth() === currentDate.getMonth() &&
    date.getFullYear() === currentDate.getFullYear()
  ){
    return 'Yesterday at ' + time;
  }

  const options:any = { year: 'numeric', month: 'short', day: 'numeric'};

  return `${date.toLocaleDateString('ch-FR', options)} ${time}`;
};
