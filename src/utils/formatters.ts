export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const currentDate = new Date();
  const time = `${date.getHours()}:${date.getMinutes()}`;

  if (
    date.getDay() === currentDate.getDay() &&
    date.getMonth() === currentDate.getMonth() &&
    date.getFullYear() === currentDate.getFullYear()
  ) {
    return time
  }

  const options:any = { year: 'numeric', month: 'short', day: 'numeric'};

  return `${date.toLocaleDateString('ch-FR', options)} ${time}`;
};
